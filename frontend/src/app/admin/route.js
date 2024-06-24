import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "../../components/user/UserContext";

import ClientDashboard from "../../components/user/dashboard/Dashboard";
import AdminDashboard from "../../components/admin/dashboard/Dashboard";

const AdminRoute = () => {
    return (
        <UserProvider>
            <Routes>
                <Route exact path="/dashboard/admin" element={<AdminDashboard />} />
                <Route exact path="/dashboard/client" element={<ClientDashboard />} />
            </Routes>
        </UserProvider>
    );
}

export default AdminRoute;
