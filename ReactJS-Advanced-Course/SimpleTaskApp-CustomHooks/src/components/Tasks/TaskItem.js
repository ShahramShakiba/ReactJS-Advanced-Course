import classes from './TaskItem.module.css';

export default function TaskItem({ children }) {
  return <li className={classes.task}> {children} </li>;
}
