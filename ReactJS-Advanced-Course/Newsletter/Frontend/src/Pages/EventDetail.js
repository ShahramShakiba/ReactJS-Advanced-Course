import { useLoaderData, json } from 'react-router-dom';
import EventItem from '../components/EventItem';

export default function EventDetailPage() {
  const data = useLoaderData();
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
