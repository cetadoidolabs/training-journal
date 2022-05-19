import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';

import type { Exercise } from '~/models/exercise.server';
import { getExercisesByUser } from '~/models/exercise.server';
import { requireUserId } from '~/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const exercises = await getExercisesByUser(userId);

  return json({ exercises });
};

const ExerciseList = () => {
  const { exercises } = useLoaderData();

  return (
    <div>
      <h1>Exercise</h1>

      <Link to="/exercise/new">New exercise</Link>

      <br />

      {exercises.length ? (
      <ul>
        {exercises.map(({ id, title }: Exercise) => (
          <li key={id}>
            <Link to={`/exercise/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
      ) : ('No exercises found')}
    </div>
  );
};

export default ExerciseList;
