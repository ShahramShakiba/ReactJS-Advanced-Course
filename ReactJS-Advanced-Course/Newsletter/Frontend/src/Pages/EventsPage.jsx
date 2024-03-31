import { Link } from 'react-router-dom';

const DUMMY_EVENTS = [
  { id: 'e1', title: 'Some Event!' },
  { id: 'e2', title: 'Another Event' },
];

export default function EventsPage() {
  return (
    <>
      <h1>Events Page!</h1>

      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={event.id}> {event.title} </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

/* What does "Link" do?
* It allows you to create hyperlinks to other routes in your application without causing a "full page reload". 

* When a user clicks on a Link component, React Router intercepts(stop) the click-event and handles the navigation "internally", updating the URL and rendering the appropriate component associated with the target route.
*/
