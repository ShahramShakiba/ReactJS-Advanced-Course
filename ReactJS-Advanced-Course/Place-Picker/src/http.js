// GET available places from backend
export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed To Fetch Places!');
  }

  return resData.places;
}

// GET Stored User places from backend
export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed To Fetch User Places!');
  }

  return resData.places;
}

// SEND such an array of "places" to the BACKEND
export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed To Update User Data.');
  }

  return resData.message;
}

/* body
  - to define which data should be attached as a request body to that outgoing request | then convert it in a attachable format {JSON format}
*/
