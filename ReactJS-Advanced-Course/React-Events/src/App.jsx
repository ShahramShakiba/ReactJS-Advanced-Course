import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import EventDetails from './components/Events/EventDetails.jsx';
import EditEvent from './components/Events/EditEvent.jsx';
import NewEvent from './components/Events/NewEvent.jsx';
import Events from './components/Events/Events.jsx';

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
      },
    ],
  },
]);

//create a query-client
const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}
