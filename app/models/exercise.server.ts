import type { Exercise, User } from '@prisma/client';

import { prisma } from '~/db.server';

export type { Exercise } from '@prisma/client';

export async function getExerciseById(id: Exercise['id']) {
  return prisma.exercise.findUnique({ where: { id } });
}

export async function getExercisesByUser(userId: User['id']) {
  return prisma.exercise.findMany({ where: { userId } });
}

export async function createExercise({ title, date, userId }: Exercise) {
  return prisma.exercise.create({
    data: {
      title,
      date,
      userId
    },
  });
}

export async function updateExercise({ id, title, date }: Exercise) {
  return prisma.exercise.update({
    where: {
      id
    },
    data: {
      title,
      date
    },
  });
}
