import React from "react";
import "./Header.css";

const Header = () => {
	return (
		<header className="bg-cover m-0 fixed inset-0 z-50 h-[10vh]">
			<div
				className="logo text-center w-full h-[100px] m-auto absolute top-0 left-0 right-0 bottom-0 select-none"
				onClick={() => {
					window.scroll(0, 0);
				}}
			>
				<b className="text-[#fee]">
					Wat<span>ch</span>Bu<span>d</span>dy!
				</b>
			</div>
		</header>
	);
};

export default Header;
