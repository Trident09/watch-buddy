import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../../Components/SingleContent/SingleContent";
import CustomPagination from "../../Components/CustomPagination/CustomPagination";

const Trending = () => {
	const [trending, setTrending] = useState([]);
	const [page, setPage] = useState(1);

	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
		);
		setTrending(data.results);
	};

	useEffect(() => {
		fetchTrending();
		// eslint-disable-next-line
	}, [page]);

	return (
		<div className="pb-14">
			<span className="pagetitle uppercase flex justify-center text-[4vw] text-[white] p-1 rounded-[50px]">
				Trending
			</span>
			<div className="trending flex flex-wrap justify-around">
				{trending.map((t) => {
					return (
						<SingleContent
							key={t.id}
							id={t.id}
							poster={t.poster_path}
							title={t.title || t.name}
							date={t.first_air_date || t.release_date}
							media_type={t.media_type}
							vote_average={t.vote_average}
						/>
					);
				})}
			</div>
			<CustomPagination setPage={setPage}/>
		</div>
	);
};

export default Trending;
