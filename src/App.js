import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./Pages/HomePage";

const App = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<Layout />}
			>
				<Route
					index
					element={<HomePage />}
				/>
				{/* <Route
					path="/about"
					element={<AboutMe />}
				/> */}
			</Route>
		</Routes>
	);
};

export default App;
