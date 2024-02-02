import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "./Components/Loader/Loader";
import Header from "./Components/Header/Header";
import MainNav from "./Components/MainNav/MainNav";
import { Container } from "@mui/material";

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
		<div>
			<div className="min-h-screen">
				<Header />
				<main className="pt-[10vh]">
					<Container>
						<Outlet />
					</Container>
				</main>
			</div>
			<MainNav />
		</div>
	);
};

export default Layout;
