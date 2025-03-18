import { Routes, Route } from "react-router-dom";
import { Home, EmailVerify, Login, ResetPassword } from "./pages";
import { ToastContainer } from 'react-toastify';
export default function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}
