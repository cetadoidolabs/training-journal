import { Form } from '@remix-run/react';
import { useState } from 'react';

interface Props {
  name?: string;
}

const CategoryForm = ({ name }: Props) => {
  const [inputName, setInputName] = useState(name);

  return (
    <Form method="post">
      <div>
        Name <br />
        <input type="text" name="name" value={inputName} onChange={(event)=>setInputName(event.target.value)} required />
      </div>

      <button type="submit">
        Submit
      </button>
    </Form>
  );

};

export default CategoryForm;
