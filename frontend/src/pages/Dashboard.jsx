import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();

  const [gigs, setGigs] = useState([]);        // client gigs
  const [gigBids, setGigBids] = useState([]); // bids on selected gig
  const [myBids, setMyBids] = useState([]);   // freelancer bids

  useEffect(() => {
    if (loading || !user) return;

    // Client: my gigs
    api.get("/gigs?owner=true").then((res) => {
      setGigs(res.data);
    });

    // Freelancer: my bids
    api.get("/bids/my").then((res) => {
      setMyBids(res.data);
    });
  }, [user, loading]);

  const loadBids = async (gigId) => {
    const res = await api.get(`/bids/${gigId}`);
    setGigBids(res.data);
  };

  const hire = async (bidId) => {
    await api.patch(`/bids/${bidId}/hire`);
    alert("Freelancer hired");
  };

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-14">

      {/* ================= CLIENT VIEW ================= */}
      <section>
        <h2 className="text-2xl font-bold mb-4">My Gigs</h2>

        {gigs.length === 0 && (
          <p className="text-gray-500">
            You haven’t posted any gigs yet.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gigs.map((gig) => (
            <div
              key={gig._id}
              className="border rounded-xl p-4 bg-white shadow-sm"
            >
              <h3 className="font-semibold text-lg">{gig.title}</h3>

              <button
                onClick={() => loadBids(gig._id)}
                className="mt-3 text-sm text-blue-600 hover:underline"
              >
                View Bids
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BIDS ON SELECTED GIG ================= */}
      {gigBids.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Bids on this Gig</h2>

          <div className="space-y-4">
            {gigBids.map((bid) => (
              <div
                key={bid._id}
                className="border rounded-xl p-5 bg-white shadow-sm"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-lg">
                      {bid.freelancerId.name}
                    </p>
                    <p className="text-gray-600 mt-1">
                      {bid.message}
                    </p>
                  </div>

                  <span className="font-semibold text-green-600">
                    ₹{bid.price}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${bid.status === "hired"
                        ? "bg-green-100 text-green-700"
                        : bid.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {bid.status}
                  </span>

                  {bid.status === "pending" && (
                    <button
                      onClick={() => hire(bid._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      Hire
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= FREELANCER VIEW ================= */}
      <section>
        <h2 className="text-2xl font-bold mb-4">My Bids</h2>

        {myBids.length === 0 && (
          <p className="text-gray-500">
            You haven’t placed any bids yet.
          </p>
        )}

        <div className="space-y-4">
          {myBids.map((bid) => (
            <div
              key={bid._id}
              className="border rounded-xl p-5 bg-white shadow-sm"
            >
              <p className="font-semibold text-lg">
                {bid.gigId?.title || "Gig no longer available"}
              </p>


              <p className="text-gray-600 mt-1">
                {bid.message}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="font-semibold">
                  ₹{bid.price}
                </span>

                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${bid.status === "hired"
                      ? "bg-green-100 text-green-700"
                      : bid.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {bid.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
