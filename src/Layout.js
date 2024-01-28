import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Preloader from './Components/PreLoader/Preloader';

const Layout = () => {

    const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const delay = () => {
			setTimeout(() => {
				setIsLoading(false);
			}, 1500);
		};
		delay();
	}, []);
	return isLoading ? (
		<Preloader />
	) : (
		<body>
			<NavBar />
			<main className="pt-20">
				<Outlet />
			</main>
			<Footer />
		</body>
	);

}

export default Layout