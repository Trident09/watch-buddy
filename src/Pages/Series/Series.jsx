import React, { useEffect, useState } from 'react'
import Genres from '../../Components/Genres/Genres';
import CustomPagination from '../../Components/CustomPagination/CustomPagination';
import SingleContent from '../../Components/SingleContent/SingleContent';
import useGenre from '../../Hook/useGenres';
import axios from 'axios';

const Series = () => {
  const [series, setSeries] = useState([]);
	const [page, setPage] = useState(1);
	const [numOfPages, setNumOfPages] = useState();
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [genres, setGenres] = useState([]);
	const genreforURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setSeries(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, [genreforURL, page]);
  
  return (
    <div className="pb-14">
      <span className='pagetitle uppercase flex justify-center text-[4vw] text-[white] p-1 rounded-[50px]'>Series</span>
      <Genres
				type="tv"
				selectedGenres={selectedGenres}
				setSelectedGenres={setSelectedGenres}
				genres={genres}
				setGenres={setGenres}
				setPage={setPage}
			/>
			<div className="trending flex flex-wrap justify-around">
				{series.map((s) => {
					return (
						<SingleContent
							key={s.id}
							id={s.id}
							poster={s.poster_path}
							title={s.title || s.name}
							date={s.first_air_date || s.release_date}
							media_type="tv"
							vote_average={s.vote_average}
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
  )
}

export default Series