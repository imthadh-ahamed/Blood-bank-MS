import mongoose from "mongoose"

// Define a Mongoose schema for the blog post
const campaignSchema = new mongoose.Schema({        // Define fields for the user schema
    campaignID: {
        type: Number,
        required: true,
        unique: true,
    },
    campaignName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    org: {
        type: String,
        required: true,
    },
    req: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Create a Mongoose model for the user based on the defined schema
const Campaign = mongoose.model('Campaign', campaignSchema);

// Export the Mongoose model to be used in other files
export default Campaign;