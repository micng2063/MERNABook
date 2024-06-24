import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import '../realm.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    
    setTimeout(() => {
      navigate(redirectTo ? redirectTo : "/dashboard");
    }, 1000); 
  }

  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        redirectNow();
      }
    }
  }

  useEffect(() => {
    loadUser(); // eslint-disable-next-line 
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await emailPasswordLogin(form.email, form.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      if (error.statusCode === 401) {
        alert("Invalid username/password. Try again!");
      } else {
        alert(error);
      }
    }
  };

  return (
    <div class="realm">
      <div className="wrapper">
        <div className="container">
          <div className="col-left">
            <div className="login-text">
              <h2 className="text-white">Don't waste your time</h2>
              <p>Login quickly with Google one-tap signin.</p>
              <button class="btn-block btn-icon btn-icon-google mb-3">
                Login with Google
              </button>
              <button class="btn-block btn-icon btn-icon-facebook mb-3">
                Login with Facebook
              </button>
            </div>
          </div>
          <div className="col-right">
            <div className="login-form">
              <h2>Login</h2>
              <p>Before you get started, you must login or register if you don't already have an account.</p>
              <form>
                <p className="pt-3">
                  <label>Username or email address<span>*</span></label>
                  <input placeholder="Username or Email"
                    label="Email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onFormInputChange}
                    required />
                </p>
                <p className="pt-3">
                  <label>Password<span>*</span></label>
                  <input type="password" placeholder="Password"
                    label="Password"
                    name="password"
                    value={form.password}
                    onChange={onFormInputChange}
                    required />
                </p>

                <div className="pt-1">
                  <button type="button mt-3" onClick={onSubmit} style={{ fontSize: "15px" }}>Login</button>
                </div>

                <div className="row pl-3 pt-2">
                  <div className="col-lg-6">
                    <a href="/signup" style={{ textDecoration: "none", fontSize: "15px" }}>Create an account</a>
                  </div>
                  <div className="col-lg-6">
                    <a href="/security" style={{ textDecoration: "none", fontSize: "15px" }}>Forgot Password?</a>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
