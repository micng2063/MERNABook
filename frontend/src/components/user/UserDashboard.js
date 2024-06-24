import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from 'react';
import { UserContext } from './UserContext.js';

import ClientDashboard from "./dashboard/Dashboard.js";
import AdminDashboard from "../admin/dashboard/Dashboard.js";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

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

          setUserRole(user.role);
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    fetchData();
  }, [fetchUser, navigate]);

  return userRole === 1 ? <AdminDashboard /> : <ClientDashboard />;
}
