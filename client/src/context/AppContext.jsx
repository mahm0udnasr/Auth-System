import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const getUserData = async () => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.get(`${apiUrl}/api/user/dashboard`);
      data.success ? setUser(data.user) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message || error);
    }
  };
  const getAuthState = async () => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.get(`${apiUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLogin(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message || error);
    }
  };
  useEffect(() => {
    getAuthState();
  }, []);
  const value = {
    apiUrl,
    isLogin,
    setIsLogin,
    user,
    setUser,
    getUserData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
