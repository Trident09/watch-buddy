import { Chip, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const Genres = ({
	type,
	selectedGenres,
	setSelectedGenres,
	genres,
	setGenres,
	setPage,
}) => {
	const handleAdd = (genre) => {
		setSelectedGenres([...selectedGenres, genre]);
		setGenres(genres.filter((g) => g.id !== genre.id));
		setPage(1);
	};

	const handleRemove = (genre) => {
		setSelectedGenres(
			selectedGenres.filter((selected) => selected.id !== genre.id)
		);
		setGenres([...genres, genre]);
		setPage(1);
	};

	const fetchGenres = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		setGenres(data.genres);
	};

	useEffect(() => {
		fetchGenres();
		return () => {
			setGenres([]);
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className="py-3">
			<ThemeProvider theme={darkTheme}>
				{selectedGenres &&
					selectedGenres.map((selectedgenre) => (
						<Chip
							style={{ margin: 2 }}
							label={selectedgenre.name}
							key={selectedgenre.id}
							color="primary"
							clickable
							size="small"
							onDelete={() => handleRemove(selectedgenre)}
						/>
					))}
				{genres &&
					genres.map((genre) => (
						<Chip
							style={{ margin: 2 }}
							label={genre.name}
							key={genre.id}
							clickable
							size="small"
							onClick={() => handleAdd(genre)}
						/>
					))}
			</ThemeProvider>
		</div>
	);
};

export default Genres;
