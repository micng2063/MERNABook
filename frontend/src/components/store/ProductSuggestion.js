import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../shoppingCart/CartContext";

const ProductSuggestion = ({subject}) => {
  const [inventory, setInventory] = useState([]);
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();

  useEffect(() => {
    async function getInventory() {
      const response = await fetch(`http://localhost:5050/inventory/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const inventory = await response.json();
      setInventory(inventory);
    }
    getInventory();
  }, []);

  function formatAuthors(authors) {
    if (!authors) {
      return "Unknown author";
    }

    const authorList = authors.split(",");
    const firstAuthor = authorList[0].trim();
    if (authorList.length > 1) {
      return `${firstAuthor} et al.`;
    }

    return firstAuthor;
  }
  
  function getRandomItems(items, count) {
    const shuffledItems = items.sort(() => 0.5 - Math.random());
    return shuffledItems.slice(0, count);
  }
  
  const itemsForSubject = inventory.filter((item) => item.subject === subject);
  let displayedItems = [];
  
  if (itemsForSubject.length >= 4) {
    displayedItems = getRandomItems(itemsForSubject, 4);
  } else {
    displayedItems = itemsForSubject;
    const remainingCount = 4 - itemsForSubject.length;
    const otherItems = inventory.filter((item) => item.subject !== subject);
    const additionalItems = getRandomItems(otherItems, remainingCount);
    displayedItems.push(...additionalItems);
  }
  
  return (
    <div>
      <div className="row px-3">
        {displayedItems
          .filter(item => item.showListing)
          .map((inventoryItem) => {
          const quantity = getItemQuantity(inventory._id);

          return (
            <div key={inventoryItem.keyid} className="col-lg-3 col-md-6 col-sm-6 pb-1">
              <div className="product-item bg-light mb-4 pb-2">
                <div className="product-img position-relative overflow-hidden" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img className="img-fluid" style={{ height: "300px", width: "300px", objectFit: "fill" }} src={inventoryItem.imageurl} alt="" />
                  <div className="product-action">
                    {quantity === 0 ? (
                      <a href="/" className="btn bg-primary text-white" onClick={(e) => { e.preventDefault(); increaseCartQuantity(inventoryItem._id); }}>
                        <i className="fa fa-shopping-cart text-white" />
                        <span className="text-white"> &nbsp;Add to Cart</span>
                      </a>
                    ) : (
                      <div>
                        <a className="btn bg-primary text-white mr-n1" href="/" onClick={(e) => { e.preventDefault(); decreaseCartQuantity(inventoryItem._id); }}>
                          <i className="fa fa-minus text-white"></i>
                        </a>
                        <a className="btn bg-white text-primary pr-3 pl-3" href="/"> {quantity} </a>
                        <a className="btn bg-primary text-white ml-n1" href="/" onClick={(e) => { e.preventDefault(); increaseCartQuantity(inventoryItem._id); }}>
                          <i className="fa fa-plus text-white"></i>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center py-4 pr-1 pl-1" style={{maxHeight:"140px"}}>
                  <h6 className="text-decoration-none text-wrap pr-2">
                    <Link to={`/shop/item/${inventoryItem._id}`}>{inventoryItem.title}</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-center mt-2 pl-2 pr-2">
                    <small>{formatAuthors(inventoryItem.author)}</small>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>${inventoryItem.price}</h5>
                    <h6 className="text-muted ml-2"><del>${inventoryItem.price}</del></h6>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSuggestion;
