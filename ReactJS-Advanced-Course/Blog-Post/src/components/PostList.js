import { Link } from 'react-router-dom';

export default function PostList({ posts }) {
  return (
    <ul className="list">
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={post.id.toString()}> {post.title} </Link>
        </li>
      ))}
    </ul>
  );
}
