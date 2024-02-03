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
				className="rounded-lg"
				src={poster ? `${img_300}/${poster}` : unavailable}
				alt={title}
			/>
			<b className="w-full text-center text-[17px] py-2 px-0">{title}</b>
			<span className="flex justify-between px-0 py-0.5 pb-[3px] font-thin text-[0.8rem]">
				{media_type === "tv" ? "TV" : "Movie"}
				<span className="flex justify-between px-0 py-0.5 pb-[3px] font-thin text-[0.8rem]">
					{date}
				</span>
			</span>
		</ContentModal>
	);
};

export default SingleContent;
