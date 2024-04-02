import { useRouteLoaderData, json, redirect } from 'react-router-dom';
import EventItem from '../components/EventItem';

export default function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');
  const eventDetail = data.event;

  return <EventItem event={eventDetail} />;
}

export async function loader({ request, params }) {
  const id = params.eventID;

  // Fetch data from an API based on the passed in `id`
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw json(
      { message: 'Could Not Fetch Details For This Event.' },
      { status: 500 }
    );
  } else {
    return response;
  }
}

export async function action({ params, request }) {
  const eventID = params.eventID;

  const response = await fetch('http://localhost:8080/events/' + eventID, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: 'Could Not Delete Event.' }, { status: 500 });
  } else {
    return redirect('/events');
  }
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
