import MainNavigation from '../components/MainNavigation';

export default function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main className="noPage-error">
        <h1> An Error Occurred! </h1>
        <p> Could not find this page!</p>
      </main>
    </>
  );
}
