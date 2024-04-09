import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import { action as manipulateEventAction } from './components/EventForm';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import { checkAuthLoader, tokenLoader } from './util/auth';
import { action as logoutAction } from './pages/Logout';
import EventsRootLayout from './pages/EventsRoot';
import EditEventPage from './pages/EditEvent';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import AuthenticationPage, {
  action as authAction,
} from './pages/Authentication';

const router = createBrowserRouter([
  {
    // "/" is a absolute path
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    id: 'root',
    children: [
      { index: true, element: <HomePage /> },

      // Events Path
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            // ":eventId" dynamic path
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
                action: manipulateEventAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },
        ],
      },

      // Root Path
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