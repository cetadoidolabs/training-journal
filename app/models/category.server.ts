import type { Category, User } from '@prisma/client';

import { prisma } from '~/db.server';

export type { Category } from '@prisma/client';

export async function getCategoriesByUser(userId: User['id']) {
  return prisma.category.findMany({ where: { userId } });
}

export async function create({ name, userId }: Category) {
  return prisma.category.create({
    data: {
      name,
      userId
    },
  });
}
