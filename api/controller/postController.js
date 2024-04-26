
// @desc    Get campaigns
// @route   GET /api/getCampaigns
// @access  Only Admin
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();

    // Count total number of posts in the database
    const totalCampaigns = await Campaign.countDocuments();

    return res.status(200).json({ success: true, campaigns, totalCampaigns });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// @desc    Get campaign by campaignID
// @route   GET /api/getCampaign/:campaignID
// @access  Only Admin
export const getCampaignById = async (req, res) => {
  const { campaignID } = req.params;

  try {
    const campaign = await Campaign.findOne({ campaignID });
    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }
    return res.status(200).json({ success: true, campaign });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// @desc    Create a new campaign
// @route   POST /api/createCampaign
// @access  Only Admin
export const createCampaign = async (req, res) => {

    // Check if the user making the request is an admin
  if (!req.user.isAdmin) {
    // If not an admin, return a 403 Forbidden error
    return next(errorHandler(403, "You are not allowed to create a blog post"));
  }

  // Check if the required fields (title and content) are provided in the request body
  const {
    campaignID,
    campaignName,
    location,
    date,
    organization,
    requirements,
} = req.body;

if (!campaignID || !campaignName || !location || !date || !organization || !requirements) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
}

  try {
    const newCampaign = await Campaign.create(req.body);
    return res.status(201).json({ success: true, message: "Campaign created successfully", newCampaign });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// @desc    Update a campaign by campaignID
// @route   PUT /api/campaign/:campaignID
// @access  Only Admin
export const updateCampaign = async (req, res) => {
  const { campaignID } = req.params;

  try {
    const updateCampaign = await Campaign.findOneAndUpdate({ campaignID }, req.body, { new: true });

    if (!updateCampaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    return res.status(200).json({ success: true, message: "Campaign updated successfully", updateCampaign });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// @desc    Delete a campaign by campaignID
// @route   DELETE /api/campaign/:campaignID
// @access  Only Admin
export const deleteCampaign = async (req, res) => {
    const { campaignID } = req.params;
  
    try {
      const deleteCampaign = await Campaign.findOneAndDelete({ campaignID });
  
      if (!deleteCampaign) {
        return res.status(404).json({ success: false, message: "Campaign not found" });
      }
  
      return res.status(200).json({ success: true, message: "Campaign deleted successfully", deleteCampaign });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  };