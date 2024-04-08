import { useIsFetching } from '@tanstack/react-query';

export default function Header({ children }) {
  const fetching = useIsFetching();

  return (
    <>
      <div id="main-header-loading">{fetching > 0 && <progress />}</div>

      <header id="main-header">
        <div id="header-title">
          <h1> React Events </h1>
        </div>

        <nav> {children} </nav>
      </header>
    </>
  );
}

/* useIsFetching()

- is react-query fetching or not

- fetching will be a number that's "zero" if react-query is not fetching any data any where in this app
- or a" higher number" if react-query is fetching data
*/
