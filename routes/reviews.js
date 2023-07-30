import express from "express";
import {
  addReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from "../controllers/reviews.js";

const router = express.Router();

router.get("/", getReviews);
router.get("/:id", getReview);
router.post("/", addReview);
router.delete("/:id", deleteReview);
router.put("/:id", updateReview);

export default router;
