import Header from './Header';

import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="mx-auto flex min-h-screen flex-col lg:max-w-6xl">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
