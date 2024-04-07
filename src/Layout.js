import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Loader from "./Components/Loader/Loader";
import MainNav from "./Components/MainNav/MainNav";
import NameBlock from "./Components/NameBlock/NameBlock";

const Layout = () => {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const delay = () => {
			setTimeout(() => {
				setIsLoading(false);
			}, 3543); // 3543
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
				<Footer />
				<div className="pb-10 w-full flex justify-center items-center">
					<NameBlock />
				</div>
			</div>
			<MainNav />
		</div>
	);
};

export default Layout;
