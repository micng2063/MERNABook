import React, { useState, useEffect } from "react";
import CheckoutShippingAddress from "./CheckoutShipping";
import CheckoutTotal from "./CheckoutTotal";
import Payment from "../general/payment/payment";
import UserData from "../user/UserData";

export function Checkout() {
  const [showPayment, setShowPayment] = useState(false);
  const [orderId, setOrderId] = useState(null); 

  const { updateOrderID } = UserData();
  
  const handleShowPayment = async (newOrderId) => {
    setOrderId(newOrderId);
    setShowPayment(!showPayment);
    updateOrderID(newOrderId);
  };

  useEffect(() => {
    if (showPayment) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [showPayment]);

  return (
    <div className="container-fluid" >
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <CheckoutShippingAddress onContinue={handleShowPayment} />
          <div className={`collapse ${showPayment ? "show" : ""}`}>
            <Payment orderId={orderId} />
          </div>
        </div>
        <div className="col-lg-4">
          <CheckoutTotal />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
