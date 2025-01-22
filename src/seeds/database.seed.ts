import { PostgresDataSource } from '../config/database.config';
import { Member } from '../entities/member.entity';
import { accountType, ageRange, gender } from '../entities/base.entity';
import { faker } from '@faker-js/faker';

async function initializeDatabase() {
  if (!PostgresDataSource.isInitialized) {
    await PostgresDataSource.initialize();
    console.log('Banco de dados inicializado.');
  }
}

function generateFakeUsers(count, defaults = {}) {
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
    ...defaults,
  }));
}

async function hasExistingAdmins(memberRepository) {
  const existingAdmins = await memberRepository.find({
    where: { accountType: accountType.ADMIN },
  });
  return existingAdmins.length > 1;
}

async function getAdminIDs(memberRepository) {
  const admins = await memberRepository.find({
    where: { accountType: accountType.ADMIN },
    select: ['id'],
  });
  return admins.map((admin) => admin.id);
}

async function seedDatabase() {
  try {
    await initializeDatabase();

    const memberRepository = PostgresDataSource.getRepository(Member);

    if (await hasExistingAdmins(memberRepository)) {
      console.log('Admins já existem no banco de dados. Seed ignorado.');
    } else {
      console.log('Criando administradores fakes...');
      const fakeAdmins = generateFakeUsers(5, { accountType: accountType.ADMIN });
      const newAdmins = memberRepository.create(fakeAdmins);
      await memberRepository.save(newAdmins);
      console.log('Administradores fakes criados com sucesso!');
    }

    const adminIDs = await getAdminIDs(memberRepository);
    if (adminIDs.length === 0) {
      console.log('Nenhum administrador disponível. Membros não serão criados.');
      return;
    }

    console.log('Criando membros fakes...');
    const fakeMembers = generateFakeUsers(10, {
      adminCreatorID: faker.helpers.arrayElement(adminIDs),
    });
    const newMembers = memberRepository.create(fakeMembers);
    await memberRepository.save(newMembers);
    console.log('Membros fakes criados com sucesso!');
  } catch (error) {
    console.error('Erro ao criar usuários fakes:', error);
  }
}

seedDatabase().catch(console.error);