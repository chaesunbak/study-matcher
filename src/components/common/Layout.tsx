import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="mx-auto flex min-h-screen flex-col lg:max-w-6xl">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
