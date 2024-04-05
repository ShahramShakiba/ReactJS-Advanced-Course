import { redirect } from 'react-router-dom';

export function getAuthToken() {
  const token = localStorage.getItem('token');

  //if we don't have a token
  if (!token) {
    return null; // undefined won't work - the loader won't return that value to the components
  }

  // if we do have a token
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }
}

//_____ Token Expiration
export function getTokenDuration() {
  const StoredExpirationDate = localStorage.getItem('expiration');

  //transform to a date Obj
  const expirationDate = new Date(StoredExpirationDate);

  // current date
  const now = new Date();
  // getTime(): store time in milliseconds
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}
