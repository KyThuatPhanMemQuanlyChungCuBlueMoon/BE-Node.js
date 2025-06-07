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
// @desc    Update a fee
// @route   PUT /api/fees/:id
// @access  Private/Admin
exports.updateFee = async (req, res) => {
  try {
    const { 
      feeCode,
      name, 
      description, 
      amount, 
      feeType,
      startDate,
      endDate,
      active
    } = req.body;
    
    const fee = await Fee.findById(req.params.id);
    
    if (!fee) {
      return res.status(404).json({ message: 'Fee not found' });
    }
    
    // If updating feeCode, check it's not already in use
    if (feeCode && feeCode !== fee.feeCode) {
      const feeCodeExists = await Fee.findOne({ feeCode });
      if (feeCodeExists) {
        return res.status(400).json({ message: 'Fee code already in use' });
      }
    }
    
    // Update fields
    fee.feeCode = feeCode || fee.feeCode;
    fee.name = name || fee.name;
    fee.description = description !== undefined ? description : fee.description;
    fee.amount = amount !== undefined ? amount : fee.amount;
    fee.feeType = feeType || fee.feeType;
    fee.startDate = startDate || fee.startDate;
    fee.endDate = endDate || fee.endDate;
    fee.active = active !== undefined ? active : fee.active;
    
    const updatedFee = await fee.save();
    
    res.json(updatedFee);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Fee not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};
