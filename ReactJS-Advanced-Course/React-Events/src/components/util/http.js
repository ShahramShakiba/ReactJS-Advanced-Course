// all that codes which controls how to Fetch-data
export async function fetchEvents(searchTerm) {
  let url = 'http://localhost:3000/events';

  //make url dynamic | for search events
  if (searchTerm) {
    url += `?search=${searchTerm}`;
  }

  const response = await fetch(url);

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
