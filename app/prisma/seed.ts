import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // cleanup the existing database

  await prisma.user.deleteMany();

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
