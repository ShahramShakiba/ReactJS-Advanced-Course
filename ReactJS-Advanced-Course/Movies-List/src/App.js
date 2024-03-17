import MoviesList from './components/MoviesList';
import './App.css';

export default function App() {
  const dummyMovies = [
    {
      id: 1,
      title: 'Some Dummy Movie',
      openingText: 'This is the opening text of the movie',
      releaseDate: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      openingText: 'This is the second opening text of the movie',
      releaseDate: '2021-05-19',
    },
  ];

  return (
    <>
      <section className="fetch">
        <button className="fetch-btn">Fetch Movies</button>
      </section>

      <section className="movies">
        <MoviesList movies={dummyMovies} />
      </section>
    </>
  );
}
