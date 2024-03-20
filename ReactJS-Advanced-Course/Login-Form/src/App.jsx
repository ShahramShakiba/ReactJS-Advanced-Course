import Header from './components/Header.jsx';
import Signup from './components/Signup.jsx';
import StateLogin from './components/StateLogin.jsx';

export default function App() {
  return (
    <>
      <Header />

      <main>
        {/* <Signup /> */}
        <StateLogin />
      </main>
    </>
  );
}
