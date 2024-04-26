import express from "express";
import { signin, signup } from "../controller/authController.js";

// Creating an instance of the Express Router
const router = express.Router();

router.post("/signup", signup); // Route for handling user signup requests
router.post("/signin", signin); // Route for handling user signin requests

export default router;
