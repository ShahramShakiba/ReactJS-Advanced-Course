import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayoutPage from './Pages/RootLayout';
import HomePage from './Pages/HomePage';
import EventsPage from './Pages/EventsPage';
import ErrorPage from './Pages/Error';
import EventDetailPage from './Pages/EventDetail';
import NewEventPage from './Pages/NewEvent';
import EditEventPage from './Pages/EditEvent';
import EventsRootLayout from './Pages/EventsRoot';

//defining routes in "an array of objects"
const router = createBrowserRouter([
  {
    // "/" is a absolute path
    path: '/',
    element: <RootLayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          //these are relative-path | which will be append after the path of the parent route
          {
            index: true,
            element: <EventsPage />,
            loader: async () => {
              const response = await fetch('http://localhost:8080/events');
              if (!response.ok) {
                //....
              } else {

                const eventsData = await response.json();
                return eventsData.events;
              }
            },
          },
          // ":" - this part of the path is dynamic
          { path: ':eventId', element: <EventDetailPage /> },
          { path: 'new', element: <NewEventPage /> },
          { path: ':eventId/edit', element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

/* defining routes with "JSX Codes" 

import {
import EventDetailPage from './Pages/EventDetailPage';
import NewEventPage from './Pages/NewEventPage';
import EditEventPage from './Pages/EditEventPage';
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<Products />} />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

export default function App() {
  return <RouterProvider router={router} />;
}
*/

/* loader-fn
* just before <EventsPage /> gets rendered, this "loader-fn" will be triggered and executed by a React router - you can fetch your data there

* in the end, returned data is available to the events-page

* Here the return-value is a Promise, and react-router will check if a promise is returned and automatically get the resolved data from that promise for you, you will always get the final data with the help of useLoaderData()
*/