import React from "react";
import { Link } from "react-router-dom";
import "./NameBlock.css";

const NameBlock = () => {
	return (
		<Link to="https://rupam.vercel.app" target="_blank" className="pb-10">
			<div className="loader">
				<div
					data-glitch="Rupam Barui"
					className="glitch"
				>
					Rupam Barui - Visit my website
				</div>
			</div>
		</Link>
	);
};

export default NameBlock;
