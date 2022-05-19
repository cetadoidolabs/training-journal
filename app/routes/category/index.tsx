import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';

import type { Category } from '~/models/category.server';
import { getCategoriesByUser } from '~/models/category.server';
import { requireUserId } from '~/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const categories = await getCategoriesByUser(userId);

  return json({ categories });
};

const CategoryList = () => {
  const { categories } = useLoaderData();

  return (
    <div>
      <h1>Category</h1>

      <Link to="/category/new">Nova categoria</Link>

      <br />

      {categories.length ? (
      <ul>
        {categories.map(({ id, name }: Category) => (
          <li key={id}>
            <Link to={`/category/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
      ) : ('Nenhuma categoria encontrada')}
    </div>
  );
};

export default CategoryList;
