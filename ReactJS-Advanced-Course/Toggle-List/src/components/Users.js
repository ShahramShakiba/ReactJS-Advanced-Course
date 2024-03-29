import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      showUsers: true,
    };
  }

  componentDidUpdate() {
    if (this.props.users.length === 0) {
      throw new Error('No users provided!');
    }
  }

  toggleUsersHandler() {
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

export default Users;

/* define State
  - to define State in class-based component we need to use "constructor(){}"
    . the constructor fn is automatically called whenever this class is 
      being used as a component

    . in constructor you can add initialization work, like initializing State

 *  > you have to group all the state you have in an object {}
    constructor(){
      this.state = {
        showUsers: true,
        moreState: 'Test,
        nested: {},
        data: [],
      }
    }

  - how to make sure "this" keyword inside of the toggleUsersHandler method
    refers to the surrounding class
  * onClick={this.toggleUsersHandler.bind(this)}
    . bind(): "this" keyword inside of toggleUsersHandler method is now set to
              have the same context or the same value as the "this" keyword when
              this <div className={classes.users}>...</div> code is evaluated

*/

/* functional-component
export default function Users() {
  const [showUsers, setShowUsers] = useState(true);

  const toggleUsersHandler = () => {
    setShowUsers((curState) => !curState);
  };

  const usersList = (
    <ul>
      {DUMMY_USERS.map((user) => (
        <User key={user.id} name={user.name} />
      ))}
    </ul>
  );

  return (
    <div className={classes.users}>
      <button onClick={toggleUsersHandler}>
        {showUsers ? 'Hide' : 'Show'} Users
      </button>

      {showUsers && usersList}
    </div>
  );
}
*/
