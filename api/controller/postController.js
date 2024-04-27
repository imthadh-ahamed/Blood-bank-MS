import Post from "../models/postModel.js";

// @desc    Get posts
// @route   GET /api/post/getPosts
// @access  Only Admin
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    // Count total number of posts in the database
    const totalPosts = await Post.countDocuments();

    return res.status(200).json({ success: true, posts, totalPosts });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Get posy by blogid
// @route   GET /api/post/getPost/:blogid
// @access  Only Admin
export const getPostById = async (req, res) => {
  const { blogid } = req.params;

  try {
    const post = await Post.findOne({ blogid });
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    return res.status(200).json({ success: true, post });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Create a new post
// @route   POST /api/post/createPost
// @access  Only Admin
export const createPost = async (req, res) => {
  // Check if the user making the request is an admin
  if (!req.user.isAdmin) {
    // If not an admin, return a 403 Forbidden error
    return next(errorHandler(403, "You are not allowed to create a blog post"));
  }

  // Check if the required fields (title and content) are provided in the request body
  const { blogid, userid, title, date, content } = req.body;

  if (!blogid || !userid || !title || !date || !content) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }

  try {
    const newPost = await Post.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      newPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Update a post by post ID
// @route   PUT /api/post/updatePost/:postID
// @access  Only Admin
export const updatePost = async (req, res) => {
  const { blogid } = req.params;

  try {
    const updatePost = await Post.findOneAndUpdate({ blogid }, req.body, {
      new: true,
    });

    if (!updatePost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      updatePost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Delete a post by post ID
// @route   DELETE /api/post/deletePost/:post ID
// @access  Only Admin
export const deletePost = async (req, res) => {
  const { blogid } = req.params;

  try {
    const deletePost = await Post.findOneAndDelete({ blogid });

    if (!deletePost) {
      return res
        .status(404)
        .json({ success: false, message: "Campaign not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      deletePost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
