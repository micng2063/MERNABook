import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserData from "../UserData";

const Order = () => {
  const { userOrder } = UserData();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const updatedOrders = [];
      for (const orderId of userOrder) {
        try {
          const response = await fetch(`http://localhost:5050/order/${orderId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch order with ID ${orderId}`);
          }
          const json = await response.json();
          if (Object.keys(json).length > 0) {
            updatedOrders.push(json);
          }
        } catch (error) {
        }
      }
      setOrders(updatedOrders);
    }

    if (userOrder.length > 0) {
      fetchOrders();
    }
  }, [userOrder]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    const date = new Date(dateString);
    if (date.getTime() === 0) {
      return "-";
    }

    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Orders</span>
      </h5>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>OrderID</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Complete Date</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td className={order.orderStatus === "Complete" ? "text-success" : ""}>{order.orderStatus}</td>
                <td>{formatDate(order.orderDate)}</td>
                <td>{formatDate(order.completeDate)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  <Link className="btn btn-block bg-primary text-white font-weight-bold" to={`/order/${btoa(order._id)}`}> View </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
