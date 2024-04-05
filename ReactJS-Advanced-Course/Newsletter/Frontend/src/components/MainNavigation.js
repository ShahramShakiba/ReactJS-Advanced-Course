import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import NewsletterSignup from './NewsletterSignup';

export default function MainNavigation() {
  //get token by targeting 'root' route
  const token = useRouteLoaderData('root');

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

          {/* if we don't have a token */}
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

          {/* if we have a token */}
          {token && (
            <li>
              <Form action="/logout" method="POST">
                <button className="logout">Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>

      <NewsletterSignup />
    </header>
  );
}
