import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';

import type { Category } from '~/models/category.server';
import { getCategoriesByUser } from '~/models/category.server';

export const loader: LoaderFunction = async () => {
  const categories = await getCategoriesByUser('cl1zimpzh000235yv6qw86ltn');

  return json({ categories });
};

const CategoryList = () => {
  const { categories } = useLoaderData();

  return (
    <div>
      <h1>Category</h1>

      <Link to="/category/new">Nova categoria</Link>

      <br />
      <br />

      {categories.length ? (
        categories.map(({ id, name }: Category) => (<div key={id}>{name}</div>))
      ) : ('Nenhuma categoria encontrada')}
    </div>
  );
};

export default CategoryList;
