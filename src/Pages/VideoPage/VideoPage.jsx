import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const VideoPage = () => {
	const location = useLocation();
	const search = location.search;
	const params = new URLSearchParams(search);
	const media_type = params.get("m");
	const id = params.get("i");
	const title = params.get("t");
	const [seasonData, setSeasonData] = useState({});
	const [selectedSeason, setSelectedSeason] = useState(1);
	const [selectedEpisode, setSelectedEpisode] = useState(1);
	const [overview, setOverview] = useState("");
	const [globalOverview, setGlobalOverview] = useState("");
	const [episodesCount, setEpisodesCount] = useState(1);
	const [videoTV, setVideoTV] = useState(
		`https://vidsrc.xyz/embed/tv?tmdb=${id}&season=1&episode=1`
	);
	const [videoMovie, setVideoMovie] = useState(
		`https://vidsrc.xyz/embed/movie?tmdb=${id}`
	);

	const fetchData = async () => {
		if (media_type === "movie") {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
			);
			setGlobalOverview(data.overview);
			// console.log(data);
		}
		if (media_type === "tv") {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
			);
			setGlobalOverview(data.overview);
			// console.log(data);
			const validSeasons = data.seasons.filter(
				(season) => season.season_number > 0
			);
			const episodeCountMap = validSeasons.reduce((acc, season) => {
				const seasonNumber = parseInt(season.season_number, 10);
				acc[seasonNumber] = {
					episodeCount: season.episode_count,
					overview: season.overview,
				};
				return acc;
			}, {});
			setSeasonData(episodeCountMap);
			setOverview(validSeasons[0].overview);
			setEpisodesCount(validSeasons[0].episode_count);
		}
	};

	const fetchVideo = async () => {
		if (media_type === "tv") {
			setVideoTV(
				`https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${selectedSeason}&episode=${selectedEpisode}`
			);
		} else if (media_type === "movie") {
			setVideoMovie(`https://vidsrc.xyz/embed/movie?tmdb=${id}`);
		}
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	if (!media_type || !id) {
		return <h1>Invalid URL</h1>;
	}

	if (media_type === "movie") {
		return (
			<>
				<div>
					<span className="pagetitle uppercase flex justify-center text-[4vw] text-[white] p-1 rounded-[50px]">
						Movie : {title}
					</span>
					<div className="flex justify-start px-0 py-0.5 pb-[3px] font-thin text-[0.8rem]">
						<p>{globalOverview}</p>
					</div>
					<div className="w-full aspect-video pb-12">
						<iframe
							src={videoMovie}
							style={{ width: "100%", aspectRatio: "16/9" }}
							frameBorder="0"
							referrerPolicy="origin"
							allowFullScreen
							title="Embedded Video for Movies"
						></iframe>
					</div>
				</div>
			</>
		);
	}

	if (media_type === "tv") {
		const handleSeasonChange = (event) => {
			setSelectedSeason(event.target.value);
			setSelectedEpisode(1); // Optionally, reset episode to 1 or another appropriate value
			setOverview(seasonData[event.target.value].overview);
			setEpisodesCount(seasonData[event.target.value].episodeCount);
		};

		const handleEpisodeChange = (event) => {
			setSelectedEpisode(event.target.value);
		};

		const handleSubmit = () => {
			console.log(
				`TMDB Id: ${id}, Season: ${selectedSeason}, Episode: ${selectedEpisode}`
			);
			fetchVideo();
		};

		const seasons = Object.keys(seasonData).map((num) => parseInt(num, 10));
		const episodes = Array.from({ length: episodesCount }, (_, i) => i + 1);

		return (
			<>
				<div>
					<span className="pagetitle uppercase flex justify-center text-[4vw] text-[white] p-1 rounded-[50px]">
						TV Series : {title}
					</span>
					<div className="flex justify-start px-0 py-0.5 pb-[3px] font-thin text-[0.8rem]">
						<p>{globalOverview}</p>
					</div>
				</div>
				<div className="w-full flex justify-between p-5">
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<InputLabel id="demo-simple-select-helper-label">
							Season
						</InputLabel>
						<Select
							labelId="demo-simple-select-helper-label"
							id="demo-simple-select-helper"
							label="Season"
							value={selectedSeason}
							onChange={handleSeasonChange}
							style={{ color: "white" }}
						>
							{seasons.map((season) => (
								<MenuItem
									key={season}
									value={season}
								>
									Season {season}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<InputLabel id="demo-simple-select-helper-label">
							Episode
						</InputLabel>
						<Select
							labelId="demo-simple-select-helper-label"
							id="demo-simple-select-helper"
							label="Episode"
							value={selectedEpisode}
							onChange={handleEpisodeChange}
							style={{ color: "white" }}
						>
							{episodes.map((episode) => (
								<MenuItem
									key={episode}
									value={episode}
								>
									Episode {episode}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Button
						variant="contained"
						onClick={handleSubmit}
					>
						Go
					</Button>
				</div>
				<div className="w-full aspect-video pb-12">
					<iframe
						src={videoTV}
						style={{ width: "100%", aspectRatio: "16/9" }}
						frameBorder="0"
						referrerPolicy="origin"
						allowFullScreen
						title="Embedded Video for TV Series"
					></iframe>
				</div>
				<div className="flex justify-start px-0 py-0.5 pb-[3px] font-thin text-[0.8rem] mb-12">
					<p>{overview}</p>
				</div>
			</>
		);
	}
};

export default VideoPage;
