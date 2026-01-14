import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const { user } = useAuth();


  useEffect(() => {
    api.get("/gigs").then(res => setGigs(res.data));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
  <h1 className="text-3xl font-bold mb-6 text-center">
    Available Gigs
  </h1>

  {gigs.length === 0 && (
    <p className="text-center text-gray-500">
      No gigs available right now
    </p>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {gigs.map((gig) => (
      <div
        key={gig._id}
        className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
      >
        <Link
          to={`/gigs/${gig._id}`}
          className="text-xl font-semibold text-blue-600 hover:underline"
        >
          {gig.title}
        </Link>

        <p className="text-gray-600 mt-2 line-clamp-3">
          {gig.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="font-semibold text-green-600">
            ₹{gig.budget}
          </span>

          <Link
            to={`/gigs/${gig._id}`}
            className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            View & Apply
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
