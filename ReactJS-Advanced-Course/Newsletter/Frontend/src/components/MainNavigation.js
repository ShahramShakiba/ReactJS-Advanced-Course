import { NavLink } from 'react-router-dom';

import NewsletterSignup from './NewsletterSignup';

export default function MainNavigation() {
  return (
    <header className="main-header">
      <nav>
        <ul className="header-list ">
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
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Newsletter
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Authentication
            </NavLink>
          </li>
        </ul>
      </nav>

      <NewsletterSignup />
    </header>
  );
}
