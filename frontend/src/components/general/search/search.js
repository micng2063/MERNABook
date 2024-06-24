import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from 'fuse.js';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line
  const [searchResults, setSearchResults] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`http://localhost:5050/inventory`);

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const products = await response.json();
        setSearchResults(products);
        setAllItems(products);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);
  
  // eslint-disable-next-line
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value.trim() === '') {
      setSearchResults(allItems);
    }
  };

  const performSearch = () => {
    if (searchQuery.trim() === '') {

      setSearchResults(allItems);
    } else {
      const fuse = new Fuse(allItems, {
        keys: ['title', 'isbn', 'author', 'subject'],
        includeScore: true,
        threshold: 0.3,
      });
      const searchResult = fuse.search(searchQuery);

      setSearchResults(searchResult.map(result => result.item));
    }
  };

  return (
    <div>
    </div>
  );
};

export default Search;

