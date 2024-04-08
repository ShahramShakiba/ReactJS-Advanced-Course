import { QueryClientProvider } from '@tanstack/react-query';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import EventDetails from './components/Events/EventDetails.jsx';
import { queryClient } from './components/util/http.js';
import NewEvent from './components/Events/NewEvent.jsx';
import Events from './components/Events/Events.jsx';
import EditEvent, {
  loader as editEventLoader,
  action as editEventAction,
} from './components/Events/EditEvent.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/events" />,
  },
  {
    path: '/events',
    element: <Events />,

    children: [
      {
        path: '/events/new',
        element: <NewEvent />,
      },
    ],
  },
  {
    path: '/events/:id',
    element: <EventDetails />,
    children: [
      {
        path: '/events/:id/edit',
        element: <EditEvent />,
        loader: editEventLoader,
        action: editEventAction,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}
