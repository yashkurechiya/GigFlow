import express from "express";
import { createBid, getBidsForGig, getMyBids } from "../controllers/bid.js";
import { protect } from "../middleware/auth.js";

const bidRouter = express.Router();

bidRouter.get("/my",protect, getMyBids)
bidRouter.get("/:gigId", protect, getBidsForGig);
bidRouter.post("/", protect, createBid);

export default bidRouter;
