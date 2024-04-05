import { useLoaderData } from 'react-router-dom';

import PostList from '../components/PostList';

export default function BlogPage() {
  const posts = useLoaderData();
  
  return <PostList posts={posts} />;
}

export function loader() {
  return fetch('https://jsonplaceholder.typicode.com/posts');
}
