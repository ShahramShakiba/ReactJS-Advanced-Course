import { Link } from 'react-router-dom';

export default function MainNavigation() {
  return (
    <header className="header">
      <nav>
        <ul className="list">
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/products"> Products </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
