import invariant from 'tiny-invariant';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import CategoryForm from '~/components/CategoryForm';
import { getCategoryById, updateCategory } from '~/models/category.server';
import { requireUserId } from '~/session.server';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, 'Expected params.id');

  const category = await getCategoryById(params.id);
  if (!category) {
    throw new Response('Not Found', { status: 404 });
  }

  return json({ category });
};

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;
  // const userId = await requireUserId(request);
  const formData = await request.formData();

  const name = formData.get('name');

  invariant(name, 'Expected name');
  invariant(id, 'Expected params.id');

  /**
   * TODO:
   * validar se a categoria é do usuário
   * validar se categoria $id existe
   * validar input name
   */

  await updateCategory({ id, name });

  return redirect('/category');
};

const CategoryEdit = () => {
  const { category } = useLoaderData();

  return (
    <div>
      <h1>Category Edit</h1>

      <CategoryForm name={category.name} />
    </div>
  );
};

export default CategoryEdit;
