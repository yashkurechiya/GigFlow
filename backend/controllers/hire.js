import Gig from "../model/Gig.js";
import Bid from "../model/Bid.js";

export const hireBid = async (req, res) => {
  try {
    console.log("HIRE START");
    console.log("User:", req.user?._id);
    console.log("Bid ID:", req.params.bidId);

    const bid = await Bid.findById(req.params.bidId);
    if (!bid) {
      console.log("Bid not found");
      return res.status(404).json({ message: "Bid not found" });
    }

    const gig = await Gig.findById(bid.gigId);
    if (!gig) {
      console.log("Gig not found");
      return res.status(404).json({ message: "Gig not found" });
    }

    console.log("Gig owner:", gig.ownerId.toString());

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      console.log("Unauthorized hire attempt");
      return res.status(403).json({ message: "Not authorized" });
    }

    if (gig.status === "assigned") {
      console.log("Gig already assigned");
      return res.status(400).json({ message: "Gig already assigned" });
    }

    gig.status = "assigned";
    await gig.save();

    await Bid.findByIdAndUpdate(bid._id, { status: "hired" });
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" }
    );

    console.log("HIRE SUCCESS");
    res.json({ message: "Freelancer hired successfully" });
  } catch (err) {
    console.error("HIRE ERROR:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
