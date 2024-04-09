import { Link } from 'react-router-dom';

export default function EventsList({ events }) {
  return (
    <div className="events">
      <h1> All Events </h1>

      <ul className="list">
        {events.map((event) => (
          <li key={event.id} className="item">
            <Link to={`/events/${event.id}`}>
              <img src={event.image} alt={event.title} />

              <div className="content">
                <h2> {event.title} </h2>
                <time> {event.date} </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* useLoaderData

import { useLoaderData } from 'react-router-dom';
 const events = useLoaderData(); //get access to closest loader-data
*/
