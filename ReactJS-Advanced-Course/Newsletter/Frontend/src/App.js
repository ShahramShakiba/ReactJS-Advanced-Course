import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayoutPage from './Pages/RootLayout';
import HomePage from './Pages/Home';
import EventsPage from './Pages/Events';
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
                const resData = await response.json();
                return resData.events;
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
