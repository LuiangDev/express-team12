import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { FormMail } from "../pages/FormMail";
import { FormProfilePage } from "../pages/FormProfilePage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<FormMail />} />
        <Route path="/profile" element={<FormProfilePage />} />
      </Routes>
    </Router>
  );
}
