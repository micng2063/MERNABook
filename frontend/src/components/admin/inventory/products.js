import React, { useEffect, useState, useCallback } from "react";
import Fuse from 'fuse.js';

import Edit from "./edit";
import Inventory from "./inventory";
import { FilterSubject, FilterPrice, Sort } from "./search";

const Products = () => {
  // eslint-disable-next-line
  const [inventory, setInventory] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showSwitch, setShowSwitch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allInventory, setAllInventory] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [subjectFilter, setSubjectFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState([]);

  const performSearch = useCallback(() => {
    let filteredInventory = [...allInventory];

    if (searchQuery.trim() !== '') {
      const fuse = new Fuse(filteredInventory, {
        keys: ['_id', 'title', 'subject'],
        includeScore: true,
        threshold: 0.3,
      });
      const searchResult = fuse.search(searchQuery);

      filteredInventory = searchResult.map(result => result.item);
    }

    if (subjectFilter !== null) {
      filteredInventory = filteredInventory.filter(inventory => inventory.subject === subjectFilter);
    }

    if (priceFilter.length > 0) {
      filteredInventory = filteredInventory.filter(inventory => {
        const price = parseFloat(inventory.price);
        if (priceFilter.includes("$200 and above")) {
          return price >= 200;
        } else {
          return priceFilter.some(range => {
            const [min, max] = range.split('-').map(val => parseFloat(val.trim().replace('$', '')));
            return price >= min && price <= max;
          });
        }
      });
    }

    if (sortBy === "lowPrice") {
      filteredInventory.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "highPrice") {
      filteredInventory.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "alphabetic") {
      filteredInventory.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "lowQuantity") {
      filteredInventory.sort((a, b) => a.quantity - b.quantity);
    } else if (sortBy === "highQuantity") {
      filteredInventory.sort((a, b) => b.quantity - a.quantity);
    } else if (sortBy === "hideListing") {
      filteredInventory.sort((a, b) => a.showListing === b.showListing ? 0 : a.showListing ? 1 : -1);
    } 

    setSearchResults(filteredInventory);
  }, [allInventory, searchQuery, subjectFilter, priceFilter, sortBy]);
  async function getInventory() {
    const response = await fetch(`http://localhost:5050/inventory/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const inventory = await response.json();
    setInventory(inventory);
    setAllInventory(inventory);
  }

  useEffect(() => {
    getInventory();
  }, []);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  async function deleteInventory(id) {
    await fetch(`http://localhost:5050/inventory/${id}`, {
      method: "DELETE"
    });
  }

  function inventoryList() {
    return searchResults.map((inventory, index) => (
      <Inventory
        inventory={inventory}
        onEdit={(_id) => setEditId(_id)}
        deleteInventory={() => deleteInventory(inventory._id)}
        setShowSwitch={setShowSwitch}
        key={inventory._id}
        index={index}
      />
    ));
  }

  const handleSwitchOff = () => {
    setShowSwitch(false);
    getInventory();
  };

  return (
    <div>
      {showSwitch ? (
        editId && <Edit id={editId} handleSwitchOff={handleSwitchOff} />
      ) : (
        <div>
          <div className="row">
            <div className="col-md-5">
              <div className="input-group">
                <input className="form-control"
                  type="text"
                  placeholder="Search for products by ID, title, etc."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />
                <div className="input-group-append">
                  <span class="input-group-text bg-transparent text-primary" onClick={performSearch}>
                    <i class="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <FilterSubject onSubjectChange={setSubjectFilter} />
            </div>
            <div className="col-md-2">
              <FilterPrice onPriceChange={setPriceFilter} />
            </div>
            <div className="col-md-3">
              <Sort onSort={setSortBy} />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th></th>
                  <th></th>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{inventoryList()}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
