import invariant from 'tiny-invariant';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import ExerciseForm from '~/components/ExerciseForm';
import { getExerciseById, updateExercise } from '~/models/exercise.server';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, 'Expected params.id');

  /**
   * TODO:
   * validar se o exercise é do usuário logado
   */

  const exercise = await getExerciseById(params.id);
  if (!exercise) {
    throw new Response('Not Found', { status: 404 });
  }

  return json({ exercise });
};

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;
  // const userId = await requireUserId(request);
  const formData = await request.formData();

  const title = formData.get('title');
  const date = formData.get('date');

  invariant(title, 'Expected title');
  invariant(date, 'Expected date');
  invariant(id, 'Expected params.id');

  /**
   * TODO:
   * validar se categoria $id existe
   * validar inputs
   * validar/formatar date
   */

  await updateExercise({ id, title, date });

  return redirect('/exercise');
};

const ExerciseEdit = () => {
  const { exercise } = useLoaderData();

  return (
    <div>
      <h1>Exercise Edit</h1>

      <ExerciseForm title={exercise.title} date={exercise.date} />
    </div>
  );
};

export default ExerciseEdit;
