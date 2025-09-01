import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import NavBar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
// import Iot from "./pages/IoT";
// import Users from "./pages/Users";

export default function App() {
   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

