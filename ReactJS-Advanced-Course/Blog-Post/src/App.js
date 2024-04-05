import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';
import HomePage from './pages/Home';

// Load Blog-Page & Post-Page lazily
const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));

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
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            // Loading loader-function lazily
            loader: () =>
              //import: yield a Promise || module = loaded-file
              import('./pages/Blog').then((module) => module.loader()),
          },
          
          {
            path: ':id',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: async (meta) => {
              const module = await import('./pages/Post');

              return module.loader(meta);
            },
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

/* <Suspense> </Suspense>
- other Components can use it to wait for content to be loaded before rendering the content
*/

/* meta Object
loader: async ({ params }) => {
  const module = await import('./pages/Post');

  return module.loader({ params });
},

?- here we need to pass params to the loader 
* - we can extract params like this {params} and pass it to loader({params})
* - or we simply take that overall meta-object 
*/
