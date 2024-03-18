import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const sortedPlaces = sortPlacesByDistance(
              places,
              position.coords.latitude,
              position.coords.longitude
            );

            setAvailablePlaces(sortedPlaces);
            setIsFetching(false);
          },

          (error) => {
            // Handle geolocation error here
            console.error(error);
            setError({
              message:
                'Failed to get user location. Please make sure location services are enabled and try again.',
            }); // if you get this error try using a VPN

            // Set a default location if the geolocation fails
            const defaultPosition = {
              coords: {
                latitude: 36.7651,
                longitude: 45.7218,
              },
            };

            const sortedPlaces = sortPlacesByDistance(
              places,
              defaultPosition.coords.latitude,
              defaultPosition.coords.longitude
            );

            setAvailablePlaces(sortedPlaces);
            setIsFetching(false);
          },
          { timeout: 5000 }
        );
      } catch (error) {
        setError({
          message:
            error.message || 'Could Not Fetch Places, Please Try Again Later.',
        });

        setIsFetching(false);
      }
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
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
