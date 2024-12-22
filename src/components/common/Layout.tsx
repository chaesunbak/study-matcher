import Header from './Header';
import Footer from './Footer';

import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex min-h-screen flex-grow flex-col px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
