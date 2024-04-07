// all that codes which controls how to Fetch-data
export async function fetchEvents({ signal, searchTerm }) {
  console.log(searchTerm);
  let url = 'http://localhost:3000/events';

  //make url dynamic | for search events
  if (searchTerm) {
    url += `?search=${searchTerm}`;
  }

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    //Assigns the HTTP status code to the error-obj
    error.code = response.status;
    //Retrieves additional error information from the response-body
    error.info = await response.json();

    //Throws the error if the response is not successful
    throw error;
  }

  //Parses the JSON response and extracts the events data
  const { events } = await response.json();

  // Returns the fetched event-data
  return events;
}

export async function createNewEvent(eventData) {
  const response = await fetch(`http://localhost:3000/events`, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch(`http://localhost:3000/events/images`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the images');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}

/* signal
- we can make sure that the request that's being sent is aborted if React-Query thinks that it should be aborted because for example we left the page.

- we passed like an object to fetch-fn so that the browser can use that abort-signal internally to stop this request


- allows us to cancel a request by creating an parameter is used in aborting a request 

- allows you to communicate with asynchronous functions to request the cancellation of an operation. 
  This can be extremely useful when you need to stop an ongoing task due to changes in user input or other events.
*/
