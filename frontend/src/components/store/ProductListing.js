import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../shoppingCart/CartContext";

import { Sort } from "./ProductSearch";
import Fuse from 'fuse.js';

const Products = ({ selectedTags, selectedPriceRange }) => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  useEffect(() => {
    async function getInventory() {
      const response = await fetch(`http://localhost:5050/inventory/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const inventory = await response.json();
      setInventory(inventory);
    }
    getInventory();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('searchby');
    setSearchQuery(query || '');
  }, [location.search]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const fuse = new Fuse(inventory, {
      keys: ['title', 'isbn', 'author', 'subject'],
      includeScore: true,
      threshold: 0.3,
    });
    const searchResult = fuse.search(searchQuery);
    setSearchResults(searchResult.map(result => result.item));
  }, [inventory, searchQuery]);

  const filteredInventory = inventory.filter((inventory) =>
    selectedTags.every((tag) => inventory.subject.includes(tag)) &&
    (selectedPriceRange.length === 0 ||
      selectedPriceRange.some((range) => {
        if (range === "$200 and above") {
          return inventory.price >= 200;
        } else {
          const [min, max] = range.split(" - ").map((str) => parseInt(str.replace(/\$/g, ""), 10));
          return inventory.price >= min && inventory.price <= max;
        }
      }))
  );

  let sortedInventory;
  if (sortBy === "lowPrice") {
    sortedInventory = filteredInventory.sort((a, b) => a.price - b.price);
  } else if (sortBy === "highPrice") {
    sortedInventory = filteredInventory.sort((a, b) => b.price - a.price);
  } else if (sortBy === "alphabetic") {
    sortedInventory = filteredInventory.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    sortedInventory = filteredInventory;
  }

  function formatAuthors(authors) {
    if (!authors) {
      return "Unknown author";
    }

    const authorList = authors.split(",");
    const firstAuthor = authorList[0].trim();
    if (authorList.length > 1) {
      return `${firstAuthor} et al.`;
    }

    return firstAuthor;
  }

  const handleBackToShop = () => {
    navigate("/shop");
  };

  const shortenTitle = (title) => {
    if (title.length <= 50) {
      return title;
    }
  
    const shortenedTitle = title.substring(0, 50);
    const lastSpaceIndex = shortenedTitle.lastIndexOf(" ");
    if (lastSpaceIndex !== -1) {
      return shortenedTitle.substring(0, lastSpaceIndex) + "...";
    }
  
    return title.substring(0, 50) + "...";
  };
  
  return (
    <div>
      <div className="d-flex justify-content-end">
        {searchQuery && (
          <button className="btn bg-primary text-white mb-3 mr-1" onClick={handleBackToShop}>Back to Shop</button>
        )}
        <Sort onSort={handleSortChange} />
      </div>

      <div className="row">
        {sortedInventory
          .filter(item => item.showListing)
          .filter(item => !searchResults.length || searchResults.includes(item))
          .map((inventory) => {
            const quantity = getItemQuantity(inventory._id);

            return (
              <div key={inventory.keyid} className="col-lg-3 col-md-6 col-sm-6 pb-1">
                <div className="product-item bg-light mb-4 pb-2">
                  <div className="product-img position-relative overflow-hidden" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img className="img-fluid" style={{ height: "250px", width: "200px", objectFit: "fill" }} src={inventory.imageurl} alt="" />
                    <div className="product-action">
                      {quantity === 0 ? (
                        <a href="/" className="btn bg-primary text-white" onClick={(e) => { e.preventDefault(); increaseCartQuantity(inventory._id); }}>
                          <i className="fa fa-shopping-cart text-white" />
                          <span className="text-white"> &nbsp;Add to Cart</span>
                        </a>
                      ) : (
                        <div>
                          <a className="btn bg-primary text-white mr-n1" href="/" onClick={(e) => { e.preventDefault(); decreaseCartQuantity(inventory._id); }}>
                            <i className="fa fa-minus text-white"></i>
                          </a>
                          <a className="btn bg-white text-primary pr-3 pl-3" href="/"> {quantity} </a>
                          <a className="btn bg-primary text-white ml-n1" href="/" onClick={(e) => { e.preventDefault(); increaseCartQuantity(inventory._id); }}>
                            <i className="fa fa-plus text-white"></i>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center py-4 pr-1 pl-1" style={{maxHeight:"175px"}}>
                    <h6 className="text-decoration-none text-wrap pr-2">
                      <Link to={`/shop/item/${inventory._id}`}>{shortenTitle(inventory.title)}</Link>
                    </h6>
                    <div className="d-flex align-items-center justify-content-center mt-2 pl-2 pr-2">
                      <small>{formatAuthors(inventory.author)}</small>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mt-2">
                      <h5>${inventory.price}</h5>
                      <h6 className="text-muted ml-2"><del>${inventory.price}</del></h6>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mb-1">
                      {[...Array(5)].map((_, index) => (
                        <small
                          key={index}
                          className={`fa fa-star text-primary mr-1 ${index < inventory.rating ? "filled" : ""
                            }`}
                          style={{ color: "#266473" }}
                        ></small>
                      ))}
                      <small>({inventory.ratingTotal})</small>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Products;
