import express from "express";
import { getFeedSongs, getSong, getUserSongs, likeSong } from "../controllers/songs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedSongs);
router.get("/:userId", verifyToken, getUserSongs);
router.get("/:id", verifyToken, getSong);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeSong);

export default router;
