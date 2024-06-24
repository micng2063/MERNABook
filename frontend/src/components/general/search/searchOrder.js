import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = ({ onCloseModal }) => {
  const [orderID, setOrderID] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('email');
  const [allOrders, setAllOrders] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`http://localhost:5050/order`);

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const order = await response.json();
        setAllOrders(order);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value.trim() === '') {
      setFilteredResults([]);
    }
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const performSearch = () => {
    if (orderID.trim() === '' && searchQuery.trim() === '') {
      setFilteredResults([]);
      return;
    }

    const filteredResults = allOrders.filter(order => {
      const { _id, fullName, phone, email } = order;
      const isMatchingID = orderID.trim() === '' || _id.includes(orderID.trim());
      const isMatchingSearchQuery =
        searchQuery.trim() === '' ||
        (searchType === 'email' && email.toLowerCase() === searchQuery.toLowerCase()) ||
        (searchType === 'phone' && phone === searchQuery) ||
        (searchType === 'fullname' && fullName.toLowerCase() === searchQuery.toLowerCase());

      return isMatchingID && isMatchingSearchQuery;
    });

    setFilteredResults(filteredResults);
    setSearchPerformed(true);

    if (filteredResults.length > 0) {
      setTimeout(() => {
        const maskedOrderId = btoa(filteredResults[0]._id);
        navigate(`/order/${maskedOrderId}`);

        onCloseModal();
      }, 2000);
    }

  };

  const searchProduct = () => {
    performSearch();
  };

  return (
    <div>
      <div class="row">
        <div class="col-md-12">
          <input className="form-control"
            placeholder="Please enter the order's ID"
            value={orderID} required
            onChange={(e) => setOrderID(e.target.value)} />
        </div>
        <div class="col-md-9 mt-2">
          <input className="form-control"
            placeholder={`Please enter email, phone # or full name`}
            value={searchQuery} required
            onChange={handleSearch}
          />
        </div>
        <div class="col-md-3 mt-2">
          <select className="form-control"
            value={searchType}
            onChange={handleSearchTypeChange}>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="fullname">Full Name</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn bg-primary text-white mt-3" onClick={searchProduct} disabled={orderID.trim() === '' || searchQuery.trim() === ''}><i className="fa fa-search" /> Look up order</button>
      </div>

      <div className="d-flex justify-content-center mt-2 mb-n3">
        {searchPerformed && filteredResults.length > 0 && (
          <p class="text-success text-center">Order found. We will redirect you shortly to the page.</p>
        )}

        {searchPerformed && filteredResults.length === 0 && (
          <p class="text-danger text-center">Order not found. Please make sure you have the correct ID and other required information.</p>
        )}
      </div>
    </div>
  );
};

const SearchModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (e) => {
    setShowModal(true);
    e.preventDefault();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <a href="/" className="nav-item nav-link" onClick={handleOpenModal}>
        Find Order
      </a>
      {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Look up order</h5>
                <button type="button" className="close" aria-label="Close" onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <SearchOrder onCloseModal={handleCloseModal} />
              </div>
              <div className="modal-footer">
                <button className="btn bg-primary text-white" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { SearchOrder, SearchModal };
