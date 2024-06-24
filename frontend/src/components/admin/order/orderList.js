import React, { useEffect, useState, useCallback } from "react";
import Fuse from 'fuse.js';

import OrderManage from "./orderManage";
import OrderRecord from "./orderRecord";
import OrderExport from "./orderExport";
import { FilterStatus, FilterPrice, Sort } from "./orderSearch";

const OrderList = () => {
  const [order, setOrder] = useState([]);
  const [manageId, setManageId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState([]);

  const performSearch = useCallback(() => {
    let filteredOrders = [...allOrders];

    if (searchQuery.trim() !== '') {
      const fuse = new Fuse(filteredOrders, {
        keys: ['_id', 'fullName'],
        includeScore: true,
        threshold: 0.3,
      });
      const searchResult = fuse.search(searchQuery);

      filteredOrders = searchResult.map(result => result.item);
    }

    if (statusFilter !== null) {
      filteredOrders = filteredOrders.filter(order => order.orderStatus === statusFilter);
    }

    if (priceFilter.length > 0) {
      filteredOrders = filteredOrders.filter(order => {
        const totalPrice = parseFloat(order.totalPrice);
        if (priceFilter.includes("$200 and above")) {
          return totalPrice >= 200;
        } else {
          return priceFilter.some(range => {
            const [min, max] = range.split('-').map(val => parseFloat(val.trim().replace('$', '')));
            return totalPrice >= min && totalPrice <= max;
          });
        }
      });
    }

    if (sortBy === "low") {
      filteredOrders.sort((a, b) => parseFloat(a.totalPrice) - parseFloat(b.totalPrice));
    } else if (sortBy === "high") {
      filteredOrders.sort((a, b) => parseFloat(b.totalPrice) - parseFloat(a.totalPrice));
    } else if (sortBy === "alphabetic") {
      filteredOrders.sort((a, b) => a.fullName.localeCompare(b.fullName));
    } else if (sortBy === "newest") {
      filteredOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    } else if (sortBy === "oldest") {
      filteredOrders.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
    } else if (sortBy === "status") {
      const statusOrder = {
        Pending: 1,
        Ordered: 2,
        Preparing: 3,
        Delivering: 4,
        Complete: 5
      };
      filteredOrders.sort((a, b) => statusOrder[b.orderStatus] - statusOrder[a.orderStatus]);
    }

    setSearchResults(filteredOrders);
  }, [allOrders, searchQuery, statusFilter, priceFilter, sortBy]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`http://localhost:5050/order`);

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const orders = await response.json();
        setAllOrders(orders);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOrders();
  }, []);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  async function deleteOrder(id) {
    await fetch(`http://localhost:5050/order/${id}`, {
      method: "DELETE"
    });

    const newOrder = order.filter((el) => el._id !== id);
    setOrder(newOrder);
  }

  function orderList() {
    return searchResults.map((order, index) => {
      return (
        <OrderRecord
          order={order}
          index={index}
          key={order._id}
          deleteOrder={() => deleteOrder(order._id)}
          onManage={(_id) => {
            setManageId(_id);
          }}
        />
      );
    });
  }

  const handleSwitchOff = () => {
    setManageId(null);
    window.scrollTo(0, 0);
    fetchOrders();
  };

  async function fetchOrders() {
    try {
      const response = await fetch(`http://localhost:5050/order`);

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const orders = await response.json();
      setAllOrders(orders);
    } catch (error) {
      console.error(error);
    }
  }

  const refreshOrders = () => {
    fetchOrders();
  }

  return (
    <div>
      {manageId ? (
        <div>
          <div className="row mb-2">
            <div className="col-md-9">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Orders</span>
              </h5>
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-block bg-primary text-white font-weight-bold"
                onClick={() => {
                  setManageId(null);
                }}
              >
                Back to Order
              </button>
            </div>
          </div>
          <OrderManage id={manageId} handleSwitchOff={handleSwitchOff} />
        </div>
      ) : (
        <div>
          <div className="row mb-2">
            <div className="col-md-9">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Orders 
                <i className="fas fa-sync fa-xs pl-2" style={{ cursor: 'pointer' }} onClick={refreshOrders}></i>
                </span>
              </h5>
            </div>
            <div className="col-md-3">
              <OrderExport/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div class="input-group">
                <input className="form-control"
                  type="text"
                  placeholder="Search for orders by ID, name, etc."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />
                <div class="input-group-append">
                  <span class="input-group-text bg-transparent text-primary" onClick={performSearch}>
                    <i class="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <FilterStatus onStatusChange={setStatusFilter} />
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
                  <th>OrderID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Order Date</th>
                  <th>Complete Date</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{orderList()}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
