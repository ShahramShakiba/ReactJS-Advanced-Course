import PageContent from '../components/PageContent';

export default function HomePage() {
  return (
    <PageContent title="">
      <main className="home-page">
        <h1>React Router & Authentication</h1>

        <p>React Router:</p>
        <ul>
          <li>
            Client side routing allows your app to update the URL from a link
            click without making another request for another document from the
            server.
          </li>
        </ul>

        <p>Authentication:</p>
        <ul>
          <li>
            Authentication in React refers to the process of verifying the
            identity of users accessing a web application.
          </li>
          <li>
            Implementing authentication is crucial for Safeguarding Sensitive
            Data, Maintaining User Privacy, and Preventing Unauthorized Access
            to the application.
          </li>
        </ul>
      </main>
    </PageContent>
  );
}
