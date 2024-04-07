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
    //pass the value entered into search-input
    queryFn: () => fetchEvents(searchTerm),
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
