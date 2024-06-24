import { useEffect, useState } from "react";
import { useContext } from 'react';
import { UserContext } from './UserContext.js';

import ClientDashboard from "./dashboard/Dashboard.js";
import AdminDashboard from "../admin/dashboard/Dashboard.js";

export default function UserData() {
  const [form, setForm] = useState({
    _id: "",
    code: "",
    orderid: [],
    name: "",
    lastName: "",
    phone: 0,
    email: "",
    role: 0,
  });

  const [userRole, setUserRole] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userOrder, setUserOrder] = useState([]);

  const { fetchUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await fetchUser();
        if (currentUser) {
          const response = await fetch(`http://localhost:5050/user/${currentUser.id}`);

          if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }

          const user = await response.json();
          if (!user) {
            window.alert(`User with code ${currentUser.id} not found`);
            return;
          }

          const updatedUser = {
            _id: user._id || "",
            code: user.code || "",
            name: user.name || "",
            lastName: user.lastName || "",
            phone: user.phone || 0,
            email: user.email || "",
            role: user.role || 0,
            orderid: user.orderid || [],
          };

          setForm(updatedUser);

          setUserRole(user.role);
          setUserID(user._id);
          setUserOrder(user.orderid);
        }
      } catch (error) {
        console.error("Order error from UserData:", error);
        alert(error);
      }
    }

    fetchData();
  }, [fetchUser]);

  async function updateOrderID(newOrderId) {
    const editedUser = {
      orderid: [...form.orderid, newOrderId],
      _id: form._id,
      code: form.code,
      name: form.name,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      role: form.role,
    };

    const currentUser = await fetchUser();
    await fetch(`http://localhost:5050/user/${currentUser.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedUser),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  function UserDashboard() {
    return userRole === 0 ? <ClientDashboard /> : <AdminDashboard />;
  }
  
  return {
    form, userID, userRole, userOrder,
    updateOrderID, UserDashboard
  };
}
