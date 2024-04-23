import express  from 'express'
import { test } from '../controller/userController.js';

// Create a router instance using Express's Router class
const router = express.Router();

// Define a route handler for GET requests to '/test'
router.get('/test', test);


// Export the router to be used in other files
export default router;