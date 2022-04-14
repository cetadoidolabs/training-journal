import { Form } from '@remix-run/react';

const CategoryForm = () => {
  return (
    <Form method="post">
      <div>
        Name <br />
        <input type="text" name="name" required />
      </div>

      <button type="submit">
        Submit
      </button>
    </Form>
  );

};

export default CategoryForm;
