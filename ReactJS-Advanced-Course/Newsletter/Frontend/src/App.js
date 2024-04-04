import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import EditEventPage from './Pages/EditEvent';
import ErrorPage from './Pages/Error';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './Pages/EventDetail';
import EventsPage, { loader as eventsLoader } from './Pages/EventsPage';
import EventsRootLayout from './Pages/EventsRoot';
import HomePage from './Pages/HomePage';
import NewEventPage from './Pages/NewEvent';
import RootLayoutPage from './Pages/RootLayout';
import { action as mutateEventAction } from './components/EventForm';
import NewsletterPage, {
  action as newsletterAction,
} from './Pages/NewsletterPage';
import AuthenticationPage, {
  action as authAction,
} from './Pages/Authentication';

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
            loader: eventsLoader,
          },
          // ":" - this part of the path is dynamic
          {
            path: ':eventID',
            //to make sure that we use this loader's data 'useRouteLoaderData'
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: mutateEventAction,
              },
            ],
          },
          { path: 'new', element: <NewEventPage />, action: mutateEventAction },
        ],
      },

      //RootLayoutPage path
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
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
