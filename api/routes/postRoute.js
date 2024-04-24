import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getposts, deletepost } from "../controller/postController.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postID/:userid', verifyToken, deletepost);

export default router;
