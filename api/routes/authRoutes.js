import express from 'express';
import { signup } from '../controller/authController.js';

const router = express.Router();

router.post('/signup', signup);

// Error handling middleware
router.use((err, req, res, next) => {
    // Handle specific errors here if needed
    // For now, just return a generic error response
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

export default router;
