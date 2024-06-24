import React from "react";
import { Routes, Route } from "react-router-dom";

import Checkout from "../../components/checkout/Checkout";
import Store from "../../components/store/Store";
import Item from "../../components/store/ProductDetail";
import Cart from "../../components/shoppingCart/Cart";
import OrderDetails from "../../components/admin/order/orderDetails";

const ShopRoute = () => {
    return (
        <Routes>
            <Route exact path='/shop' element={<Store />} />
            <Route exact path="/shop/item/:id" element={<Item />} />
            <Route exact path="/shop/cart" element={<Cart />} />
            <Route exact path="/shop/checkout" element={<Checkout />} />
            
            <Route exact path="/order/:id" element={<OrderDetails />} />
        </Routes>
    );
}

export default ShopRoute;
