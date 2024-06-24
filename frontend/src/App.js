import { UserProvider } from "./components/user/UserContext";
import { ShoppingCartProvider } from "./components/shoppingCart/CartContext";

import Navbar from "./components/general/navbar/navbar";
import Header from "./components/general/header/header";

import HomeRoute from "./app/home/route";
import UserRoute from "./app/user/route"; 
import AdminRoute from "./app/admin/route";
import ShopRoute from "./app/shop/route"; 

function App() {
  return (
    <UserProvider>
      <ShoppingCartProvider>
        <Header />
        <Navbar />
        <HomeRoute />
        <UserRoute />
        <ShopRoute />
        <AdminRoute />
      </ShoppingCartProvider>
    </UserProvider>
  );
}

export default App;
