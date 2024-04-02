import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

export default function EventsPage() {
  const events = useLoaderData(); //get access to closest loader-data

  return <EventsList events={events} />;
}

//to have a cleaner App.js & EventsPage Component we declare it here and use it in loader at App.js
export async function loader() {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    //....
  } else {
    const eventsData = await response.json();
    return eventsData.events;
  }
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

? where we can not use these events?
- in a higher level route, for instance in RootLayout

- you can use it in any component in the same-level or lower-level, like EventsList
 
*/

/* loader-fn
* just before <EventsPage /> gets rendered, this "loader-fn" will be triggered and executed by a React router - you can fetch your data there

* in the end, returned data is available to the events-page

* Here the return-value is a Promise, and react-router will check if a promise is returned and automatically get the resolved data from that promise for you, you will always get the final data with the help of useLoaderData()
*/