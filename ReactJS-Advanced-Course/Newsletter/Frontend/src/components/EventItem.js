import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';

export default function EventItem({ event }) {
  const token = useRouteLoaderData('root');
  const submit = useSubmit();

  const startDeleteHandler = () => {
    const proceed = window.confirm('Are You Sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  return (
    <article className="event-item">
      <img src={event.image} alt={event.title} />

      <h1> {event.title} </h1>

      <time> {event.date} </time>

      <p> {event.description} </p>

      {token && (
        <menu className="actions">
          <Link to="edit"> Edit </Link>
          
          <button onClick={startDeleteHandler}> Delete </button>
        </menu>
      )}
    </article>
  );
}

/* submit({}, {});
? first argument:
  - is the data that we wanna submit | and that data will automatically be wrapped in a form-data-object which we then could extract with this special formData() method

? second argument:
  - set the same values we could set on a form, like "method" also we could set the "action-key" to a different path
*/
