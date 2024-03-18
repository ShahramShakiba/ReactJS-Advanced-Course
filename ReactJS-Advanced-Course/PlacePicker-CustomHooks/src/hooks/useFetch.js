import { useEffect, useState } from 'react';

export function useFetch(fetchPlacesFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedPlacesData, setFetchedPlacesData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        const places = await fetchPlacesFn();
        setFetchedPlacesData(places);
      } catch (error) {
        setError({ message: error.message || 'Failed To Fetch  Data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchPlacesFn]);

  return {
    isFetching,
    error,
    fetchedPlacesData,
  };
}
