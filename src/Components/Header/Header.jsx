import React from "react";
import "./Header.css";

const Header = () => {
	return (
		<header>
			<div className="logo" onClick={() => {window.scroll(0,0)}}>
				<b>
					Wat<span>ch</span>Bu<span>d</span>dy!
				</b>
			</div>
		</header>
	);
};

export default Header;
