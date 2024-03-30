import { Link } from 'react-router-dom';

export default function Products() {
  const PRODUCTS = [
    { id: 'p1', title: 'Product 1' },
    { id: 'p2', title: 'Product 2' },
    { id: 'p3', title: 'Product 3' },
  ];

  return (
    <>
      <h1> The Products Page! </h1>

      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            {/* define a relative path */}
            <Link to={product.id}> {product.title} </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

/* define a absolute-path
 <Link to={`/products/${product.id}`}> {product.title} </Link>
*/
