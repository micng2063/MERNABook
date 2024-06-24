import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import '../realm.css';

const Security = () => {
  const navigate = useNavigate();
  const [emailForm, setEmailForm] = useState({
    email: "",
  });

  const { emailPasswordReset } = useContext(UserContext);

  const onEmailFormInputChange = (event) => {
    const { name, value } = event.target;
    setEmailForm({ ...emailForm, [name]: value });
  };

  const sendResetEmail = async () => {
    try {
      const user = await emailPasswordReset(emailForm.email);

      if (!user) {
        alert("Please provide an email address.");
        return;
      }

      alert("Password reset email sent successfully!");
      setEmailForm({ email: "" });
    } catch (error) {
      alert(error.message);
    }
  };

  const [passwordForm, setPasswordForm] = useState({
    password: "",
    token: "",
    tokenId: ""
  });

  const { passwordReset } = useContext(UserContext);

  const onPasswordFormInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const resetPasswordWithToken = async () => {
    try {
      const { token, tokenId, password } = passwordForm;

      if (!password || !token || !tokenId) {
        alert("Please provide all required information.");
        return;
      }

      await passwordReset(token, tokenId, password);
      alert("Password reset successfully!");
      navigate("/login"); 
    } catch (error) {
      alert(`Error resetting password:\n\nPassword: ${passwordForm.password}\nToken: ${passwordForm.token}\nToken ID: ${passwordForm.tokenId}\n\n${error.message}`);
    }
  };

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const tokenId = searchParams.get("tokenId");

    if (token && tokenId) {
      setPasswordForm({ ...passwordForm, token, tokenId });
    }
  }, [location.search, passwordForm]);

  return (
    <div class="realm">
      <div className="wrapper">
        <div className="container">
          <div className="col-left">
            <div className="login-text">
              <h2 className="text-white">Forgot your password?</h2>
              <p>Type in your email below to reset your password.</p>
              <form>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={emailForm.email}
                  onChange={onEmailFormInputChange}
                />
                <div className="text-center pt-3">
                  <button type="button" className="btn-block mt-3 w-75 mx-auto d-block my-auto"
                    style={{ fontSize: "15px", fontWeight: "normal", padding: "10px 10px" }} onClick={sendResetEmail} >
                    Send Reset Email
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-right">
            <div className="login-form">
              <h2>Reset password</h2>
              <p>Enter your new password along with the secret Token and TokenID.</p>
              <form>
                <p className="pt-2">
                  <label>New Password<span>*</span></label>
                  <input
                    type="password"
                    placeholder="New Password"
                    name="password"
                    value={passwordForm.password}
                    onChange={onPasswordFormInputChange}
                  />
                </p>
                <p className="pt-2">
                  <label>Token<span>*</span></label>
                  <input
                    type="text"
                    placeholder="Token"
                    name="token"
                    value={passwordForm.token}
                    onChange={onPasswordFormInputChange}
                  />
                </p>
                <p className="pt-2">
                  <label>Token ID<span>*</span></label>
                  <input
                    type="text"
                    placeholder="Token ID"
                    name="tokenId"
                    value={passwordForm.tokenId}
                    onChange={onPasswordFormInputChange}
                  />
                </p>
                <button type="button" style={{ fontSize: "15px" }} onClick={resetPasswordWithToken}>
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
