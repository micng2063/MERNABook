import React, { useState, useEffect } from "react";
import { SearchModal } from "../search/searchOrder";

export default function Navbar() {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    async function getItems() {
      try {
        const response = await fetch(`http://localhost:5050/inventory/`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const itemData = await response.json();
        setItemData(itemData);
      } catch (error) {
        window.alert(error.message);
      }
    }

    getItems();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const uniqueSubject = Array.from(new Set(itemData.flatMap((item) => item.subject)));
  const uniqueSubjectSorted = [...uniqueSubject].sort();

  return (
    <div className="container-fluid bg-dark mb-30">
      <div className="row px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: "65px", padding: "0 30px" }}>
            <h6 className="text-white m-0"><i className="fa fa-bars mr-2 text-white"></i>Search by Subject</h6>
            <i className="fa fa-angle-down text-dark"></i>
          </a>
          <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{ width: "calc(100% - 30px)", zIndex: "999" }}>
            <div className="navbar-nav w-100">
              {uniqueSubjectSorted.map((subject) => (
                <a key={subject} href={`/shop?filterby=${subject}`} className="nav-item nav-link">{subject}</a>
              ))}
            </div>
          </nav>
        </div>
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
            <a href="/" className="text-decoration-none d-block d-lg-none">
              <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
            </a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
              <div className="navbar-nav mr-auto py-0">
                <a href="/" className="nav-item nav-link">Home</a>
                <a href="/shop" className="nav-item nav-link">Shop</a>
                <a href="/shop/cart" className="nav-item nav-link">Cart</a>
                <a href="/shop/checkout" className="nav-item nav-link">Checkout</a>
                <SearchModal />
                <div className="nav-item dropdown">
                  <a href="/" className="nav-link dropdown-toggle" data-toggle="dropdown">Dashboard<i className="fa fa-angle-down mt-1 pl-1"></i></a>
                  <div className="dropdown-menu bg-white rounded-0 border-0 m-0">
                    <a href="/dashboard/admin" className="dropdown-item text-primary">Admin Dashboard</a>
                    <a href="/dashboard/client" className="dropdown-item text-primary">Client Dashboard</a>
                  </div>
                </div>
                <div className="nav-item dropdown">
                  <a href="/" className="nav-link dropdown-toggle" data-toggle="dropdown">Help <i className="fa fa-angle-down mt-1 pl-1"></i></a>
                  <div className="dropdown-menu bg-white rounded-0 border-0 m-0">
                    <a href="/contact" className="dropdown-item text-primary">Contact</a>
                    <a href="/" className="dropdown-item text-primary">FAQ</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
