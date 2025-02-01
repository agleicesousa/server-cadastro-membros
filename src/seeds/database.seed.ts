import { PostgresDataSource } from '../config/database.config';
import { Member } from '../entities/member.entity';
import { Address } from '../entities/address.entity';
import {
  accountType,
  ageRange,
  gender,
  stateInitials
} from '../entities/base.entity';
import { faker } from '@faker-js/faker';

async function initializeDatabase() {
  if (!PostgresDataSource.isInitialized) {
    await PostgresDataSource.initialize();
    console.log('Banco de dados inicializado.');
  }
}

function generateFakeUsers(count: number, defaults = {}) {
  return Array.from({ length: count }).map(() => ({
    accountType: faker.helpers.arrayElement(Object.values(accountType)),
    ageRange: faker.helpers.arrayElement(Object.values(ageRange)),
    registrationNumber: faker.string.numeric(8),
    fullName: faker.person.fullName(),
    gender: faker.helpers.arrayElement(Object.values(gender)),
    cpf: faker.string.numeric(11),
    birthDate: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
    email: faker.internet.email(),
    phone: `+55 (${faker.string.numeric(2)}) ${faker.string.numeric(5)}-${faker.string.numeric(4)}`,
    password: faker.string.alphanumeric(10),
    ...defaults
  }));
}

function generateFakeAddresses(count: number) {
  return Array.from({ length: count }).map(() => ({
    country: 'Brazil',
    stateInitials: faker.helpers.arrayElement(Object.values(stateInitials)),
    city: faker.location.city(),
    neighborhood: faker.location.streetAddress(),
    street: faker.location.street(),
    number: parseInt(faker.string.numeric(3)),
    complement: faker.lorem.words(2),
    cep: faker.string.numeric(8)
  }));
}

async function seedDatabase() {
  try {
    await initializeDatabase();

    const memberRepository = PostgresDataSource.getRepository(Member);
    const addressRepository = PostgresDataSource.getRepository(Address);

    // Criar endereços
    console.log('Criando endereços fakes...');
    const fakeAddresses = generateFakeAddresses(10);
    const newAddresses = addressRepository.create(fakeAddresses);
    const savedAddresses = await addressRepository.save(newAddresses);
    console.log('Endereços fakes criados com sucesso!');

    // Verificar se os endereços foram salvos corretamente
    if (!savedAddresses || savedAddresses.length === 0) {
      throw new Error('Nenhum endereço foi salvo no banco de dados.');
    }

    // Criar membros e associar endereços
    console.log('Criando membros fakes com endereços...');
    const fakeMembers = generateFakeUsers(10).map((member) => {
      const randomAddress = faker.helpers.arrayElement(savedAddresses);
      if (!randomAddress) {
        console.error('Erro: Endereço não encontrado para o membro');
      }
      return {
        ...member,
        address: randomAddress
      };
    });

    const newMembers = memberRepository.create(fakeMembers);
    await memberRepository.save(newMembers);
    console.log('Membros fakes com endereços criados com sucesso!');
  } catch (error) {
    console.error('Erro ao criar membros e endereços fakes:', error);
  }
}

seedDatabase().catch(console.error);
