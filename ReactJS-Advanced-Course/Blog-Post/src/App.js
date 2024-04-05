import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BlogPage, { loader as postsLoader } from './pages/Blog';
import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';
import HomePage from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          { index: true, element: <BlogPage />, loader: postsLoader },
          { path: ':id', element: <PostPage />, loader: postLoader },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
