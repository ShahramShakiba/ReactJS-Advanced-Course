export default function EventItem({ event }) {
  function startDeleteHandler() {
    // ...
  }

  return (
    <article className="event-item">
      <img src={event.image} alt={event.title} />

      <h1> {event.title} </h1>

      <time> {event.date} </time>

      <p> {event.description} </p>

      <menu className="actions">
        <a href="edit">Edit</a>

        <button onClick={startDeleteHandler}> Delete </button>
      </menu>
    </article>
  );
}
