import { useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import { useInput } from './hooks/useInput';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = (tasksObj) => {
    const loadedTasks = [];
    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }
    setTasks(loadedTasks);
  };

  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useInput(
    {
      url: 'https://react-custom-hook-f29d8-default-rtdb.firebaseio.com/tasks.json',
    },
    transformTasks
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <>
      <section className="header">
        <h1> Task Application </h1>
        <h3> Developed with Custom Hooks </h3>
      </section>

      <NewTask onAddTask={taskAddHandler} />

      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </>
  );
}
