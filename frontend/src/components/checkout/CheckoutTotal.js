import { Link } from "react-router-dom";

import CartDetail from "../shoppingCart/CartDetail";

export function CheckoutTotal() {
  const { subtotal, tax, total, itemData } = CartDetail();

  function truncateTitle(title) {
    if (title.length <= 50) {
      return title;
    }
    return title.slice(0, 50) + "...";
  }

  return (
    <div>
      <div className="bg-light p-30 mb-5">
        <div className="border-bottom">
          <Link to="/shop/cart" className="btn btn-block bg-primary text-white font-weight-bold mb-3"> Go back to Cart</Link>

          <h6 className="mb-3">Products</h6>
          {itemData.map((item, index) => (
            <div className="d-flex justify-content-between" key={index}>
              <p>{truncateTitle(item.title)}</p>
              <p>${item.price}</p>
            </div>
          ))}
        </div>
        <div className="border-bottom pt-3 pb-2">
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
        </div>
      </div>
    </div>
  );
}

export default CheckoutTotal;
