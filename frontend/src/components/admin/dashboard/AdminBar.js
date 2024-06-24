import React from "react";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../user/UserContext';

export default function UserBar() {
  const { logOutUser } = useContext(UserContext);
  const navigate = useNavigate();

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

  const changePassword = () => {
    setTimeout(() => {
      navigate('/security');
    }, 1000);
  }

  return (
    <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
      <a class="nav-link active py-3" id="dashboard-nav" data-toggle="pill" href="#dashboard-tab" role="tab">
        <i className="fa fa-bars pr-3"></i>Dashboard
      </a>
      <a class="nav-link py-3" id="account-nav" data-toggle="pill" href="#account-tab" role="tab">
        <i className="fa fa-user pr-3"></i>Account Details
      </a>
      <a class="nav-link py-3" id="orders-nav" data-toggle="pill" href="#orders-tab" role="tab">
        <i className="fa fa-shopping-cart pr-3"></i>Orders
      </a>
      <a class="nav-link py-3" id="product-nav" data-toggle="pill" href="#product-tab" role="tab">
        <i className="fa fa-shopping-bag pr-3"></i>Product
      </a>
      <a class="nav-link py-3" id="payment-nav" data-toggle="pill" href="#statistic-tab" role="tab">
        <i className="fa fa-chart-line pr-3"></i>Statistic
      </a>
      <a class="nav-link py-3" id="security-nav" data-toggle="pill" href="#security-tab" role="tab" onClick={changePassword}>
        <i className="fa fa-lock pr-3"></i>Security
      </a>
      <a class="nav-link py-3" id="logout-nav" data-toggle="pill" href="#log-tab" role="tab" onClick={logOut}>
        <i className="fa fa-sign-out-alt pr-3"></i>Logout
      </a>
    </div>
  );
};
