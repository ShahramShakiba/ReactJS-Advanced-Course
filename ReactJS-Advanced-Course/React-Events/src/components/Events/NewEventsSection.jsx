import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { fetchEvents } from '../util/http.js';
import EventItem from './EventItem.jsx';

export default function NewEventsSection() {
  //sending http-req | get us events-data & info of loading-state & potential-errors | pull out data-property that existed on that obj returned by useQuery
  const { data, isPending, isError, error } = useQuery({
    //cache the data from request
    queryKey: ['events', { max: 3 }],

    //fn make the request to the server
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }), // get access to second argument: to have 3 latest event

    //default is "0"
    staleTime: 5000,
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

/* "staleTime" in useQuery

* a parameter that determines how long the data is considered fresh before triggering a data refetch.

- When you set a "staleTime" value for a particular data query, it specifies the time duration after which the data fetched from the server is considered stale(not fresh). After this period elapses, the library may automatically refetch the data when the component re-renders to ensure that the data remains up-to-date. 

- Setting an appropriate "staleTime" value helps in managing the balance between displaying cached data to improve performance and ensuring that the data is kept current by fetching updates periodically. It's a way to control the validity of cached data and manage when to trigger data refetches based on the staleness of the data.
*/

/* "gcTime" in useQuery 

* gcTime = Garbage-Collection-Time 
  - gcTime: 500000,

- controls how long the data and the cache will be kept around 
?- default is "5 minutes"
*/
