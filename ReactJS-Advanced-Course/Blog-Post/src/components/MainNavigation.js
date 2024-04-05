import { NavLink } from 'react-router-dom';

export default function MainNavigation() {
  return (
    <header className="header">
      <nav>
        <ul>
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
              to="/posts"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Blog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
