import { NavLink } from 'react-router-dom';

export default function MainNavigation() {
  return (
    <header className="main-header">
      <nav>
        <ul className="header-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
