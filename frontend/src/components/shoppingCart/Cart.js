import { useShoppingCart } from "./CartContext";
import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../user/UserContext';

import CartItem from "./CartItem";
import CartDetail from "./CartDetail";

export function ShoppingCart() {
  const { cartItems } = useShoppingCart();
  const { subtotal, tax, total } = CartDetail();

  function handleProceedToCheckout() {
    console.log(new Date().toLocaleDateString());
  }

  const { fetchUser } = useContext(UserContext);
  const [userLogin, setUserLogin] = useState();

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const user = await fetchUser();
        setUserLogin(!!user);
      } catch (error) {
        setUserLogin(false);
        console.error('Error checking user login:', error);
      }
    };
    checkUserLogin();
  }, [fetchUser]);

  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-lg-8 table-responsive mb-5">
          <table className="table table-light table-borderless table-hover text-center mb-0">
            <thead className="thead-dark">
              <tr>
                <th></th>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {cartItems.map((item) => (
                <CartItem key={item._id} {...item} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-4">
          <form className="mb-30" action="">
            <div className="input-group">
              <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
              <div className="input-group-append">
                <button className="btn bg-primary text-white">Apply Coupon</button>
              </div>
            </div>
          </form>
          <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
          <div className="bg-light p-30 mb-5">
            <div className="border-bottom pb-2">
              <div className="d-flex justify-content-between mb-3">
                <h6>Subtotal</h6>
                <h6>${subtotal}</h6>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <h6 className="font-weight-medium">Shipping</h6>
                <h6 className="font-weight-medium">$10.00</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="font-weight-medium">Tax</h6>
                <h6 className="font-weight-medium">${tax}</h6>
              </div>
            </div>
            <div className="pt-2">
              <div className="d-flex justify-content-between mt-2">
                <h5>Total</h5>
                <h5>${total}</h5>
              </div>
              {userLogin ? (
                <Link to="/shop/checkout" onClick={handleProceedToCheckout} className="btn btn-block bg-primary text-white font-weight-bold my-3">Proceed To Checkout</Link>
              ) : (
                <div>
                  <Link to="/shop/checkout" onClick={handleProceedToCheckout} className="btn btn-block bg-primary text-white font-weight-bold my-3">Proceed To Checkout</Link>
                  <Link to="/login" className="btn btn-block bg-primary text-white font-weight-bold my-3">Go to Login</Link>
                  <p className="text-center" style={{fontSize:"80%"}}><i>* Login is recommended if you'd like to keep track your orders and more.</i></p>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ShoppingCart;
