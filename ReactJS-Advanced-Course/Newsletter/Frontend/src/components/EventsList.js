// import { useLoaderData } from 'react-router-dom';

export default function EventsList({events}) {
  // const events = useLoaderData(); //get access to closest loader-data

  return (
    <div className="events">
      <h1> All Events </h1>

      <ul className="list">
        {events.map((event) => (
          <li key={event.id} className="item">
            <a href={`/events/${event.id}`}>
              <img src={event.image} alt={event.title} />

              <div className="content">
                <h2> {event.title} </h2>

                <time> {event.date} </time>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}


