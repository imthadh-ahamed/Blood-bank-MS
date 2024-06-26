import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import authRoute from "./routes/authRoutes.js";
import donorsRoute from "./routes/donorRoutes.js";
import campaignRoute from "./routes/campaignRoutes.js";
import postRoutes from "./routes/postRoute.js";
import cookieParser from "cookie-parser";

// Load environment variables from a .env file into process.env
dotenv.config();

// Connect to MongoDB using Mongoose
mongoose
  .connect(
    process.env.MONGODB // Connect to MongoDB using the MONGODB environment variable
  )
  .then(() => {
    console.log("MongoDB is connected.."); // Log a message if MongoDB connection is successful
  })
  .catch((err) => {
    console.log(err); // Log an error if MongoDB connection fails
  });

// Create an Express application
const app = express();

// Middleware to parse JSON bodies of incoming requests
app.use(express.json());
app.use(cookieParser());

// Start the Express server
app.listen(3000, () => {
  console.log("Server is running on PORT 3000!!!"); // Log a message when the server starts listening on port 3000
});

app.use("/api/user", userRoutes); // Register user routes
app.use("/api/auth", authRoute); // Register authentication routes
app.use("/api/donor", donorsRoute);
app.use("/api/campaign", campaignRoute);
app.use("/api/post", postRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
