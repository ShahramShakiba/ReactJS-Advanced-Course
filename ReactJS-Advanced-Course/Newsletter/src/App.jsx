import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';

export default function App() {
  //pass an array of route-definition objects
  const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '', element: '' },
  ]);

  return <RouterProvider router={router} />;
}
