import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../Components/CustomPagination/CustomPagination";
import Genres from "../../Components/Genres/Genres";
import SingleContent from "../../Components/SingleContent/SingleContent";
import useGenre from "../../Hook/useGenres";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [numOfPages, setNumOfPages] = useState();
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [genres, setGenres] = useState([]);
	const genreforURL = useGenre(selectedGenres);

	const fetchMovies = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
		);
		setMovies(data.results);
		setNumOfPages(data.total_pages);
	};

	useEffect(() => {
		fetchMovies();
		// eslint-disable-next-line
	}, [page, genreforURL]);

	return (
		<div className="pb-14">
			<span className="pagetitle uppercase flex justify-center text-[4vw] text-[white] p-1 rounded-[50px]">
				Movies
			</span>
			<Genres
				type="movie"
				selectedGenres={selectedGenres}
				setSelectedGenres={setSelectedGenres}
				genres={genres}
				setGenres={setGenres}
				setPage={setPage}
			/>
			<div className="trending flex flex-wrap justify-around">
				{movies.map((m) => {
					return (
						<SingleContent
							key={m.id}
							id={m.id}
							poster={m.poster_path}
							title={m.title || m.name}
							date={m.first_air_date || m.release_date}
							media_type={m.media_type}
							vote_average={m.vote_average}
						/>
					);
				})}
			</div>
			{numOfPages > 1 && (
				<CustomPagination
					setPage={setPage}
					numOfPages={numOfPages}
				/>
			)}
		</div>
	);
};

export default Movies;
