import Donor from "../models/donorModel.js";

  // @desc    Get a all donors
  // @route   GET /api/getdonor
  // @access  Public
export const getDonors = async (req, res, next) => {
    try {
      const donors = await Donor.find();
      res.json(donors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // @desc    Get a single donor
  // @route   GET /api/getdonor/:id
  // @access  Public
  export const getDonorById = async (req, res, next) => {
    try {
      const donor = await Donor.findById(req.params.id);
      if (!donor) {
        return res.status(404).json({ message: 'Donor not found' });
      }
      res.json(donor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // @desc    Create a new donor
  // @route   POST /api/adddonor
  // @access  Public
export const createDonor = async (req, res, next) => {
    const donor = new Donor({
      name: req.body.name,
      location: req.body.location,
      designation: req.body.designation
    });
  
    try {
      const newDonor = await donor.save();
      res.status(201).json(newDonor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // @desc    Update a donor
  // @route   PUT /api/editdonor/:id
  // @access  Public
export const updateDonor = async (req, res, next) => {

    try {
      const donor = await Donor.findById(req.params.id);
      if (!donor) {
        return res.status(404).json({ message: 'Donor not found' });
      }
  
      employee.name = req.body.name || employee.name;
      employee.location = req.body.location || employee.location;
      employee.designation = req.body.designation || employee.designation;
  
      const updatedDonor = await donor.save();
      res.json(updatedDonor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // @desc    Delete a donor
  // @route   DELETE /api/deletedonor/:id
  // @access  Admin Only
export const deleteDonor = async (req, res, next) => {

    try {
      const donor = await Donor.findById(req.params.id);
      if (!donor) {
        return res.status(404).json({ message: 'Donor not found' });
      }
      await donor.remove();
      res.json({ message: 'Donor deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };