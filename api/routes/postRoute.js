import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controller/postController.js";

const router = express.Router();

router.get("/getPosts", getPosts);
router.get("/getPost/:blogid", getPostById);
router.post("/createPost", verifyToken, createPost);
router.put("/updatePost/:blogid", verifyToken, updatePost);
router.delete("/deletePost/:blogid", verifyToken, deletePost);

export default router;
