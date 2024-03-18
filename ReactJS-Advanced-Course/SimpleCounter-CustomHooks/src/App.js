import BackwardCounter from './components/BackwardCounter';
import ForwardCounter from './components/ForwardCounter';

export default function App() {
  return (
    <>
      <header>
        <h1> Count Up & Count Down </h1>
        <h2> Created with Custom Hooks</h2>
      </header>

      <ForwardCounter />
      <BackwardCounter />

      <section className="content">
        <p>
          Custom Hooks are a powerful feature of React that allows you to
          encapsulate common functionality to outsource Stateful logic into
          reusable functions.
        </p>
      </section>
    </>
  );
}
