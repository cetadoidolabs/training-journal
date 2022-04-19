import type { Category, User } from '@prisma/client';

import { prisma } from '~/db.server';

export type { Category } from '@prisma/client';

export async function getCategoryById(id: Category['id']) {
  return prisma.category.findUnique({ where: { id } });
}

export async function getCategoriesByUser(userId: User['id']) {
  return prisma.category.findMany({ where: { userId } });
}

export async function createCategory({ name, userId }: Category) {
  return prisma.category.create({
    data: {
      name,
      userId
    },
  });
}

export async function updateCategory({ id, name }: Category) {
  return prisma.category.update({
    where: {
      id
    },
    data: {
      name
    },
  });
}
