import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const VideoPage = () => {
	const [seasonData, setSeasonData] = useState({});
	const [selectedSeason, setSelectedSeason] = useState(1);
	const [selectedEpisode, setSelectedEpisode] = useState(1);
	const [overview, setOverview] = useState("");
	const [episodesCount, setEpisodesCount] = useState(1);

	const fetchData = async () => {
		if (media_type === "tv") {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
			);
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

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	const location = useLocation();
	const search = location.search;
	const params = new URLSearchParams(search);
	const media_type = params.get("m");
	const id = params.get("i");
	const title = params.get("t");

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
		};

		const seasons = Object.keys(seasonData).map((num) => parseInt(num, 10));
		const episodes = Array.from({ length: episodesCount }, (_, i) => i + 1);

		return (
			<>
				<div>
					<span className="pagetitle uppercase flex justify-center text-[4vw] text-[white] p-1 rounded-[50px]">
						TV Series : {title}
					</span>
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
				<div className="flex justify-start px-0 py-0.5 pb-[3px] font-thin text-[0.8rem]">
					<p>{overview}</p>
				</div>
			</>
		);
	}
};

export default VideoPage;
