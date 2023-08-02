import express from "express";
import { register, login, logout, password } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/password", password);

export default router;
