import bcryptjs from "bcryptjs";
import users from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Define the signup function
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

// Define the signin function
export const signin = async (req, res, next) => {
  const { email, password } = req.body; // Destructure email and password from the request body

  // Check if email or password is missing or empty
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required")); // Return an error if any field is missing or empty
  }

  try {
    // Find the user with the provided email in the database
    const validUser = await users.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Check if a user with the provided email exists and if the password is correct
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    // Omit the password field from the user object
    const { password: pass, ...rest } = validUser._doc;

    // Set the token as a cookie in the response with httpOnly and secure flags
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest); // Send the user data in the response
  } catch (error) {
    next(error);
  }
};
