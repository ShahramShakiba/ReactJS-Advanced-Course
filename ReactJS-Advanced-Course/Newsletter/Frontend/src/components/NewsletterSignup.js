import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

export default function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    //idle: not executing an action or a loader
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form method="post" action="/newsletter" className="newsletter">
      <input
        type="email"
        placeholder="Sign up for Newsletter..."
        aria-label="Sign up for Newsletter"
      />

      <button> Sign up </button>
    </fetcher.Form>
  );
}

/* useFetcher()
* with fetcher we don't transition, we don't move to a different route | if you wanna interact with some action or a loader without transitioning; if you wanna send your request behind the scenes, without triggering any route changes | get the data on the page to revalidate without changing the URL

* this will trigger an action but it won't initialize a "route-transition"

* it should be used whenever you wanna trigger action or also a loader with help of load-function without actually navigating to the page to which the loader belongs or the  page which the action belongs
*/
