import { Form, NavLink } from 'react-router-dom';

import NewsletterSignup from './NewsletterSignup';
import { action } from './../Pages/Logout';

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
              to="/auth?mode=login"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Authentication
            </NavLink>
          </li>
          <li>
            <Form action="/logout" method="POST">
              <button>Logout</button>
            </Form>
          </li>
        </ul>
      </nav>

      <NewsletterSignup />
    </header>
  );
}
