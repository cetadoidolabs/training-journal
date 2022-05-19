import { Form } from '@remix-run/react';
import { useState } from 'react';

interface Props {
  title?: string;
  date?: string;
}

const ExerciseForm = ({ title, date }: Props) => {
  const [inputTitle, setInputTitle] = useState(title);
  const [inputDate, setInputDate] = useState(date);

  return (
    <Form method="post">
      <div>
        Title <br />
        <input type="text" name="title" value={inputTitle} onChange={(event)=>setInputTitle(event.target.value)} required />
      </div>

      <div>
        Date <br />
        <input type="text" name="date" value={inputDate} onChange={(event)=>setInputDate(event.target.value)} />
      </div>

      <button type="submit">
        Submit
      </button>
    </Form>
  );

};

export default ExerciseForm;
