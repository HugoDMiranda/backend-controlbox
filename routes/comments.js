import express from "express";
import {
  getAllComments,
  getComments,
  insertComment,
  deleteComment,
  updateComment,
  getAllRatios,
  getAllUsers,
} from "../controllers/comments.js";

const router = express.Router();

router.get("/", getAllComments);
router.get("/users", getAllUsers);
router.get("/:id", getComments);
router.get("/ratios", getAllRatios);
router.post("/", insertComment);
router.delete("/:id", deleteComment);
router.put("/:id", updateComment);

export default router;
