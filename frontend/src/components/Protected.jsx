import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    api.get("/auth/me")
      .then(() => setAllowed(true))
      .catch(() => setAllowed(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!allowed) return <Navigate to="/login" />;

  return children;
}
