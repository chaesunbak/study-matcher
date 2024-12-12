import Header from './Header';

import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="container mx-auto flex min-h-screen flex-col px-4">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
