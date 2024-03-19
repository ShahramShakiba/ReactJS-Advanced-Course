import { useState } from 'react';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

export default function NewTask({ onAddTask }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterTaskHandler = async (taskText) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://react-custom-hook-f29d8-default-rtdb.firebaseio.com/tasks.json',
        {
          method: 'POST',
          body: JSON.stringify({ text: taskText }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Request Failed!');
      }

      const data = await response.json();

      // firebase-specific => "name" contains generated id
      const generatedId = data.name;
      const createdTask = { id: generatedId, text: taskText };

      onAddTask(createdTask);
    } catch (err) {
      setError(err.message || 'Something Went Wrong!');
    }

    setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />

      {error && <p> {error} </p>}
    </Section>
  );
}
