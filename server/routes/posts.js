import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router()

/* read */
// gets users feed - all post, there is no curated feed algorithm 
router.get("/", verifyToken, getFeedPosts);
// gets all posts made by a specific user via id
router.get("/:userId", verifyToken, getUserPosts);

/* update */
// like/unlike a post 
router.patch("/:id/like", verifyToken, likePost);

export default router;