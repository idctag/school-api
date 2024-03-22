import { PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

const generateFakeUser = () => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  phone: faker.phone.number(),
  email: faker.internet.email(),
  age: faker.number.int({ min: 18, max: 100 }),
  status: true,
  birthday: faker.date.birthdate(),
  created_at: new Date(),
  updated_at: new Date(),
  residentId: 'AA12345678',
});

async function main() {
  const managersData = Array.from({ length: 2 }, () => generateFakeUser());
  const teachresData = Array.from({ length: 5 }, () => generateFakeUser());
  const studentsData = Array.from({ length: 20 }, () => generateFakeUser());

  const hash = await argon2.hash('password');

  await prisma.admin.create({
    data: {
      user: {
        create: {
          ...generateFakeUser(),
          email: 'admin@gmail.com',
          roles: [Role.ADMIN],
          password: hash,
        },
      },
      super: true,
    },
  });

  await prisma.manager.create({
    data: {
      user: {
        create: {
          ...generateFakeUser(),
          email: 'manager@gmail.com',
          roles: [Role.MANAGER],
          password: hash,
        },
      },
    },
  });

  await prisma.teacher.create({
    data: {
      user: {
        create: {
          ...generateFakeUser(),
          email: 'teacher@gmail.com',
          roles: [Role.TEACHER],
          password: hash,
        },
      },
    },
  });

  await prisma.student.create({
    data: {
      user: {
        create: {
          ...generateFakeUser(),
          email: 'student@gmail.com',
          roles: [Role.STUDENT],
          password: hash,
        },
      },
      gpa: 4.0,
      credit: 120,
    },
  });

  for (const manager of managersData) {
    await prisma.manager.create({
      data: {
        user: {
          create: {
            ...manager,
            roles: [Role.MANAGER],
            password: hash,
          },
        },
      },
    });
  }

  for (const teacher of teachresData) {
    await prisma.teacher.create({
      data: {
        user: {
          create: {
            ...teacher,
            roles: [Role.TEACHER],
            password: hash,
          },
        },
      },
    });
  }

  for (const student of studentsData) {
    await prisma.student.create({
      data: {
        user: {
          create: {
            ...student,
            roles: [Role.TEACHER],
            password: hash,
          },
        },
        gpa: faker.number.float({ min: 2, max: 4, fractionDigits: 2 }),
        credit: faker.number.int({ min: 0, max: 120 }),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
