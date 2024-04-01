import { NavLink } from 'react-router-dom';

export default function MainNavigation() {
  return (
    <header className="main-header">
      <nav>
        <ul className="header-list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
              end
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/events"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Events
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
