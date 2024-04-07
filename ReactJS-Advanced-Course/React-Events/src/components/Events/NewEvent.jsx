import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { createNewEvent, queryClient } from '../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventForm from './EventForm.jsx';
import Modal from '../UI/Modal.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  // mutate: will send-req only when you tell it to send that req
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    //what happen after submitting new-event
    //this fn will execute if the mutation did succeed
    onSuccess: () => {
      //refetching data
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/events');
    },
  });

  function handleSubmit(formData) {
    //to have the right format for the backend  we need to convert our form data into an event
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>

            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>

      {isError && (
        <ErrorBlock
          title="Failed to create event!"
          message={
            error.info?.message ||
            'Failed to create event. Please check your inputs and try again later.'
          }
        />
      )}
    </Modal>
  );
}

/*  queryClient.invalidateQueries({ queryKey: ['events'] });

* tells React QQuery that the data fetched by certain queries is outdated now, that it should be marked as "stale" and that an immediate refetch should be triggered

*/
