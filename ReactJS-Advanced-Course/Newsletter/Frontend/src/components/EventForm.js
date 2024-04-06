import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
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
    <Form method={method} className="form">
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

export async function action({ request, params }) {
  const data = await request.formData();
  const method = request.method;

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  // submitting new event
  let url = 'http://localhost:8080/events';

  // editing event
  if (method === 'PATCH') {
    const eventId = params.eventId;

    url = 'http://localhost:8080/events/' + eventId;
  }

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(eventData),
  });

  console.log('Response status:', response.status);
  console.log('Response body:', await response.json());

  //Updating the event failed | show errors in the form
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: 'Network error, could not save Event!' },
      { status: 500 }
    );
  }

  return redirect('/events');
}

/* useActionData
* The most common use-case for this hook is form "validation errors". If the form isn't right, you can return the errors and let the user try again

- This hook provides the returned value from the previous navigation's action result, or undefined if there was no submission.
*/
