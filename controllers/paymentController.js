const Payment = require('../models/paymentModel');
const Fee = require('../models/feeModel');
const Household = require('../models/householdModel');
const asyncHandler = require('express-async-handler');

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find()
    .populate('fee', 'name feeType amount')
    .populate('household', 'apartmentNumber')
    .sort({ paymentDate: -1 });

  res.json(payments);
});

// @desc    Get single payment
// @route   GET /api/payments/:id
// @access  Private
const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id)
    .populate('fee', 'name feeType amount startDate endDate')
    .populate('household', 'apartmentNumber');

  if (!payment) {
    res.status(404);
    throw new Error('Payment not found');
  }

  res.json(payment);
});