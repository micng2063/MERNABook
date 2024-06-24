import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Products from "./ProductListing";
import { FilterSubject, FilterPrice } from "./ProductSearch";

const Store = () => {
	const [selectedTags, setSelectedTags] = useState([]);
	const [selectedPriceRange, setSelectedPriceRange] = useState([]);
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const filterBy = params.get("filterby");
		if (filterBy) {
			setSelectedTags([filterBy]);
		}
	}, [location.search]);

	const handleTagsChange = (tags) => {
		setSelectedTags(tags);
	};

	const handlePriceChange = (range) => {
		setSelectedPriceRange(range);
	};

	return (
		<div className="container-fluid">
			<div className="row px-xl-5">
				<div className="col-lg-3 col-md-4">
					<FilterSubject onTagsChange={handleTagsChange}  />
					<FilterPrice onPriceChange={handlePriceChange} />
				</div>
				<div className="col-lg-9 col-md-8">
					<Products selectedTags={selectedTags} selectedPriceRange={selectedPriceRange} />
				</div>
			</div>
		</div>
	);
};

export default Store;
