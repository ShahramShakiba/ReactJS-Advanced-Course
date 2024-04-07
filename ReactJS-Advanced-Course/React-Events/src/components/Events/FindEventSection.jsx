import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import { fetchEvents } from '../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

export default function FindEventSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const searchElement = useRef();

  //since we use "ref" if fn re-execute this query won't updated and send again | use a useState to updated dynamically
  const { data, isPending, isError, error } = useQuery({
    //cache different-data for different-keys based on the same-query
    queryKey: ['events', { search: searchTerm }],
    //pass the value entered into search-input as an obj to be used in the server request
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchElement.current?.value);
  };

  let content = <p> Please enter a search term and to find events. </p>;
  if (isPending) {
    content = <LoadingIndicator />;
  }
  if (isError) {
    content = (
      <ErrorBlock
        title="An Error Occurred!"
        message={error.info?.message || 'Failed to load event list.'}
      />
    );
  }
  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2> Find your next event! </h2>

        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />

          <button> Search </button>
        </form>
      </header>

      {content}
    </section>
  );
}

/* Why we define an object of signal & searchItem on queryFn?

* queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),

?- if we don't do that and we just pass searchTerm to fetchEvents(searchTerm) like this
?- searchTerm will set to some strange value and our NewEventSection won't get execute when the NewEventSection component tries to fetch events with this useQuery usage

?- this behavior is because:
- react-query pass an default-obj to that fn you defined as a query-fn
- an obj that gives us a "queryKey" & a "signal"
- signal is require for aborting that request if you for example navigate-away from this page before the request was finished

- in fetchEvents-fn we can use obj destructuring to pull out the different things we will get here
- 
*/