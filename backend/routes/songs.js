import express from "express";
import { getFeedSongs, getUserSongs, likeSong } from "../controllers/songs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedSongs);
router.get("/:userId/posts", verifyToken, getUserSongs);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeSong);

export default router;
