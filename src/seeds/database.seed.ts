import { PostgresDataSource } from '../config/database.config';
import { Member } from '../entities/member.entity';
import { Address } from '../entities/address.entity';
import { Department } from '../entities/department.entity';
import {
  accountType,
  ageRange,
  gender,
  stateInitials
} from '../entities/base.entity';
import { faker } from '@faker-js/faker';

async function initializeDatabase() {
  if (!PostgresDataSource.isInitialized) await PostgresDataSource.initialize();
}

const generateFakeData = (
  count: number,
  defaults: object = {},
  type: 'users' | 'addresses' | 'departments'
) => {
  return Array.from({ length: count }).map(() => {
    switch (type) {
      case 'users':
        return {
          accountType: faker.helpers.arrayElement(Object.values(accountType)),
          ageRange: faker.helpers.arrayElement(Object.values(ageRange)),
          registrationNumber: faker.string.numeric(8),
          fullName: faker.person.fullName(),
          gender: faker.helpers.arrayElement(Object.values(gender)),
          cpf: faker.string.numeric(11),
          birthDate: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
          email: faker.internet.email(),
          phone: `+55 (${faker.string.numeric(2)}) 9${faker.string.numeric(4)}-${faker.string.numeric(4)}`,
          password: faker.string.alphanumeric(10),
          ...defaults
        };
      case 'addresses':
        return {
          country: 'Brazil',
          stateInitials: faker.helpers.arrayElement(
            Object.values(stateInitials)
          ),
          city: faker.location.city(),
          neighborhood: faker.location.streetAddress(),
          street: faker.location.street(),
          number: parseInt(faker.string.numeric(3)),
          complement: faker.lorem.words(2),
          cep: faker.string.numeric(8)
        };
      case 'departments':
        return { name: faker.company.name() };
      default:
        return {};
    }
  });
};

async function seedDatabase() {
  try {
    await initializeDatabase();

    const memberRepo = PostgresDataSource.getRepository(Member);
    const addressRepo = PostgresDataSource.getRepository(Address);
    const departmentRepo = PostgresDataSource.getRepository(Department);

    const fakeAddresses = await addressRepo.save(
      addressRepo.create(generateFakeData(10, {}, 'addresses'))
    );
    const fakeDepartments = await departmentRepo.save(
      departmentRepo.create(generateFakeData(5, {}, 'departments'))
    );

    const fakeMembers = generateFakeData(10, {}, 'users').map((member) => ({
      ...member,
      address: faker.helpers.arrayElement(fakeAddresses),
      departments: faker.helpers.shuffle(fakeDepartments).slice(0, 2)
    }));

    await memberRepo.save(memberRepo.create(fakeMembers));

    console.log('Banco de dados populado com sucesso!');
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  }
}

seedDatabase().catch(console.error);
