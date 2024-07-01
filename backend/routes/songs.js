import express from "express";
import { getFeedSongs, getSong, getUserSongs, likeSong } from "../controllers/songs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedSongs);
router.get("/:id", verifyToken, getSong);
router.get("/artist/:userId", verifyToken, getUserSongs);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeSong);

export default router;
