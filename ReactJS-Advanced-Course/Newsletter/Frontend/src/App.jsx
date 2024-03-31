import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './Pages/RootLayout';
import HomePage from './Pages/HomePage';
import EventsPage from './Pages/EventsPage';
import ErrorPage from './Pages/ErrorPage';
import EventDetailPage from './Pages/EventDetailPage';
import NewEventPage from './Pages/NewEventPage';
import EditEventPage from './Pages/EditEventPage';
import EventsRootLayout from './Pages/EventsRootLayout';

//defining routes in "an array of objects"
const router = createBrowserRouter([
  {
    // "/" is a absolute path
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          //these are relative-path | which will be append after the path of the parent route
          { index: true, element: <EventsPage /> },
          // ":" - this part of the path is dynamic
          { path: ':eventID', element: <EventDetailPage /> },
          { path: 'new', element: <NewEventPage /> },
          { path: ':eventID/edit', element: <EditEventPage /> },
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
