export default function EventsNavigation() {
  return (
    <header className="event-header">
      <nav>
        <ul className="event-list">
          <li>
            <a href="/events">All Events</a>
          </li>

          <li>
            <a href="/events/new">New Event</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
