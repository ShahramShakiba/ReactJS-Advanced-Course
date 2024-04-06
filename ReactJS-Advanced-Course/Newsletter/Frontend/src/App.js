import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import EventsPage, { loader as eventsLoader } from './Pages/EventsPage';
import { action as mutateEventAction } from './components/EventForm';
import { checkAuthLoader, tokenLoader } from './Util/auth';
import { action as logoutAction } from './Pages/Logout';
import EventsRootLayout from './Pages/EventsRoot';
import RootLayoutPage from './Pages/RootLayout';
import EditEventPage from './Pages/EditEvent';
import NewEventPage from './Pages/NewEvent';
import HomePage from './Pages/HomePage';
import ErrorPage from './Pages/Error';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './Pages/EventDetail';
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
    // update UI based on existence token
    id: 'root',
    loader: tokenLoader,
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
            path: ':eventId',
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
                // restrict it when a user is not logged-in
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: mutateEventAction,
            // restrict it when a user is not logged-in
            loader: checkAuthLoader,
          },
        ],
      },

      //RootLayoutPage path
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction,
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
