import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import '../realm.css';

const Signup = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const { emailPasswordSignup } = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    lastName: ""
  });

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/login");
  }

  const onSubmit = async () => { 
    try {
      const user = await emailPasswordSignup(form.email, form.password); 
      if (user) {
        // alert(`Your user ID is: ${user.id}. Keep this with you.`);
        redirectNow();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="realm">
      <div className="wrapper">
      <div className="container">
        <div className="col-left">
          <div className="login-text">
            <h2 className="text-white">Don't waste your time</h2>
            <p>Create an account quickly with a single click.</p>
            <button className="btn-block btn-icon btn-icon-google mb-3">
              Sign-up with Google
            </button>
            <button className="btn-block btn-icon btn-icon-facebook mb-3">
              Sign-up with Facebook
            </button>
          </div>
        </div>
        <div className="col-right">
          <div className="login-form">
            <h2>Signup</h2>
            <p>Before you get started, you must sign up if you don't already have an account.</p>
            <form >
              <p className="pt-2">
                <label>Email<span>*</span></label>
                <input label="Email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={onFormInputChange}
                />
              </p>
              <p className="pt-2">
                <label>Password<span>*</span></label>
                <input label="Password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={onFormInputChange}
                />
              </p>
              
              <div className="pt-3">
                <button type="button" onClick={onSubmit}>Signup</button>
              </div>

              <p className="pt-3">
                <a href="/login">Already have an account? Login</a>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Signup;
