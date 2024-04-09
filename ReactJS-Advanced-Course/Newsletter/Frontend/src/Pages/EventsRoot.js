import { Outlet } from 'react-router-dom';

import EventsNavigation from '../components/EventsNavigation';

export default function EventsRootLayout() {
  return (
    <>
      <EventsNavigation />

      <main>
        <Outlet /> {/* Child routes will be rendered here */}
      </main>
    </>
  );
}
