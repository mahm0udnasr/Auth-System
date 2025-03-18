import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/user/dashboard`);
      data.success ? setUser(data.user) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message || error);
    }
  };
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
