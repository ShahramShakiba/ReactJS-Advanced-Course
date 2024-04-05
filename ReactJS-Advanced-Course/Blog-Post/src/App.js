import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';
import HomePage from './pages/Home';

// implement ` Lazy Loading ` 
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

/* Deploying on "Firebase"
Go to Firebase site
create a new project
build
Hosting
get started

Install Firebase CLI: npm install -g firebase-tools

Install Sign in to Google: firebase login
You might get an error, to fix it: 

1. bypass the script execution policy temporarily: Set-ExecutionPolicy Unrestricted -Scope Process
2. install: firebase login
3. install: firebase init
4. Choose: Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub 
Action deploys ---- then click "space" then hit "enter"
5. choose:  Use an existing project
6. choose the project you created
7. What do you want to use as your public directory? build
8.  Configure as a single-page app (rewrite all urls to /index.html)? (y/N) y 
9.  Set up automatic builds and deploys with GitHub? (y/N) n
10. File build/index.html already exists. Overwrite? (y/N) n
11. install: firebase deploy

At the end
12. set the execution policy back to its original: Set-ExecutionPolicy Restricted -Scope Process

to disable your site: install: firebase hosting:disable
*/