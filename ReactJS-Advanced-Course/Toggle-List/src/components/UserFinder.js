import { Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Shahram' },
  { id: 'u2', name: 'Max' },
  { id: 'u3', name: 'Manuel' },
  { id: 'u4', name: 'Julie' },
];

class UserFinder extends Component {
  constructor() {
    super();
    this.state = {
      filteredUsers: DUMMY_USERS,
      searchTerm: '',
    };
  }

  // to handle side effect instead of useEffect
  componentDidUpdate(prevProps, prevState) {
    // to prevent infinite loop we use if check
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: DUMMY_USERS.filter((user) =>
          user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        ),
      });
    }
  }

  searchChangeHandler(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    return (
      <>
        <div className={classes.finder}>
          <h3>Toggle User List</h3>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>

        <Users users={this.state.filteredUsers} />
      </>
    );
  }
}

export default UserFinder;

/* Class Component Lifecycle
* componentDidMount ()
  - called once a component "mounted"
    . evaluated & rendered by React

  - it's like using: useEffect(..., [])

* componentDidUpdate ()
  - called once a component "updated"
    . re-evaluated & re-rendered by React

  - it's like using: useEffect(..., [some dependencies])

* componentWillUnmount ()
  - called right before component is "unmounted"
    . right before removed from DOM

  - it's like using: useEffect(() => {
                         return () => {...}   // cleanup fn
                      }, [])

          - this fn called right before the effect fn executed again
          - and when the component is about to be removed from the DOM
*/

/* functional-component
export default function UserFinder() {
  const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredUsers(
      DUMMY_USERS.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const searchChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className={classes.finder}>
        <h3>Toggle User List</h3>
        <input type="search" onChange={searchChangeHandler} />
      </div>

      <Users users={filteredUsers} />
    </>
  );
}
*/
