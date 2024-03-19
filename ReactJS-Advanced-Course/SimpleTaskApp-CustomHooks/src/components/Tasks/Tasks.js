import Section from '../UI/Section';
import TaskItem from './TaskItem';
import classes from './Tasks.module.css';

export default function Tasks({ items, error, loading, onFetch }) {
  let taskList = <h2> No tasks found. Start adding some! </h2>;

  if (items.length > 0) {
    taskList = (
      <ul>
        {items.map((task) => (
          <TaskItem key={task.id}> {task.text} </TaskItem>
        ))}
      </ul>
    );
  }

  let content = taskList;
  if (error) {
    content = <button onClick={onFetch}> Try Again </button>;
  }
  if (loading) {
    content = 'Loading Tasks...';
  }

  return (
    <Section>
      <div className={classes.container}> {content} </div>
    </Section>
  );
}
