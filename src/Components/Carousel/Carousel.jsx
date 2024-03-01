import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../Config/Config";

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ id, media_type }) => {
	const [credits, setCredits] = useState([]);

	const items = credits.map((c) => (
		<div className="flex flex-col object-contain p-[10px]">
			<img
				src={
					c.profile_path ? `${img_300}/${c.profile_path}` : noPicture
				}
				alt={c?.name}
				onDragStart={handleDragStart}
				className="rounded-lg shadow-md mb-[5px] max-w-[100px]"
			/>
			<b className="carouselItem__txt text-xs">{c?.name}</b>
		</div>
	));

	const responsive = {
		0: {
			items: 3,
		},
		512: {
			items: 5,
		},
		1024: {
			items: 7,
		},
	};

	const fetchCredits = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		setCredits(data.cast);
	};

	useEffect(() => {
		fetchCredits();
		// eslint-disable-next-line
	}, []);

	return (
		<AliceCarousel
			mouseTracking
			infinite
			disableDotsControls
			disableButtonsControls
			responsive={responsive}
			items={items}
			autoPlay={items.length >= 3}
		/>
	);
};

export default Gallery;
