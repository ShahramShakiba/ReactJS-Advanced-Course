import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('products');
  };

  return (
    <>
      <h1> My Home Page! </h1>
      <p>
        Go to <Link to="products">the list of Products</Link>.
      </p>

      <p>
        <button onClick={navigateHandler}> Navigating Programmatically </button>
      </p>
    </>
  );
}

/* What does "Link" do?
* It allows you to create hyperlinks to other routes in your application without causing a "full page reload". 

* When a user clicks on a Link component, React Router intercepts(stop) the click-event and handles the navigation "internally", updating the URL and rendering the appropriate component associated with the target route.
*/
