import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  // to prevent infinite loop
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        // code that might fail goes here ...
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();

        if (!response.ok) {
          throw new Error('Failed To Fetch Places!');
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message:
            error.message || 'Could Not Fetch Places, Please Try Again Later.',
        });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An Error Occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching Places Data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

/* fetch()
fetch('http://localhost:3000/places')  // return a Promise
  .then((response) => {        // response: received from resolving Promise
                    /// yield different values & to access those values
                      we chain methods on the result of calling fetch

                         /// parsing the data received in JSON format
      return response.json();  // extract Data that's attached 
    })                      in the JSON format- text-based data format
                                - JSON return another Promise

  .then((resData) => {      // get back response Data & work with Data
      setAvailablePlaces(resData.places);
   });
   
  ? Promise:
   - it's a wrapper object around a value - here is a wrapper around response obj 

  ? JSON():
   - The response.json() method is used to extract the JSON body content from a Response object returned by a fetch request. 
   - It parses the response body as JSON and returns a promise that resolves with the result of parsing the body text as JSON.

! this code can create an infinite loop - calling fetch directly in component
   - when component gets executed
   - a new request would be sent
   - then state gets updated 
   - which causes the component to execute again
   - then again we end up with new request, new update and so on ...

*/

/* Status Code
   - response.ok     // 200, 300 status code    {success response}

   - !response.ok    // 400, 500 status code    {failure response}
*/

/* Why we use try & catch
* this allows you to stop the application from crashing if we want to throw an error like this if (!response.ok) {
                    throw new Error('Failed To Fetch Places!');
                }
*/
