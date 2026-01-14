import express from "express";
import { createGig, getGigs } from "../controllers/gig.js";
import { protect } from "../middleware/auth.js";

const gigRouter = express.Router();

gigRouter.get("/",protect, getGigs);
gigRouter.post("/", protect, createGig);

export default gigRouter;
