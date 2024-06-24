import React, { useState } from "react";
import { useShoppingCart } from "../shoppingCart/CartContext";
import UserData from "../user/UserData";

import CheckoutForm from "./CheckoutForm";
import CartDetail from "../shoppingCart/CartDetail";

export function CheckoutShippingAddress({ onContinue }) {
  const { cartItems } = useShoppingCart();
  const { total, subtotal, tax } = CartDetail();
  const { userID } = UserData();

  const [billingData, setBillingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    shipToDifferentAddress: false,
  });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBillingData((prevBillingData) => ({
      ...prevBillingData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormCreate = async () => {
    const { firstName, lastName, email, phone, addressLine1, addressLine2, city, state, zipCode } = billingData;

    const phoneNumber = parseInt(phone, 10);
    const fullName = firstName + " " + lastName;
    const date = new Date().toLocaleDateString();

    let address = addressLine1;
    if (addressLine2) {
      address += ", " + addressLine2;
    }
    address += `, ${city}, ${state}, ${zipCode}`;

    const products = cartItems.map((item) => ({
      itemID: item.id,
      quantity: item.quantity,
    }));

    const newOrder = {
      userid: userID,
      paymentid: "pm_1Oxfh5HbhuikqEEranFlYFnn",
      fullName: fullName,
      phone: phoneNumber,
      email: email,
      product: products,
      orderDate: date,
      orderStatus: "Pending",
      completeDate: null,
      shippingAddress: address,
      billingAddress: address,
      totalPrice: total,
      taxPrice: tax,
      subtotalPrice: subtotal,
      shippingPrice: (10.0).toFixed(2),
    };

    try {
      const response = await fetch("http://localhost:5050/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        const responseData = await response.json();
        const newOrderId = responseData.insertedId;

        console.log("Order created successfully with id:", newOrderId);

        onContinue(newOrderId);
      } else {
        throw new Error("Failed to create order");
      }

      for (const item of cartItems) {
        const response = await fetch(`http://localhost:5050/inventory/${item.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch item with ID ${item.id}`);
        }
        const inventoryItem = await response.json();
        if (!inventoryItem) {
          throw new Error(`Item with ID ${item.id} not found in inventory`);
        }

        const newQuantity = inventoryItem.quantity - item.quantity;

        const updatedItem = {
          ...inventoryItem,
          quantity: newQuantity,
        };
        
        await fetch(`http://localhost:5050/inventory/${item.id}`, {
          method: "PATCH",
          body: JSON.stringify(updatedItem),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <div>
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Shipping Address</span>
      </h5>
      <div className="bg-light p-30 mb-5">
        <CheckoutForm formData={billingData} onChange={handleFormChange} />
        <button
          className="btn btn-block bg-primary text-white font-weight-bold my-3"
          onClick={handleFormCreate}
          type="button"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default CheckoutShippingAddress;
