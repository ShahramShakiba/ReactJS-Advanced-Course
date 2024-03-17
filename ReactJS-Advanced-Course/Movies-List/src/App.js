import { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something Went Wrong ❌');
      }

      const data = await response.json();

      // convert the API-Data to my desire data
      const moviesData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(moviesData);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p className="warning"> Found No Movies 🚨 </p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p className="error"> {error} </p>;
  }

  if (isLoading) {
    content = <p className="loading"> Loading... 🔭 </p>;
  }

  return (
    <>
      <section className="fetch">
        <h2> The Star Wars Movies API </h2>
        <button onClick={fetchMoviesHandler} className="fetch-btn">
          Fetch Movies
        </button>
      </section>

      <section className="movies"> {content} </section>
    </>
  );
}

/* Backend API (Application Programming Interface) 
- https://swapi.dev/

* REST API: Representational State Transfer (also called a RESTful API or RESTful web API)
* نمایش اطلاعات برای کاربران از راهی که خوانایی بالایی داشته باشد

- (API) that uses HTTP requests to access and use data.

- That data can be used to GET, PUT, POST and DELETE data types, 
- which refers to the reading, updating, creating and deleting of operations concerning resources.

- An API for a website is code that allows two software programs to communicate with each other.

? More about REST API & GraphQL API
- https://www.youtube.com/watch?v=PeAOEAmR0D0
*/

/* fetch() method
const fetchMoviesHandler = () => {
*    fetch('https://swapi.dev/api/films/')
*      .then((response) => {
        return response.json();
      })
*      .then((data) => {
        /// convert the API-Data to my desire data
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });

*        setMovies(transformedMovies);
      });
  };
*/

/* HTTP response status codes
  - 200 OK: The request has succeeded.

  - 400 Bad Request: The server could not understand the request due to invalid syntax.

  - 401 Unauthorized: The user needs to authenticate themselves to get the requested response.

  - 403 Forbidden: The server understood the request, but it refuses to authorize it.

  - 404 Not Found: The server could not find a resource matching the request URI.

  - 500 Internal Server: The server has encountered a situation it does not know how to handle.


*/

/* An alternative way to write JSX
return (
    <>
      <section className="fetch">
        <h2> The Star Wars Movies API </h2>
        <button onClick={fetchMoviesHandler} className="fetch-btn">
          Fetch Movies
        </button>
      </section>

      <section className="movies">
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && (
          <p className="warning"> Found No Movies 🚨 </p>
        )}
        {!isLoading && error && <p className="error"> {error} </p>}

        {isLoading && <p className="loading"> Loading... 🔭</p>}
      </section>
    </>
  );
*/
