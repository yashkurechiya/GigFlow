import Gig from "../model/Gig.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createGig = asyncHandler(async (req, res) => {
  const gig = await Gig.create({
    ...req.body,
    ownerId: req.user._id,
  });
  res.status(201).json(gig);
});

export const getGigs = asyncHandler(async (req, res) => {
  const filter = { status: "open" };

  if (req.query.owner === "true") {
    filter.ownerId = req.user._id;
  }

  const gigs = await Gig.find(filter);
  res.json(gigs);
});
