const Resident = require('../models/residentModel');
const Household = require('../models/householdModel');

// @desc    Get all residents
// @route   GET /api/residents
// @access  Private
exports.getResidents = async (req, res) => {
  try {
    const residents = await Resident.find()
      .populate('household', 'apartmentNumber');
    
    res.json(residents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single resident
// @route   GET /api/residents/:id
// @access  Private
exports.getResidentById = async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id)
      .populate('household', 'apartmentNumber address');
    
    if (!resident) {
      return res.status(404).json({ message: 'Resident not found' });
    }
    
    res.json(resident);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Resident not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};
