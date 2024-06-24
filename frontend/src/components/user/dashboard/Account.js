import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useContext } from 'react';
import { UserContext } from '../UserContext.js';

export default function Account() {
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
  const navigate = useNavigate();

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
            navigate("/");
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
            orderid: user.orderid ||[],
          };

          setForm(updatedUser);
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    fetchData();
  }, [fetchUser, navigate]);


  function updateForm(value) {
    return setForm(prev => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.lastName || !form.phone || !form.email) {
      window.alert("Please fill out all required fields");
      return;
    }

    const editedUser = {
      _id: form._id,
      code: form.code,
      name: form.name,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      role: form.role,
      orderid: form.orderid,
    };

    const currentUser = await fetchUser();
    await fetch(`http://localhost:5050/user/${currentUser.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedUser),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    window.alert("Information updated successfully!");
  }

  const { logOutUser } = useContext(UserContext);

  // eslint-disable-next-line
  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div class="row">
          <div className="col-md-6">
            <label htmlFor="name">First Name</label>
            <input type="text" className="form-control" id="name"
              value={form.name} onChange={(e) => updateForm({ name: e.target.value })} />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="form-control" id="lastName"
              value={form.lastName} onChange={(e) => updateForm({ lastName: e.target.value })} />
          </div>
          <div className="col-md-6">
            <label htmlFor="phone">Phone</label>
            <input type="text" className="form-control" id="phone"
              value={form.phone} onChange={(e) => updateForm({ phone: e.target.value })} />
          </div>
          <div className="col-md-6">
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" id="email"
              value={form.email} onChange={(e) => updateForm({ email: e.target.value })} />
          </div>
          <br />
          <div className="col-md-12">
            <button type="submit" className="btn btn-block bg-primary text-white font-weight-bold my-3">Update Account</button>
          </div>
        </div>
      </form>
    </div>
  );
}
