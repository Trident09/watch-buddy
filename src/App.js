import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Movies from "./Pages/Movies/Movies";
import Search from "./Pages/Search/Search";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";

const App = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<Layout />}
			>
				<Route
					index
					element={<Trending />}
					exact
				/>
				<Route
					path="/movies"
					element={<Movies />}
				/>
				<Route
					path="/series"
					element={<Series />}
				/>
				<Route
					path="/search"
					element={<Search />}
				/>
			</Route>
		</Routes>
	);
};

export default App;
