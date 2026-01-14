import Bid from "../model/Bid.js";
import asyncHandler from "../utils/asyncHandler.js";

import Gig from "../model/Gig.js";

export const createBid = async (req, res) => {
  const { gigId, message, price } = req.body;

  const gig = await Gig.findById(gigId);
  if (!gig) return res.status(404).json({ message: "Gig not found" });

  if (gig.ownerId.toString() === req.user._id.toString()) {
    return res.status(400).json({
      message: "You cannot bid on your own gig",
    });
  }

  const bid = await Bid.create({
    gigId,
    freelancerId: req.user._id,
    message,
    price,
  });

  res.status(201).json(bid);
};


export const getBidsForGig = asyncHandler(async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId }).populate(
    "freelancerId",
    "name email"
  );
  res.json(bids);
});

export const getMyBids = async (req, res) => {
  const bids = await Bid.find({ freelancerId: req.user._id })
    .populate("gigId", "title status budget");

  res.json(bids);
};
