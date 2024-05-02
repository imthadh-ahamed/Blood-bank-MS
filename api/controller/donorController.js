import Donor from "../models/donorModel.js";

// @desc    Get donors
// @route   GET /api/getdonors
// @access  Public
export const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();

    // Count total number of posts in the database
    const totalDonors = await Donor.countDocuments();

    return res.status(200).json({ success: true, donors, totalDonors });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// @desc    Get donor by donorid
// @route   GET /api/donor/:donorid
// @access  Public
export const getDonorById = async (req, res) => {
  const { donorid } = req.params;

  try {
    const donor = await Donor.findOne({ donorid });
    if (!donor) {
      return res
        .status(404)
        .json({ success: false, message: "Donor not found" });
    }
    return res.status(200).json({ success: true, donor });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// @desc    Create a new donor
// @route   POST /api/donor
// @access  Public
export const createDonor = async (req, res) => {
  // Check if the user making the request is an admin
  if (!req.user.isAdmin) {
    // If not an admin, return a 403 Forbidden error
    return next(errorHandler(403, "You are not allowed to create a donor details"));
  }

  // Check if the required fields are provided in the request body
  const {
    donorid,
    fullname,
    nic,
    dateofbirth,
    gender,
    address,
    bloodtype,
    contactno,
    email,
    preblddntdate,
    createDate,
  } = req.body;

  if (
    !donorid ||
    !fullname ||
    !nic ||
    !dateofbirth ||
    !gender ||
    !address ||
    !bloodtype ||
    !contactno ||
    !email ||
    !preblddntdate ||
    !createDate
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }

  try {
    const newDonor = await Donor.create(req.body);
    return res
      .status(201)
      .json({ success: true, message: "Donor created successfully", newDonor });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// @desc    Update a donor by donorid
// @route   PUT /api/donor/:donorid
// @access  Public
export const updateDonor = async (req, res) => {
  const { donorid } = req.params;

  try {
    const updatedDonor = await Donor.findOneAndUpdate({ donorid }, req.body, {
      new: true,
    });

    if (!updatedDonor) {
      return res
        .status(404)
        .json({ success: false, message: "Donor not found" });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Donor updated successfully",
        updatedDonor,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// @desc    Delete a donor by donorid
// @route   DELETE /api/donor/:donorid
// @access  Only Admin
export const deleteDonor = async (req, res) => {
  const { donorid } = req.params;

  try {
    const deletedDonor = await Donor.findOneAndDelete({ donorid });

    if (!deletedDonor) {
      return res
        .status(404)
        .json({ success: false, message: "Donor not found" });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Donor deleted successfully",
        deletedDonor,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};


// @desc    Get number of donors for each month
// @route   GET /api/donor/getMonthlyDonors
// @access  Public (consider adding authentication if needed)
export const getMonthlyDonors = async (req, res) => {
  try {
    // You'll need to modify this logic based on your database schema and desired output format
    // Here's an example using aggregation pipeline (assuming a 'donationDate' field):
    const pipeline = [
      {
        $project: {
          month: { $month: "$createDate" }, // Extract month from donationDate
        },
      },
      {
        $group: {
          _id: "$month", // Group by month
          count: { $sum: 1 }, // Count documents in each month group
        },
      },
    ];

    const monthlyDonors = await Donor.aggregate(pipeline);

    return res.status(200).json({ success: true, monthlyDonors });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};
