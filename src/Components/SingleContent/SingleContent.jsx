import { Badge } from "@mui/material";
import React from "react";
import { img_300, unavailable } from "../../Config/Config";
import ContentModal from "../ContentModal/ContentModal";
import "./SingleContent.css";

const SingleContent = ({
	id,
	poster,
	title,
	date,
	media_type,
	vote_average,
}) => {
	return (
		<ContentModal
			media_type={media_type}
			id={id}
		>
			<Badge
				badgeContent={vote_average.toFixed(1)}
				color={vote_average > 6 ? "primary" : "secondary"}
			></Badge>
			<img
				src={poster ? `${img_300}/${poster}` : unavailable}
				alt={title}
			/>
			<b className="title">{title}</b>
			<span className="subTitle">
				{media_type === "tv" ? "TV" : "Movie"}
				<span className="subTitle">{date}</span>
			</span>
		</ContentModal>
	);
};

export default SingleContent;
