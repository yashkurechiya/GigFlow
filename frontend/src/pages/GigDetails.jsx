import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function GigDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [gig, setGig] = useState(null);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    api.get("/gigs").then(res => {
      const found = res.data.find(g => g._id === id);
      setGig(found);
    });
  }, [id]);

  const submitBid = async (e) => {
    e.preventDefault();
    await api.post("/bids", {
      gigId: id,
      message,
      price,
    });
    alert("Bid submitted");
  };

  if (!gig) return <p>Loading...</p>;

 return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">
      {/* Gig Info */}
      <h2 className="text-2xl font-bold mb-2">
        {gig.title}
      </h2>

      <p className="text-gray-600 mb-4">
        {gig.description}
      </p>

      <p className="text-lg font-semibold text-green-600 mb-6">
        Budget: ₹{gig.budget}
      </p>

      {/* Bid Form */}
      <form onSubmit={submitBid}>
        <h3 className="text-lg font-semibold mb-3">
          Submit Your Bid
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Proposal
          </label>
          <textarea
            className="input"
            rows={4}
            placeholder="Describe how you will complete this gig..."
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Your Price (₹)
          </label>
          <input
            type="number"
            className="input"
            placeholder="e.g. 12000"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <button className="btn">
          Submit Bid
        </button>
      </form>
    </div>
  </div>
);

}
