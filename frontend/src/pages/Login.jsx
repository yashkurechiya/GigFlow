import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
 

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/login", { email, password });
    navigate("/");
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
  <form
    onSubmit={submit}
    className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
  >
    {/* Header */}
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">
        Welcome back
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Sign in to continue to <span className="font-medium">GigFlow</span>
      </p>
    </div>

    {/* Email */}
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email address
      </label>
      <input
        type="email"
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        placeholder="you@example.com"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    {/* Password */}
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <input
        type="password"
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        placeholder="••••••••"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    {/* Button */}
    <button
      type="submit"
      className="w-full bg-black hover:bg-gray-800 active:bg-blue-800 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60"
    >
      Sign in
    </button>

    {/* Footer */}
    <p className="text-sm text-center text-gray-500 mt-6">
      Don’t have an account?{" "}
      <a
        href="/register"
        className="text-black hover:text-gray-700 font-medium"
      >
        Create one
      </a>
    </p>
  </form>
</div>

);

}
