import React from "react";
import "../../CSS/NavBar.css";

const NavBar = () => {
	return (
		<nav className="bg-black shadow-lg w-full p-0">
			<div className="logo scale-[30%] w-max">
				<b>
					Wa<span>tch</span> Bu<span>dd</span>y<span> !</span>
				</b>
			</div>
		</nav>
	);
};

export default NavBar;
