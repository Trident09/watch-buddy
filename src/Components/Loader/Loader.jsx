import React from "react";
import "./Loader.css";

const Loader = () => {
	return (
		<div className="bodyLoad">
			<div className="mainLoad">
				<div className="preloader">
					<div className="preloader__square"></div>
					<div className="preloader__square"></div>
					<div className="preloader__square"></div>
					<div className="preloader__square"></div>
				</div>
				<div className="status">
					Loading<span className="status__dot">.</span>
					<span className="status__dot">.</span>
					<span className="status__dot">.</span>
				</div>
			</div>
		</div>
	);
};

export default Loader;
