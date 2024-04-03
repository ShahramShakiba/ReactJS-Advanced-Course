import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
} from 'react-router-dom';

export default function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData(); //validation errors

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method="post" className="form">
      {/* returning the error-response which we got from the backend */}
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <p>
        <label htmlFor="title"> Title </label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''}
        />
      </p>

      <p>
        <label htmlFor="image"> Image </label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ''}
        />
      </p>

      <p>
        <label htmlFor="date"> Date </label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ''}
        />
      </p>

      <p>
        <label htmlFor="description"> Description </label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''}
        />
      </p>

      <div className="actions">
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>

        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save Event'}
        </button>
      </div>
    </Form>
  );
}

/* useActionData
* The most common use-case for this hook is form "validation errors". If the form isn't right, you can return the errors and let the user try again

- This hook provides the returned value from the previous navigation's action result, or undefined if there was no submission.
*/
