import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import ExerciseForm from '~/components/ExerciseForm';
import { requireUserId } from '~/session.server';
import { createExercise } from '~/models/exercise.server';

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  /**
   * TODO:
   * Formatar corretamente o campo date
   */

  const title = formData.get('title');
  const formDataDate = formData.get('date');
  const date = new Date();

  await createExercise({ title, date, userId });

  return redirect('/exercise');
};

const ExerciseNew = () => {
  return (
    <div>
      <h1>New exercise</h1>
      <ExerciseForm />
    </div>
  );
};

export default ExerciseNew;
