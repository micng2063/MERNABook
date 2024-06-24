import { createContext, useState } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "./constants";

const app = new App(APP_ID);

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const emailPasswordLogin = async (email, password) => {
    const credentials = Credentials.emailPassword(email, password);
    const authenticatedUser = await app.logIn(credentials);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const emailPasswordSignup = async (email, password) => {
    try {
      await app.emailPasswordAuth.registerUser(email, password);
      // return emailPasswordLogin(email, password);
      const authenticatedUser = await emailPasswordLogin(email, password);
      return authenticatedUser;
    } catch (error) {
      throw error;
    }
  };

  const emailPasswordReset = async (email) => {
    try {
      await app.emailPasswordAuth.sendResetPasswordEmail({ email });
      return true;
    } catch (error) {
      throw error;
    }
  };

  const passwordReset = async (token, tokenId, password) => {
    try {
      await app.emailPasswordAuth.resetPassword(token, tokenId, password);
    } catch (error) {
      throw error;
    }
  };

  const fetchUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.refreshCustomData();
      setUser(app.currentUser);
      return app.currentUser;
    } catch (error) {
      throw error;
    }
  }

  const logOutUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.logOut();
      setUser(null);
      return true;
    } catch (error) {
      throw error
    }
  }

  return <UserContext.Provider value={{ user, setUser, fetchUser, emailPasswordLogin, emailPasswordSignup, logOutUser, emailPasswordReset, passwordReset }}>
    {children}
  </UserContext.Provider>;
}