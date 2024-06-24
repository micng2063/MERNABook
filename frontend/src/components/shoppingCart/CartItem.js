import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "./CartContext";

export function CartItem({ id, quantity }) {
  const [itemData, setItemData] = useState({
    title: "",
    author: "",
    price: 0,
    imageurl: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5050/inventory/${id}`);

        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const item = await response.json();
        if (!item) {
          window.alert(`Item with id ${id} not found`);
          return;
        }

        setItemData(item);
      } catch (error) {
        console.error('Network error:', error);
      }
    }

    fetchData();
  }, [id]);

  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

  return (
    <tr>
      <td className="align-middle">
        <img src={itemData.imageurl} alt="Textbook" style={{ width: "50px" }} />
      </td>
      <td className="align-middle text-left">
        <Link to={`/shop/item/${itemData._id}`} style={{ textDecoration: "none" }}>{itemData.title}</Link>
      </td>
      <td className="align-middle">${itemData.price}</td>
      <td className="align-middle w-25">
        <a className="btn bg-primary text-white" href="/" onClick={(e) => { e.preventDefault(); decreaseCartQuantity(id); }}>
          <i className="fa fa-minus text-white"></i>
        </a>
        <a className="btn bg-white text-primary" href="/"> {quantity} </a>
        <a className="btn bg-primary text-white" href="/" onClick={(e) => { e.preventDefault(); increaseCartQuantity(id); }}>
          <i className="fa fa-plus text-white"></i>
        </a>
      </td>
      <td className="align-middle">${(itemData.price && itemData.price * quantity) ? (itemData.price * quantity).toFixed(2) : 0}</td>
      <td className="align-middle">
        <button className="btn btn-sm btn-danger mt-n2" onClick={() => removeFromCart(id)}>
          <i className="fa fa-times text-white"></i>
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
