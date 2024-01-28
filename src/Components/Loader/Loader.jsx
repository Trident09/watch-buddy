import React from "react";
import "../../CSS/Loader.css";

const Loader = () => {
	return (
		<div className="bodyLoad">
			<div className="mainLoad">
				<div class="preloader">
					<div class="preloader__square"></div>
					<div class="preloader__square"></div>
					<div class="preloader__square"></div>
					<div class="preloader__square"></div>
				</div>
				<div class="status">
					Loading<span class="status__dot">.</span>
					<span class="status__dot">.</span>
					<span class="status__dot">.</span>
				</div>
			</div>
		</div>
	);
};

export default Loader;
