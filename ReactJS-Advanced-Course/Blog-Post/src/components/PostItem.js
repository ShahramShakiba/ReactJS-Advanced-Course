export default function PostItem({ post }) {
  return (
    <article className="item">
      <h1> {post.title} </h1>

      <p> {post.body} </p>
    </article>
  );
}
