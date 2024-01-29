import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "./Components/Loader/Loader";
import Header from "./Components/Header/Header";

const Layout = () => {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const delay = () => {
			setTimeout(() => {
				setIsLoading(false);
			}, 35); // 3500
		};
		delay();
	}, []);
	return isLoading ? (
		<Loader />
	) : (
		<div className="min-h-screen">
			<Header />
			<main>
				<Outlet />
			</main>
			{/* <Footer /> */}
		</div>
	);
};

export default Layout;
