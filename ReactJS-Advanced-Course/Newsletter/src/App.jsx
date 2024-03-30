import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home';
import Products from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage from './pages/ProductDetail';

//defining routes in "an array of objects"
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <Products /> },
      // " : " this part of the path is dynamic
      { path: '/products/:productID', element: <ProductDetailPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

/* defining routes with "JSX Codes" 

import {
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
