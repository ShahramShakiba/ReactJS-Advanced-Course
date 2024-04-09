import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';
import { Suspense } from 'react';

import EventsList from '../components/EventsList';
import EventItem from '../components/EventItem';
import { getAuthToken } from '../util/auth';

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense
        fallback={<p style={{ textAlign: 'center' }}>Loading... 📡 </p>}
      >
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>

      <Suspense
        fallback={<p style={{ textAlign: 'center' }}>Loading... 📡 </p>}
      >
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

//________ EventItem Component
async function loadEvent(id) {
  //Fetch data from an API based on the passed in `id`
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw json(
      { message: 'Could Not Fetch Details For This Event.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

//_________ EventsList Component
async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json(
      { message: 'Could Not Get Events.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id), //waits for this data to be loaded first
    events: loadEvents(), //load this data after the page is loaded
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const token = getAuthToken();

  // deleting event
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete event.' },
      {
        status: 500,
      }
    );
  }
  return redirect('/events');
}

/* what does "useParams" do 
*Contains every dynamic path segment we define in our route definition as a property.

* This hook provides a straightforward way to extract dynamic segments from the "URL" and use them in your application logic. 

* By using useParams, you can dynamically "render components" or "fetch data" based on the values present in the URL. 

* It simplifies the process of working with dynamic routes and enhances the flexibility of your React applications.
*/

/* request & params

* request: 
- in a loader could be used to access the URL to for example to extract query parameters or anything like that - request.url

* params:
- we can access to all the route parameter values, as we could do it with the help of useParams
*/

/* useRouteLoaderData(id)
* In React, "useRouteLoaderData" is a custom hook that allows you to load data specific to a particular route. 

- This hook is beneficial when you need to fetch data dynamically based on the current route. 

? which it takes a "route ID" as an argument

- you can get access to higher level loader from a route that does not have a loader
*/
