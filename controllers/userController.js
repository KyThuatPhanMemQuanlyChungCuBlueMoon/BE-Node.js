const User = require('../models/userModel');

// Generate a dummy token (no longer using JWT)
const generateToken = (id) => {
  return "dummy-token-" + id;
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Private/Admin
exports.registerUser = async (req, res) => {
  try {
    const { username, password, fullName, role, email, phone } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      username,
      password,
      fullName,
      role,
      email,
      phone
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        email: user.email,
        phone: user.phone
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
