import bcryptjs from "bcryptjs";
import users from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  // Hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new user instance
  const newUser = new users({
    username,
    email,
    password: hashedPassword,
  });

  try {
    // Save the user to the database
    await newUser.save();
    // Return a success message
    res.json({ message: "Signup successful" });
  } catch (error) {
    // Pass any database errors to the error handler middleware
    next(error);
  }
};
