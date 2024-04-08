import { useQuery } from '@tanstack/react-query';
import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from 'react-router-dom';

import { fetchEvent, queryClient, updateEvent } from '../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventForm from './EventForm.jsx';
import Modal from '../UI/Modal.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  //tell us curren navigation state of react-router
  const { state } = useNavigation();
  const submit = useSubmit();
  const { id } = useParams();

  const { data, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),

    staleTime: 10000, // 10seconds
  });

  function handleSubmit(formData) {
    submit(formData, { method: 'PUT' });
  }

  function handleClose() {
    navigate('../');
  }

  let content;
  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed To Load Event"
          message={
            error.info?.message ||
            'Failed to load event. Please check your inputs and try again later.'
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            OKAY
          </Link>
        </div>
      </>
    );
  }
  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === 'submitting' ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>

            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}> {content} </Modal>;
}

//execute it before loads and rerenders EditEvent Component | fetch data before component even appears on the screen
export function loader({ params }) {
  //trigger a query programmatically
  return queryClient.fetchQuery({
    queryKey: ['events', { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

//will be triggered when a form submitted
export async function action({ request, params }) {
  //get hold of the submitted data
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  //transforms this more complex formData-Obj that is yielded by this formData() method to a simple key value pair object in js

  await updateEvent({ id: params.id, event: updatedEventData });
  //only continue once this process completed

  //fetch updated data
  await queryClient.invalidateQueries(['events']);

  return redirect('../');
}

/* onMutate
- will be execute right when you call mutate, before this process is done, before you got back a response
*/

/* .cancelQueries({ queryKey: ['events', id] });

* making sure if we had any outgoing queries for that key, those queries would be canceled and we would not have clashing response data from those queries and our optimistically updated query data

* - because if those ongoing queries finished before the updating request was done, we would've fetched old data again

* - this will returns a "Promise" and in oder to use "await" here we should add async 
*/

/* setQueryData(['events', id], newEvent);
    - first argument: the key of that query that u do wanna edit
    - second argument: what u want to replace it with, that new-data u wanna store
        -- which is that data u sent to the backend through handleSubmit
        -- react-query passes this data to => onMutate: (data) => {} as a value

* to manipulate that already stored data without waiting for a response

*/

/* queryClient.getQueryData(); 

- currently stored query-data, which we wanna execute before we set it to some new-data
*/

/* onSettled
- will be called whenever this mutation is done, no matter if it failed or succeeded
*/

/*  "Optimistic Updating" for Edit Events

const { mutate } = useMutation({
    mutationFn: updateEvent,

    /// Optimistic Updating 👇
    onMutate: async (data) => {
      const newEvent = data.event;

      ///cancelling ongoing queries | it won't cancel mutation
      await queryClient.cancelQueries({ queryKey: ['events', id] });

      ///roll-back our optimistic update if it does "fail" on the backend
      const previousEvent = queryClient.getQueryData(['events', id]);

      ///"queryClient": update data behind the scenes and interact with the React-Query
      queryClient.setQueryData(['events', id], newEvent);

      return { previousEvent };
    },

    onError: (error, data, context) => {
      queryClient.setQueryData(['events', id], context.previousEvent);
    },

    /// fetch the latest-data
    onSettled: () => {
      queryClient.invalidateQueries(['events', id]);
    },
  });

  function handleSubmit(formData) {
   mutate({ id, event: formData });
    navigate('../'); 
  }

*/

/* Why we still have "useQuery" in our Component while we use loader fn

  we fetch-data with "loader" but we need to keep this query here as well,
  - when useQuery is executed again here in the component it's this cached data will be used

  - for instance: if we tab-out of this window and come back to it later, it trigger a behind-the-scenes fetch to look for updated data  
*/
