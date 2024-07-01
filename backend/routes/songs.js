import express from "express";
import { getFeedSongs, getSong, getUserSongs, likeSong, deleteSong } from "../controllers/songs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedSongs);
router.get("/:id", verifyToken, getSong);
router.get("/artist/:userId", verifyToken, getUserSongs);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeSong);

/* DELETE */
router.delete("/delete/:id", verifyToken, deleteSong)

export default router;
