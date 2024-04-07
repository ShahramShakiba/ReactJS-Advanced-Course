import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { fetchEvents } from '../util/http.js';
import EventItem from './EventItem.jsx';

export default function NewEventsSection() {
  //sending http-req | get us events-data & info of loading-state & potential-errors | pull out data-property that existed on that obj returned by useQuery
  const { data, isPending, isError, error } = useQuery({
    // cache the data from req
    queryKey: ['events'],
    // fn make the request to the server
    queryFn: fetchEvents,
  });

  let content;
  if (isPending) {
    content = <LoadingIndicator />;
  }
  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        //if it has a info-prop access the msg
        message={
          error.info?.message ||
          'Failed to Fetch  Events. Please try again later.'
        }
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
    <section className="content-section" id="new-events-section">
      <header>
        <h2> Recently added events </h2>
      </header>

      {content}
    </section>
  );
}
