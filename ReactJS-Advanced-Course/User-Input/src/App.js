// import SimpleInput from './components/SimpleInput';
import BasicForm from './components/BasicForm';

export default function App() {
  return (
    <>
      <div className="header">
        <h1> User Input </h1>
        <p> ⚙ Handling Form Submission & Validating User Input </p>
      </div>

      <div className="app">
        {/* <SimpleInput /> */}
        <BasicForm />
      </div>
    </>
  );
}
