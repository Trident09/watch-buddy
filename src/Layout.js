import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import Loader from "./Components/Loader/Loader";
import MainNav from "./Components/MainNav/MainNav";

const Layout = () => {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const delay = () => {
			setTimeout(() => {
				setIsLoading(false);
			}, 3543); // 3500
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
