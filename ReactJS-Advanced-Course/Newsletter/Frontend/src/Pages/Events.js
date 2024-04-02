import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

export default function EventsPage() {
  const events = useLoaderData();

  return <EventsList events={events} />;
}

/* What does "Link" do?
* It allows you to create hyperlinks to other routes in your application without causing a "full page reload". 

* When a user clicks on a Link component, React Router intercepts(stop) the click-event and handles the navigation "internally", updating the URL and rendering the appropriate component associated with the target route.

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
*/

/* useLoaderData
* useLoaderData is a hook used for "data loading" and "fetching" during server-side rendering. 

* It allows components to "load-data before rendering on the server", ensuring that the necessary data is available when the component is hydrated on the client-side. 

* By using useLoaderData, you can fetch data "asynchronously" and pass it to your components, enhancing performance and user experience by preloading essential data. 

* This hook plays a crucial role in optimizing server-side rendering and ensuring that your React application loads efficiently.
 
*/
