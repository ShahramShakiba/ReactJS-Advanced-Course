import { useState } from 'react';

export function useInput(requestConfig, applyData) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);

    // Make fetch Reusable For Both (GET, POST)
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      if (!response.ok) {
        throw new Error('Request Failed!');
      }

      const data = await response.json();

      // data transformation fn - comes from outside of hook
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something Went Wrong!');
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
}
