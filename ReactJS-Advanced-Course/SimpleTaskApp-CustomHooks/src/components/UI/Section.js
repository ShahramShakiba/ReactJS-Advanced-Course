import classes from './Section.module.css';

export default function Section({ children }) {
  return <section className={classes.section}> {children} </section>;
}
