import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home';
import Products from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage from './pages/ProductDetail';

//defining routes in "an array of objects"
const router = createBrowserRouter([
  {
    // "/" is a absolute path - root
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      //these are relative-path | which will be append after the path of the parent route
      { index: true, element: <HomePage /> }, // path: ''
      { path: 'products', element: <Products /> },
      // ":" this part of the path is dynamic
      { path: 'products/:productID', element: <ProductDetailPage /> },
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

/* Relative-path VS Absolute-path

* Relative paths are based on the current URL, while absolute paths start from the root domain. 

* When defining routes, relative paths are useful for "nested routes within a component", making it easier to manage routing within components. 

* On the other hand, absolute paths are beneficial for defining routes that are "independent of the current URL structure", providing a fixed starting point regardless of the current location.
*/

/* index-route { index: true , element: <HomePage /> },
* allows you to define the default route that should be loaded if the parent routes path is active

* it's a default route, that should be displayed if the parent route's path is currently active
 */
