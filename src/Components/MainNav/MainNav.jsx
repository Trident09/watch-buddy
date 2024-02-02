import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import TvIcon from "@mui/icons-material/Tv";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LabelBottomNavigation() {
	const [value, setValue] = React.useState("trending");
	const navigate = useNavigate();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (value === "trending") navigate("/");
		if (value === "movies") navigate("/movies");
		if (value === "series") navigate("/series");
		if (value === "search") navigate("/search");
	}, [navigate, value]);

	return (
		<BottomNavigation
			sx={{ width: 500 }}
			value={value}
			onChange={handleChange}
			style={{
				height: "60px",
				fontSize: "0.5rem",
				width: "100%",
				position: "fixed",
				bottom: 0,
				backgroundColor: "#2d313a",
				zIndex: 100,
			}}
		>
			<BottomNavigationAction
				style={{ color: "white" }}
				label="Trending"
				value="trending"
				icon={<WhatshotIcon />}
			/>
			<BottomNavigationAction
				style={{ color: "white" }}
				label="Movies"
				value="movies"
				icon={<MovieIcon />}
			/>
			<BottomNavigationAction
				style={{ color: "white" }}
				label="TV Shows"
				value="series"
				icon={<TvIcon />}
			/>
			<BottomNavigationAction
				style={{ color: "white" }}
				label="Search"
				value="search"
				icon={<SearchIcon />}
			/>
		</BottomNavigation>
	);
}
