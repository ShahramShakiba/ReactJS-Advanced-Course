import { NavLink } from 'react-router-dom';

export default function EventsNavigation() {
  return (
    <header className="event-header">
      <nav>
        <ul className="event-list">
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) => (isActive ? 'active' : '')}
              end
            >
              All Events
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/events/new"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              New Event
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
