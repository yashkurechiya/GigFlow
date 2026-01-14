import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import CreateGig from "./pages/CreateGig";
import Dashboard from "./pages/Dashboard";
import GigDetails from "./pages/GigDetails";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/Protected";

export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Gigs />} />
        <Route path="/gigs/:id" element={<GigDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={
          <ProtectedRoute>
            <CreateGig />
          </ProtectedRoute>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
