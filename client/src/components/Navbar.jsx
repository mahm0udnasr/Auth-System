import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
export default function Navbar() {
  const navigate = useNavigate();
  const { user, apiUrl, setUser, setIsLogin } = useContext(AppContext);
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${apiUrl}/api/auth/logout`);
      if (data.success) {
        setUser(null);
        setIsLogin(false);
      }
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message || error.message || error);
    }
  };
  const verifyEmail = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${apiUrl}/api/auth/send-verify-otp`);
      if (data.success) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message || error);
    }
  };
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="Auth System Logo" className="w-28 sm:w-32" />
      {user ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {user.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm rounded-xs">
              {!user.isVerify && (
                <li
                  onClick={verifyEmail}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer rounded-xs"
                >
                  Verify Email
                </li>
              )}
              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10 rounded-xs"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer"
        >
          Login
          <img src={assets.arrow_icon} alt="Arrow icon" />
        </button>
      )}
    </div>
  );
}
