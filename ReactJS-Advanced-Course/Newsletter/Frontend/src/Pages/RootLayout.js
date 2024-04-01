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
