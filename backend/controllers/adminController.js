const Admin = require('../models/Admin');
const Assignment = require('../models/Assignment');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();
        res.status(201).send('Admin registered successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin || !await bcrypt.compare(password, admin.password)) {
            return res.status(401).send('Invalid credentials');
        }
        res.status(200).send('Admin logged in successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.viewAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ admin: req.admin.username });
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.acceptAssignment = async (req, res) => {
    try {
        await Assignment.findByIdAndUpdate(req.params.id, { status: 'accepted' });
        res.status(200).send('Assignment accepted');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.rejectAssignment = async (req, res) => {
    try {
        await Assignment.findByIdAndUpdate(req.params.id, { status: 'rejected' });
        res.status(200).send('Assignment rejected');
    } catch (error) {
        res.status(500).send('Server error');
    }
};
