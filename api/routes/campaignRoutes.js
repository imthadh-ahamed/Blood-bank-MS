import express from "express";
import {
  createCampaign,
  deleteCampaign,
  getCampaignById,
  getCampaigns,
  updateCampaign,
} from "../controller/campaignController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/getCampaigns", getCampaigns);
router.get("/getCampaign/:campaignID", getCampaignById);
router.post("/createCampaign", verifyToken, createCampaign);
router.put("/updateCampaign/:campaignID", verifyToken, updateCampaign);
router.delete("/deleteCampaign/:campaignID", verifyToken, deleteCampaign);

export default router;
