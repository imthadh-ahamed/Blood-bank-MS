import express from 'express';
import { addCampaign, deleteCampaign, getCampaign, getUpdateCampaign, updateCampaign } from '../controller/campaignController.js';

const router = express.Router();

// Route to add a new campaign
router.post('/addCampaign', addCampaign);

// Route to get all campaigns
router.get('/getCampaign', getCampaign);

// Route to update a campaign by ID
router.put('/updateCampaign/:id', updateCampaign);

// Route to delete a campaign by ID
router.delete('/deleteCampaign/:id', deleteCampaign);

// Route to get details of a campaign for updating
router.get('/getUpdateCampaign/:id', getUpdateCampaign);

export default router;
