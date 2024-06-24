import { useEffect, useState } from "react";
import { useShoppingCart } from "./CartContext";

export function CartDetail() {
  const { cartID, getItemQuantity } = useShoppingCart();

  const [subtotal, setSubtotal] = useState(0);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const items = await Promise.all(
          cartID.map(async (id) => {
            const response = await fetch(`http://localhost:5050/inventory/${id}`);
            if (!response.ok) {
              throw new Error(`An error has occurred: ${response.statusText}`);
            }
            const item = await response.json();
            const price = item.price * getItemQuantity(item._id);
            return { title: item.title, price: price.toFixed(2) };
          })
        );

        setItemData(items);

        const newSubtotal = items.reduce((total, item) => total + parseFloat(item.price), 0);
        setSubtotal(newSubtotal);
      } catch (error) {
        console.error('Network error:', error);
      }
    }

    fetchData();
  }, [cartID, getItemQuantity]);

  const tax = subtotal * 0.0625;
  const total = subtotal + tax + 10;

  return { subtotal: subtotal.toFixed(2), tax: tax.toFixed(2), total: total.toFixed(2), itemData };
}

export default CartDetail;
