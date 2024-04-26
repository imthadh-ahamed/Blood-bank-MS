import mongoose from "mongoose";

// Define a Mongoose schema for the user
const userSchema = new mongoose.Schema(
  {
    // Define fields for the user schema
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Enable timestamps to automatically add createdAt and updatedAt fields
);

// Create a Mongoose model for the user based on the defined schema
const users = mongoose.model("users", userSchema);

// Export the Mongoose model to be used in other files
export default users;
