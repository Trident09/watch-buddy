import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	img_500,
	unavailable,
	unavailableLandscape,
} from "../../Config/Config";
import Carousel from "../Carousel/Carousel";
import "./ContentModal.css";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90%",
	bgcolor: "transparent",
	border: "none",
	// boxShadow: 24,
	p: 0,
};

export default function ContentModal({ children, media_type, id }) {
	const [content, setContent] = useState();
	const [video, setVideo] = useState();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const fetchData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);

		setContent(data);
		// console.log(data);
	};

	const fetchVideo = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);

		setVideo(data.results[0]?.key);
	};

	useEffect(() => {
		fetchData();
		fetchVideo();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<div
				onClick={handleOpen}
				className="media cursor-pointer"
			>
				{children}
			</div>
			<Modal
				className="text-black flex justify-center items-center"
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						{content && (
							<div className="w-full h-[80%] text-white pt-[1rem] pb-[3rem] px-4 border-[1px] border-solid border-[#282c34] bg-[#39445a] rounded-xl shadow-md">
								<div className="ContentModal">
									<img
										src={
											content.poster_path
												? `${img_500}/${content.poster_path}`
												: unavailable
										}
										alt={content.name || content.title}
										className="ContentModal__portrait"
									/>
									<img
										src={
											content.backdrop_path
												? `${img_500}/${content.backdrop_path}`
												: unavailableLandscape
										}
										alt={content.name || content.title}
										className="ContentModal__landscape"
									/>
									<div className="ContentModal__about">
										<span className="ContentModal__title">
											{content.name || content.title} (
											{(
												content.first_air_date ||
												content.release_date ||
												"-----"
											).substring(0, 4)}
											)
										</span>
										{content.tagline && (
											<i className="tagline">
												{content.tagline}
											</i>
										)}

										<span className="ContentModal__description">
											{content.overview}
										</span>

										<div>
											<Carousel
												id={id}
												media_type={media_type}
											/>
										</div>

										<Button
											variant="contained"
											startIcon={<PlayArrowIcon />}
											color="secondary"
											target="__blank"
											href={`https://www.youtube.com/watch?v=${video}`}
										>
											Watch Now
										</Button>
									</div>
								</div>
							</div>
						)}
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
