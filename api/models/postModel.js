import mongoose from "mongoose";

// Define a Mongoose schema for the blog post
const postSchema = new mongoose.Schema(
  {
    // Define fields for the user schema
    blogid: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Enable timestamps to automatically add createdAt and updatedAt fields
);

// Create a Mongoose model for the user based on the defined schema
const Post = mongoose.model("Post", postSchema);

// Export the Mongoose model to be used in other files
export default Post;
