import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  const username = 'cetadoido';

  await prisma.user.delete({ where: { username } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const password = await bcrypt.hash('cetadoido', 10);

  await prisma.user.create({
    data: {
      name: 'Cetadoido Seed',
      username,
      password,
    },
  });

  console.log('Database has been seeded. 🌱');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
