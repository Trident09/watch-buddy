import { Pagination, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
	const handlePageChange = (page) => {
		setPage(page);
		window.scroll(0, 0);
	};

	return (
		<div className="w-full flex justify-center mt-[10]">
			<ThemeProvider theme={darkTheme}>
				<Pagination
					hideNextButton
					hidePrevButton
					count={numOfPages}
					variant="outlined"
					color="primary"
					onChange={(e) => handlePageChange(e.target.textContent)}
				/>
			</ThemeProvider>
		</div>
	);
};

export default CustomPagination;
