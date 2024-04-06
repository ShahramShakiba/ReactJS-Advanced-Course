import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

export default function RootLayoutPage() {
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
