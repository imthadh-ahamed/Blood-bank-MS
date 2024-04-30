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
    !preblddntdate
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


export const getMonthlyDonors = async (req, res) => {
  try {
    const monthlyDonors = await Donor.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month of creation
          count: { $sum: 1 }, // Count the number of donors in each month
        },
      },
      { $sort: { _id: 1 } }, // Sort by month (ascending order)
    ]);

    return res.status(200).json({ success: true, monthlyDonors });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
