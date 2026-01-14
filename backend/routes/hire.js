import express from "express";
import { hireBid } from "../controllers/hire.js";
import { protect } from "../middleware/auth.js";

const Hrouter = express.Router();

Hrouter.patch("/:bidId/hire", protect, hireBid);

export default Hrouter;
