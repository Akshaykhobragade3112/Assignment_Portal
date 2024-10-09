const { check, validationResult } = require('express-validator');

exports.validateRegistration = [
    check('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateLogin = [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateAssignmentUpload = [
    check('task').notEmpty().withMessage('Task description cannot be empty'),
    check('admin').notEmpty().withMessage('Admin username must be specified'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
