import mongoose from "mongoose";

// Define a Mongoose schema for the donor
const donorSchema = new mongoose.Schema(
  {
    // Define fields for the user schema
    donorid: {
      type: Number,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
      unique: true,
    },
    dateofbirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    bloodtype: {
      type: String,
      required: true,
    },
    contactno: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Add email validation
      validate: {
        validator: (value) => {
          // This regex checks if the email is in the correct format
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email format",
      },
    },
    preblddntdate: {
      type: Date,
      required: true,
    },
    createDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a Mongoose model for the user based on the defined schema
const Donor = mongoose.model("Donor", donorSchema);

// Export the Mongoose model to be used in other files
export default Donor;
