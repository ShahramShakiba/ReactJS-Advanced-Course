import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchEvent, queryClient, updateEvent } from '../util/http.js';
import LoadingIndicator from './../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventForm from './EventForm.jsx';
import Modal from '../UI/Modal.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,

    // Optimistic Updating 👇 
    onMutate: async (data) => {
      const newEvent = data.event;

      //cancelling ongoing queries | it won't cancel mutation
      await queryClient.cancelQueries({ queryKey: ['events', id] });
      //roll-back our optimistic update if it does "fail" on the backend
      const previousEvent = queryClient.getQueryData(['events', id]);

      //"queryClient": update data behind the scenes and interact with the React-Query
      queryClient.setQueryData(['events', id], newEvent);

      return { previousEvent };
    },

    onError: (error, data, context) => {
      queryClient.setQueryData(['events', id], context.previousEvent);
    },

    // fetch the latest-data
    onSettled: () => {
      queryClient.invalidateQueries(['events', id]);
    },
  });

  function handleSubmit(formData) {
    mutate({ id, event: formData });
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;
  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }
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
        <Link to="../" className="button-text">
          Cancel
        </Link>

        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}> {content} </Modal>;
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
