import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "../../components/user/UserContext";
import PrivateRoute from "../../components/user/Private";

import UserDashboard from "../../components/user/UserDashboard";
import Login from "../../components/user/login/Login";
import Signup from "../../components/user/login/Signup";

import Security from "../../components/user/security/Security";
import Reset from "../../components/user/security/Reset";

const UserRoute = () => {
    return (
        <UserProvider>
            <Routes>
                <Route exact path='/login' element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path='/security' element={<Security />} />
                <Route element={<PrivateRoute />}>
                    <Route exact path='/dashboard' element={<UserDashboard />} /> 
                </Route>
                <Route exact path='/reset' element={<Reset />} />
            </Routes>
        </UserProvider>
    );
}

export default UserRoute;
