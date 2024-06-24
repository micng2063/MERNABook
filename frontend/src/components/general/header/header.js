import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../user/UserContext.js';
import { SearchHeader } from "../search/searchBar";
import { useShoppingCart } from "../../shoppingCart/CartContext.js";

import "./header.css";

export default function Header() {
  const { user, fetchUser, logOutUser } = useContext(UserContext);
  const { cartItems } = useShoppingCart();
  const [totalQuantity, setTotalQuantity] = useState(0);

  const [userLogged, setUserLog] = useState(false);

  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        setUserLog(true);
      }
    }
  }

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      setTotalQuantity(total);
    } else {
      setTotalQuantity(0);
    }
  }, [cartItems]);

  useEffect(() => {
    loadUser(); // eslint-disable-next-line 
  }, []);

  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div class="header">
      <div class="top-header">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-3">
              <div class="logo hover-zoom-medium">
                <a href="/"><img src="https://i.imgur.com/Z4g85lR.png" alt="Logo" loading="lazy" /></a>
              </div>
            </div>
            <div class="col-md-6">
              <div>
                <SearchHeader />
              </div>
            </div>
            <div class="col-md-3">
              <div class="user">
                {!userLogged ? (
                  <div class="dropdown">
                    <a href="/dashboard" class="dropdown-toggle" style={{ textDecoration: "none" }} data-toggle="dropdown"><i class="fas fa-user pr-2"></i>Log In</a>
                    <div class="dropdown-menu">
                      <a href="/login" class="dropdown-item">Login</a>
                      <a href="/signup" class="dropdown-item">Signup</a>
                    </div>
                  </div>
                ) : (
                  <div class="dropdown">
                    <a href="/dashboard" class="dropdown-toggle" style={{ textDecoration: "none" }} data-toggle="dropdown"><i class="fas fa-user pr-2"></i>My Account</a>
                    <div class="dropdown-menu">
                      <a href="/dashboard" class="dropdown-item">My Dashboard</a>
                      <a href="/" onClick={logOut} class="dropdown-item">Logout</a>
                    </div>
                  </div>
                )}
                <div class="cart">
                  <a href="/shop/cart" style={{ textDecoration: "none", color: "inherit" }}>
                    <i className="fa fa-cart-plus hover-zoom-medium"></i>
                    <span> {totalQuantity}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};
