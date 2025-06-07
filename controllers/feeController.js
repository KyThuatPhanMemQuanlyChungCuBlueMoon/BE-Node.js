const Fee = require('../models/feeModel');

// @desc    Get all fees
// @route   GET /api/fees
// @access  Private
exports.getFees = async (req, res) => {
  try {
    const fees = await Fee.find().sort({ createdAt: -1 });
    res.json(fees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single fee
// @route   GET /api/fees/:id
// @access  Private
exports.getFeeById = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    
    if (!fee) {
      return res.status(404).json({ message: 'Fee not found' });
    }
    
    res.json(fee);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Fee not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a fee
// @route   POST /api/fees
// @access  Private/Admin
exports.createFee = async (req, res) => {
  try {
    const { 
      feeCode,
      name, 
      description, 
      amount, 
      feeType, 
      startDate,
      endDate
    } = req.body;
    
    // Check if fee already exists
    const feeExists = await Fee.findOne({ feeCode });
    
    if (feeExists) {
      return res.status(400).json({ message: 'A fee with this code already exists' });
    }
    
    const fee = await Fee.create({
      feeCode,
      name,
      description,
      amount,
      feeType,
      startDate,
      endDate
    });
    
    res.status(201).json(fee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};