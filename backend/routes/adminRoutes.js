const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const { validateRegistration, validateLogin } = require('../middleware/validateMiddleware');

// Route to register a new admin
router.post('/register', validateRegistration, adminController.register);

// Route for admin login
router.post('/login', validateLogin, adminController.login);

// Route for admin to view all assignments tagged to them, requires being logged in and being an admin
router.get('/assignments', authenticateToken, isAdmin, adminController.viewAssignments);

// Route for admin to accept an assignment, requires being logged in and being an admin
router.post('/assignments/:id/accept', authenticateToken, isAdmin, adminController.acceptAssignment);

// Route for admin to reject an assignment, requires being logged in and being an admin
router.post('/assignments/:id/reject', authenticateToken, isAdmin, adminController.rejectAssignment);

module.exports = router;
