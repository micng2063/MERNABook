import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderManage = ({ id, handleSwitchOff }) => {
  const [orderData, setOrderData] = useState({
    userid: "",
    paymentid: "",
    fullName: "",
    phone: 0,
    email: "",
    product: [],
    orderDate: "",
    orderStatus: "",
    completeDate: "",
    shippingAddress: "",
    billingAddress: "",
    totalPrice: 0.0,
    taxPrice: 0.0,
    subtotalPrice: 0.0,
    shippingPrice: 0.0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5050/order/${id}`);

        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const order = await response.json();
        if (!order) {
          window.alert(`Order with id ${id} not found`);
          handleSwitchOff();
          return;
        }

        setOrderData(order);
      } catch (error) {
        console.error('Network error:', error);
      }
    }

    fetchData();
  }, [id, handleSwitchOff]);

  function updateOrder(value) {
    if (value.orderStatus === "Complete") {
      setOrderData(prev => ({
        ...prev,
        orderStatus: value.orderStatus,
        completeDate: new Date().toLocaleDateString()
      }));
    } else {
      setOrderData(prev => ({
        ...prev,
        orderStatus: value.orderStatus
      }));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedOrder = {
      userid: orderData.userid,
      paymentid: orderData.paymentid,
      fullName: orderData.fullName,
      phone: orderData.phone,
      email: orderData.email,
      product: orderData.product,
      orderDate: orderData.orderDate,
      orderStatus: orderData.orderStatus,
      completeDate: orderData.completeDate,
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress,
      totalPrice: orderData.totalPrice,
      taxPrice: orderData.taxPrice,
      subtotalPrice: orderData.subtotalPrice,
      shippingPrice: orderData.shippingPrice,
    };

    await fetch(`http://localhost:5050/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(editedOrder),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    handleSwitchOff();
    
    const maskedOrderId = btoa(orderData._id);

    await axios.post('http://localhost:5050/email/status', {
      to: orderData.email,
      subject: 'Order Update: #' + orderData._id,
      text: `Hello ${orderData.fullName} (${orderData.email}) !
      \nGood news! Your order has a new update! You can check the current status at https://mernabook.vercel.app/order/${maskedOrderId}. If you have any questions about your order or need assistance, please don't hesitate to send us a message. We're here to help!
      \nThank you and have a great day,
      \nMernABook Team`,
    });

  }

  // eslint-disable-next-line
  async function deleteOrder(id) {
    await fetch(`http://localhost:5050/order/${id}`, {
      method: "DELETE"
    });

    handleSwitchOff();
  }

  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const items = orderData.product.map(async (item) => {
          const response = await fetch(`http://localhost:5050/inventory/${item.itemID}`);
          if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return null;
          }
          return await response.json();
        });
        const itemInfo = await Promise.all(items);
        setItemData(itemInfo);
      } catch (error) {
        console.error('Network error:', error);
      }
    }

    if (orderData.product.length > 0) {
      fetchData();
    }
  }, [orderData.product]);

  return (
    <div className="container-fluid">
      <div class="pb-3">
        <h2 className="position-relative text-center text-uppercase ">
          <span className="bg-secondary pr-3">Order #: <span class="font-weight-lighter">{orderData._id}</span></span>
        </h2>
      </div>

      <div className="row">
        <div className="col-lg-8 table-responsive mb-5">
          <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Details</span></h5>
          <div className="bg-light p-30 mb-3">
            <div class="row">
              <div class="col-md-6">
                <div className="d-flex justify-content-between mb-3">
                  <h6 className="text-primary">Name</h6>
                  <h6 className="font-weight-light">{orderData.fullName}</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div className="d-flex justify-content-between mb-3">
                  <h6 className="text-primary">Phone</h6>
                  <h6 className="font-weight-light">{orderData.phone}</h6>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div className="d-flex justify-content-between mb-3">
                  <h6 className="text-primary">Email</h6>
                  <h6 className="font-weight-light">{orderData.email}</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div className="d-flex justify-content-between mb-3">
                  <h6 className="text-primary">Order Date</h6>
                  <h6 className="font-weight-light">{new Date(orderData.orderDate).toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' })}</h6>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <h6 className="text-primary">Billing Address</h6>
              <h6 className="font-weight-light">{orderData.billingAddress}</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="text-primary">Shipping Address</h6>
              <h6 className="font-weight-light">{orderData.shippingAddress}</h6>
            </div>
          </div>
          <h5 className="section-title position-relative text-uppercase">
            <span className="bg-secondary pr-3">Order Content</span>
          </h5>
          <table className="table table-light table-borderless table-hover text-center mb-0">
            <thead className="thead-dark">
              <tr>
                <th></th>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {itemData.map((item, index) => (
                <tr key={index}>
                  <td className="align-middle"><img src={item.imageurl} alt="Textbook" style={{ width: "50px" }} /></td>
                  <td className="align-middle text-left"><Link to={`/shop/item/${item._id}`} style={{ textDecoration: "none" }}>{item.title}</Link></td>
                  <td className="align-middle">${item.price}</td>
                  <td className="align-middle">{orderData.product[index].quantity}</td>
                  <td className="align-middle">${item.price * orderData.product[index].quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-4">
          <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Status</span></h5>
          <div className="bg-light mb-3" style={{ padding: "30px", paddingTop: "10px", paddingBottom: "10px" }}>
            <div className="d-flex justify-content-between mt-2 pt-2 border-bottom pb-2">
              <h6 class="text-primary">Status</h6>
              <h6>{orderData.orderStatus}</h6>
            </div>
            <div className="border-bottom pt-3 pb-2">
              <div className="d-flex justify-content-between mb-3">
                <h6 class="text-primary">Subtotal</h6>
                <h6>${orderData.subtotalPrice}</h6>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <h6 class="text-primary">Shipping</h6>
                <h6>${orderData.shippingPrice}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6 class="text-primary">Tax</h6>
                <h6>${orderData.taxPrice}</h6>
              </div>
            </div>
            <div className="pt-2">
              <div className="d-flex justify-content-between mt-2">
                <h5 class="text-primary">Total</h5>
                <h5>${orderData.totalPrice}</h5>
              </div>
            </div>
          </div>

          <div>
            <form>
              <div className="form-group">
                <label htmlFor="orderStatus">Update Status</label>
                <select
                  className="form-control"
                  id="orderStatus"
                  value={orderData.orderStatus}
                  onChange={(e) => updateOrder({ orderStatus: e.target.value })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Ordered">Ordered</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Delivering">Delivering</option>
                  <option value="Complete">Complete</option>
                </select>
                <button class="btn btn-block bg-primary text-white" onClick={onSubmit}>
                  <i className="fa fa-edit pr-3"></i>Update status
                </button>
              </div>
            </form>

            <button class="btn btn-block bg-primary text-white" onClick={() => deleteOrder(orderData._id)}>
              <i className="fa fa-trash pr-3"></i>Cancel order
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManage;
