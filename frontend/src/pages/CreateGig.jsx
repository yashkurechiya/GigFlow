import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();


  const submit = async (e) => {
    e.preventDefault();
    await api.post("/gigs", { title, description, budget });
    navigate("/");
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <form
      onSubmit={submit}
      className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Post a New Gig
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Gig Title
        </label>
        <input
          className="input"
          placeholder="e.g. Build a React Dashboard"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          className="input"
          rows={4}
          placeholder="Describe the work you need..."
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Budget (₹)
        </label>
        <input
          type="number"
          className="input"
          placeholder="e.g. 15000"
          onChange={(e) => setBudget(e.target.value)}
          required
        />
      </div>

      <button className="btn">
        Create Gig
      </button>
    </form>
  </div>
);

}
