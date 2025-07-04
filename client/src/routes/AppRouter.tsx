import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { FormMail } from "../pages/FormMail";
import { FormProfilePage } from "../pages/FormProfilePage";
import { Login } from "../pages/auth/Login";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Home />} />
        <Route path="/generate" element={<FormMail />} />
        <Route path="/profile" element={<FormProfilePage />} />
      </Routes>
    </Router>
  );
}
