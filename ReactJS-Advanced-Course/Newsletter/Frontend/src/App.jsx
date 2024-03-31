import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './components/RootLayout';
import HomePage from './Pages/HomePage';
import EventsPage from './Pages/EventsPage';
import ErrorPage from './Pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/events', element: <EventsPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage

// 7. Output the ID of the selected event on the EventDetailPage

// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
