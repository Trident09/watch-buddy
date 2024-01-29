import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import Loader from "./Components/Loader/Loader";

const Layout = () => {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const delay = () => {
			setTimeout(() => {
				setIsLoading(false);
			}, 3500); // 3500
		};
		delay();
	}, []);
	return isLoading ? (
		<Loader />
	) : (
		<body>
			<NavBar />
			<main className="min-h-screen">
				<Outlet />
			</main>
			<Footer />
		</body>
	);
};

export default Layout;
