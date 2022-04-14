import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { create } from '~/models/category.server';
import CategoryForm from '~/components/CategoryForm';
import { requireUserId } from '~/session.server';

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const name = formData.get('name');

  await create({ name, userId });

  return redirect('/category');
};

const CategoryList = () => {
  return (
    <div>
      <h1>Nova categoria</h1>
      <CategoryForm />
    </div>
  );
};

export default CategoryList;
