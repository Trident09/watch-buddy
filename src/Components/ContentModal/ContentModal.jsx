import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
	const navigate = useNavigate();
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

	useEffect(() => {
		fetchData();
		if (video !== "") {
			navigate(video);
		}
		// eslint-disable-next-line
	}, [video, navigate]);

	return (
		<div>
			<div
				onClick={handleOpen}
				className="flex flex-col w-[200px] p-[5px] my-[5px] mx-0 bg-gray-900 rounded-lg relative font-[montserrat] hover:bg-white hover:text-black cursor-pointer media"
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
								<div className="ContentModal flex h-full w-full overflow-y-scroll">
									<img
										src={
											content.poster_path
												? `${img_500}/${content.poster_path}`
												: unavailable
										}
										alt={content.name || content.title}
										className="ContentModal__portrait object-contain rounded-[10px]"
									/>
									<img
										src={
											content.backdrop_path
												? `${img_500}/${content.backdrop_path}`
												: unavailableLandscape
										}
										alt={content.name || content.title}
										className="ContentModal__landscape object-contain rounded-[10px]"
									/>
									<div className="ContentModal__about flex flex-col font-[Roboto] justify-evenly font-light">
										<span className="ContentModal__title h-[12%] flex items-center justify-center">
											{content.name || content.title} (
											{(
												content.first_air_date ||
												content.release_date ||
												"-----"
											).substring(0, 4)}
											)
										</span>
										{content.tagline && (
											<i className="pb-[10px] items-center">
												{content.tagline}
											</i>
										)}

										<span className="ContentModal__description flex h-2/5 overflow-y-scroll p-[15px] rounded-3xl text-justify">
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
											target="__self"
											onClick={() => {
												setVideo(
													`/video?m=${media_type}&i=${id}&t=${
														content.name ||
														content.title
													}`
												);
											}}
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
