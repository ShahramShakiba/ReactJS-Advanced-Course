import { useState } from 'react';

export function useInput(requestConfig, applyData) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (taskText) => {
    setIsLoading(true);
    setError(null);

    try {
      // Make fetch Reusable For Both (GET, POST)
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        body: JSON.stringify(requestConfig.body),
        headers: requestConfig.headers,
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
