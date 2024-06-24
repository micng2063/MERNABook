import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "../../components/user/UserContext";

import Home from "../../components/general/home/home";
import Contact from "../../components/general/contact/contact";

const HomeRoute = () => {
    return (
        <UserProvider>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/contact" element={<Contact />} />
            </Routes>
        </UserProvider>
    );
}

export default HomeRoute;
