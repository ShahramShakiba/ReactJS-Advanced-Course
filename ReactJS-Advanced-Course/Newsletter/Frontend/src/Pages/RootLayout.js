import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../Util/auth';

export default function RootLayoutPage() {
  const token = useLoaderData();
  const submit = useSubmit();

  // automatically logout after 1H
  useEffect(() => {
    if (!token) return;

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'POST' });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'POST' });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />

      <main>
        <Outlet /> {/* Child routes will be rendered here */}
      </main>
    </>
  );
}

/* What does "Outlet" do?
 * It acts as a placeholder where child routes can be rendered within a parent route.
 */

/* loading indicator
* One way of finding out wether you're currently waiting for data or not 

* we use "useNavigation" in a component which is already visible on the screen, like this RootLayout Component

navigation.state === '';
  1. idle = don't have any active route transition
  2. loading = having active transition & we're loading data
  3. submitting = we're submitting data

const navigation = useNavigation();
 <main>
    {navigation.state === 'loading' && <p>Loading... 📡 </p>}
    <Outlet />  
  </main>

 */
