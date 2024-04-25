import express from 'express'
import { verifyToken } from "../utils/verifyUser.js";
import { createDonor, deleteDonor, getDonorById, getDonors, updateDonor } from '../controller/donorController.js';

const router = express.Router();

router.get('/getdonors', getDonors);
router.get('/getdonor/:donorid', getDonorById);
router.post('/createdonor', verifyToken, createDonor);
router.put('/updatedonor/:donorid', verifyToken, updateDonor);
router.delete('/deletedonor/:donorid', verifyToken, deleteDonor);

export default router;
