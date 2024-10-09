const User = require('../models/User');
const Assignment = require('../models/Assignment');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).send('Invalid credentials');
        }
        res.status(200).send('User logged in successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.uploadAssignment = async (req, res) => {
    const { task, admin } = req.body;
    try {
        const newAssignment = new Assignment({
            userId: req.user.username, // This assumes that req.user is populated from some kind of auth middleware
            task,
            admin
        });
        await newAssignment.save();
        res.status(201).send('Assignment uploaded successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
};
