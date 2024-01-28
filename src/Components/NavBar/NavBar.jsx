import React from "react";
import "../../CSS/NavBar.css";

const NavBar = () => {
	return (
		<nav className="fixed bg-black shadow-lg w-full">
			<div className="logo scale-[30%]">
				<b>
					Wa<span>tch</span> Bu<span>dd</span>y
				</b>
			</div>
		</nav>
	);
};

export default NavBar;
