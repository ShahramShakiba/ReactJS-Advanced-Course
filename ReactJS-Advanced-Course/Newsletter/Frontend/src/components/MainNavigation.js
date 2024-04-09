import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import NewsletterSignup from './NewsletterSignup';

export default function MainNavigation() {
  const token = useRouteLoaderData('root');

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
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Newsletter
            </NavLink>
          </li>

          {!token && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Authentication
              </NavLink>
            </li>
          )}

          {token && (
            <li>
              <Form action="/logout" method="POST">
                <button className='logout'> Logout </button>
              </Form>
            </li>
          )}
        </ul>
      </nav>

      <NewsletterSignup />
    </header>
  );
}
