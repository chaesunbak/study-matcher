import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-indigo-100 w-1/2 mx-auto">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;
