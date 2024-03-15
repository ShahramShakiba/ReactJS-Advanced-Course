import classes from './User.module.css';

export default function User(props) {
  return <li className={classes.user}>{props.name}</li>;
}
