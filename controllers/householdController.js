const Household = require('../models/householdModel');
const Resident = require('../models/residentModel');

// @desc    Get all households
// @route   GET /api/households
// @access  Private
exports.getHouseholds = async (req, res) => {
  try {
    const households = await Household.find().populate('householdHead', 'fullName');
    res.json(households);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single household
// @route   GET /api/households/:id
// @access  Private
exports.getHouseholdById = async (req, res) => {
  try {
    const household = await Household.findById(req.params.id)
      .populate('householdHead', 'fullName dateOfBirth gender idCard');
    
    if (!household) {
      return res.status(404).json({ message: 'Household not found' });
    }
    
    res.json(household);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Household not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};