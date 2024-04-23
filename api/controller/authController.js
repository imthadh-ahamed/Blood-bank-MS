import bcryptjs from "bcryptjs";
import users from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await users.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
