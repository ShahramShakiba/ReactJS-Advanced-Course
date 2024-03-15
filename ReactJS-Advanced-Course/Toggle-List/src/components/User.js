import { Component } from 'react';
import classes from './User.module.css';

class User extends Component {
  componentWillUnmount() {
    console.log('User will unmount!');
  }

  render() {
    return <li className={classes.user}> {this.props.name} </li>;
  }
}

export default User;

/* Component :
  - we do not receive props in class therefore we " extends Component "


  * Class-Based Component can work together with functional Components
*/

/* functional-Component
export default function User({ name }) {
  return <li className={classes.user}> {name} </li>;
} 
*/
