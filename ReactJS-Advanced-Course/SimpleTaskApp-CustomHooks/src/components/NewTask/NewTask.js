import Section from '../UI/Section';
import TaskForm from './TaskForm';
import { useInput } from '../../hooks/useInput';

export default function NewTask({ onAddTask }) {
  const { isLoading, error, sendRequest: sendTaskRequest } = useInput();

  const createTask = (taskData, taskText) => {
    // firebase-specific => "name" contains generated id
    const generatedId = taskData.name;
    const createdTask = { id: generatedId, text: taskText };

    onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: 'https://react-custom-hook-f29d8-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        body: { text: taskText },
        headers: {
          'Content-Type': 'application/json',
        },
      },
      createTask.bind(null, taskText),
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />

      {error && <p> {error} </p>}
    </Section>
  );
}

/*  createTask.bind(null, taskText)
----------------------------
- in our custom hook (useInput)
- the nested fn(sendRequest)
- has an argument(applyData)
- which only gets one argument(data)

* now if we want our fn(createTask) to have access to both arguments from useInput and applyData, we can bind them together like this

- null : set "this" keyword in the to-be-executed fn(createTask)
 

*/