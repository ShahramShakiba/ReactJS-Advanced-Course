import { NavLink, useRouteLoaderData } from 'react-router-dom';

export default function EventsNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header className="event-header">
      <nav>
        <ul className="event-list">
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end
            >
              All Events
            </NavLink>
          </li>

          {token && (
            <li>
              <NavLink
                to="/events/new"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                New Event
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
