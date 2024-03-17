import { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);

    const response = await fetch('https://swapi.dev/api/films/');
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
    setIsLoading(false);
  }

  return (
    <>
      <section className="fetch">
        <button onClick={fetchMoviesHandler} className="fetch-btn">
          Fetch Movies
        </button>
      </section>

      <section className="movies">
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && (
          <p className="error"> Found No Movies 🚨 </p>
        )}
        {isLoading && <p className="loading"> Loading... 🔭</p>}
      </section>
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
