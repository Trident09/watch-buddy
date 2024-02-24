import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import TvIcon from "@mui/icons-material/Tv";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LabelBottomNavigation() {
	const [value, setValue] = React.useState("trending");
	const navigate = useNavigate();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

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
				onClick={() => navigate("/")}
			/>
			<BottomNavigationAction
				style={{ color: "white" }}
				label="Movies"
				value="movies"
				icon={<MovieIcon />}
				onClick={() => navigate("/movies")}
			/>
			<BottomNavigationAction
				style={{ color: "white" }}
				label="TV Shows"
				value="series"
				icon={<TvIcon />}
				onClick={() => navigate("/series")}
			/>
			<BottomNavigationAction
				style={{ color: "white" }}
				label="Search"
				value="search"
				icon={<SearchIcon />}
				onClick={() => navigate("/search")}
			/>
		</BottomNavigation>
	);
}
