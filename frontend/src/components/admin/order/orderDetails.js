import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import OrderStatus from "../../general/status/status";

export function OrderDetail() {
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

  const params = useParams();
  const orderId = atob(params.id);
  const [orderStatus, setOrderStatus] = useState('Pending');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5050/order/${orderId}`);

        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const order = await response.json();
        if (!order) {
          window.alert(`Order with id ${orderId} not found`);
          return;
        }

        setOrderData(order);
        setOrderStatus(order.orderStatus);
      } catch (error) {
        console.error('Network error:', error);
      }
    }

    fetchData();
  }, [orderId]);

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

  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderData._id).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2500);
    });
  };


  return (
    <div className="container-fluid">
      <div class="pb-3">
        <h1 className="section-title position-relative text-center text-uppercase">
          <span className="bg-secondary pr-3 px-30 ">Thank you for your purchase</span>
        </h1>
        <h5 className="position-relative text-center">
          <span className="bg-secondary pr-3 text-uppercase">Order #: <span className="font-weight-lighter">{orderData._id}</span></span>
          <i className={`fa fa-paste pr-3 ${copySuccess ? 'text-success' : ''}`} onClick={copyToClipboard}></i>
          {copySuccess && <small className="text-success ml-1" >Copied to clipboard</small>}
        </h5>
      </div>

      <div className="row px-xl-5">
        <OrderStatus orderStatus={orderStatus}/>
      </div>

      <div className="row px-xl-5">
        <div className="col-lg-8 table-responsive mb-5">
          <h5 className="section-title position-relative text-uppercase">
            <span className="bg-secondary pr-3">Order Details</span>
          </h5>
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
            <div className="pt-2">
              <div className="d-flex justify-content-between mt-2">
                <h5 class="text-primary">Status</h5>
                <h5>{orderData.orderStatus}</h5>
              </div>
              <p class="text-center" style={{ fontSize: "0.75rem" }}>You will be notified once there's an update on your Order</p>
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
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
