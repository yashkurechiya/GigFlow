import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
const { user } = useAuth();

  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            GigFlow
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/create" className="hover:text-blue-600">
              Create Gig
            </Link>
            <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-600">
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t">
          <Link
            to="/create"
            className="block px-4 py-3 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Create Gig
          </Link>
          <Link
            to="/dashboard"
            className="block px-4 py-3 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className="block px-4 py-3 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-4 py-3 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
