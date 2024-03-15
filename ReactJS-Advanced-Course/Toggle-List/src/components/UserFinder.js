import { useState, useEffect } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Shahram' },
  { id: 'u2', name: 'Max' },
  { id: 'u3', name: 'Manuel' },
  { id: 'u4', name: 'Julie' },
];

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
        <input type="search" onChange={searchChangeHandler} />
      </div>

      <Users users={filteredUsers} />
    </>
  );
}
