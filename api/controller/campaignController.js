import Campaign from "../models/campaignModel.js"

export const addCampaign = async (req, res) => {
    try {
        const { campaignID, campaignName, location, date, org, req } = req.body
        
        const newCampaign = new Campaign({
            campaignID, campaignName, location, date, org, req
        })
        await newCampaign.save()
        res.status(200).json({success:true, message:'Campaign added successfully!', newCampaign})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

export const getCampaign = async(req, res) => {
    try {
        const campaign = await Campaign.find()
        if(!campaign) {
            return res.status(404).json({success:false, message:'Campaign not found!'})
        }
        res.status(200).json({success:true, campaign})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

export const updateCampaign = async(req, res) => {
    try {
        const campaignID = req.params.id
        const updateCampaign = await Campaign.findByIdAndUpdate(campaignID, req.body, {new:true})

        if(!updateCampaign) {
            return res.status(404).json({success:false, message:'Campaign not found!'})
        }
        res.status(200).json({success:true, message:'Campaign Updated Successfully!', updateCampaign})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

export const deleteCampaign = async (req, res) => {
    try {
        const campaignID = req.params.id
        const deleteCampaign = await Campaign.findByIdAndDelete(campaignID)
        
        if(!deleteCampaign) {
            return res.status(404).json({success:false, message:'Campaign not found!'})
        }
        res.status(200).json({success:true, message:'Campaign Deleted Successfully!', deleteCampaign})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

export const getUpdateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id)
        if(!campaign) {
            return res.status(404).json({success:false, message:'Campaign not found!'})
        }
        res.status(200).json({success:true, campaign})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

