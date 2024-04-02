import { useRouteError } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent';

export default function ErrorPage() {
  const error = useRouteError();

  let title = 'An Error Occurred!';
  let message = 'Something Went Wrong!';

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  // enter a path that not supported
  if (error.status === 404) {
    title = 'Not Found!';
    message =
      'Could Not Find This Page! Please check the "URL" or return to Home page.';
  }

  return (
    <>
      <MainNavigation />

      <main className="noPage-error">
        <PageContent title={title}>
          <p> {message} </p>
        </PageContent>
      </main>
    </>
  );
}
