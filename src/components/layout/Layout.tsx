import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import RouteSeo from './RouteSeo';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <RouteSeo />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
