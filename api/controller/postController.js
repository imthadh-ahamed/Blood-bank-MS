import Post from "../models/postModel.js";

// Controller function to create a new blog post
export const create = async (req, res, next) => {
  // Check if the user making the request is an admin
  if (!req.user.isAdmin) {
    // If not an admin, return a 403 Forbidden error
    return next(errorHandler(403, "You are not allowed to create a blog post"));
  }

  // Check if the required fields (title and content) are provided in the request body
  if (!req.body.title || !req.body.content) {
    // If any required field is missing, return a 400 Bad Request error
    return next(errorHandler(400, "Please provide all required fields"));
  }

  // Generate a slug for the post based on the title
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  // Create a new Post object with data from the request body  
  const newPost = new Post({
    ...req.body,                            // Include all fields from the request body
    slug,                                   // Set the generated slug
    userId: req.user.id,                    // Set the user ID of the post creator
  });

  try {
    // Save the new post to the database
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);        // Send a 201 Created response with the saved post data
  } catch (error) {
    next(error);                            // If an error occurs while saving the post, pass it to the error handling middleware
  }
};

// Controller function to retrieve blog posts based on query parameters
export const getposts = async (req, res, next) => {
  try {
    // Parse query parameters for pagination (startIndex and limit) and sorting (order)
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // Construct the MongoDB query based on the provided query parameters
    const posts = await Post.find({
      // Filter by user ID, category, slug, post ID, or search term if provided
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
    // Sort the results based on the updatedAt field and sorting direction
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // Count total number of posts in the database
    const totalPosts = await Post.countDocuments();

    // Calculate the number of posts from the last month
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    // Send a 200 OK response with the fetched posts, total number of posts, and last month's posts
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);        // If an error occurs while fetching posts, pass it to the error handling middleware
  }
};


export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};
