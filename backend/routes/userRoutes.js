const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateRegistration, validateLogin, validateAssignmentUpload } = require('../middleware/validateMiddleware');

// Route to register a new user
router.post('/register', validateRegistration, userController.register);

// Route for user login
router.post('/login', validateLogin, userController.login);

// Route for users to upload assignments, requires authentication
router.post('/upload', authenticateToken, validateAssignmentUpload, userController.uploadAssignment);

module.exports = router;
