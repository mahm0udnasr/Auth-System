import { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
export default function Login() {
  const { apiUrl, setIsLogin, getUserData } = useContext(AppContext);
  const [mood, setMood] = useState("Sign Up");
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (mood === "Sign Up") {
        const response = await axios.post(`${apiUrl}/api/auth/register`, {
          name: data.fullName,
          email: data.email,
          password: data.password,
        });
        if (response.data.success) {
          setIsLogin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${apiUrl}/api/auth/login`, {
          email: data.email,
          password: data.password,
        });
        if (response.data.success) {
          setIsLogin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message || error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-6  sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        alt="auth logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full  sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {mood === "Sign Up" ? "Create Account" : "Sign In"}
        </h2>
        <p className="text-center text-sm mb-6">
          {mood === "Sign Up" ? "Create your account" : "Login to your account"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {mood === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="person icon" />
              <input
                type="text"
                name="full-name"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none text-white"
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
              />
            </div>
          )}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="email icon" />
            <input
              type="email"
              name="email-address"
              placeholder="Email Address"
              required
              className="bg-transparent outline-none text-white"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="person icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none text-white"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot password?
          </p>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer">
            {mood}
          </button>
        </form>
        {mood === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-5">
            Already have an account?{" "}
            <span
              onClick={() => setMood("Sign In")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login Here.
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-5">
            Don't have an account?{" "}
            <span
              onClick={() => setMood("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign Up.
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
