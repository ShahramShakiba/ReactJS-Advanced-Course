import { useParams } from 'react-router-dom';

export default function EventDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Events Detail Page!</h1>

      <p> Event ID: {params.eventID} </p>
    </>
  );
}

/* what does "useParams" do 
*Contains every dynamic path segment we define in our route definition as a property.

* This hook provides a straightforward way to extract dynamic segments from the "URL" and use them in your application logic. 

* By using useParams, you can dynamically "render components" or "fetch data" based on the values present in the URL. 

* It simplifies the process of working with dynamic routes and enhances the flexibility of your React applications.
*/
