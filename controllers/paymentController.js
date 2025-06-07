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

// @desc    Create a payment
// @route   POST /api/payments
// @access  Private/Admin/Accountant
const createPayment = asyncHandler(async (req, res) => {
  const {
    fee,
    household,
    amount,
    paymentDate,
    payerName,
    payerId,
    payerPhone,
    receiptNumber,
    note,
    period
  } = req.body;

  // Check if fee exists
  const feeExists = await Fee.findById(fee);
  if (!feeExists) {
    res.status(404);
    throw new Error('Fee not found');
  }

  // Check if household exists
  const householdExists = await Household.findById(household);
  if (!householdExists) {
    res.status(404);
    throw new Error('Household not found');
  }

  // Determine the period if not provided (default to current month)
  let paymentPeriod = period;
  if (!paymentPeriod) {
    const paymentDate = new Date();
    paymentPeriod = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), 1);
  } else if (typeof paymentPeriod === 'string') {
    paymentPeriod = new Date(paymentPeriod);
  }

  // Check if payment already exists for this fee, household and period
  const paymentExists = await Payment.findOne({
    fee,
    household,
    period: {
      $gte: new Date(paymentPeriod.getFullYear(), paymentPeriod.getMonth(), 1),
      $lt: new Date(paymentPeriod.getFullYear(), paymentPeriod.getMonth() + 1, 1)
    }
  });

  if (paymentExists) {
    res.status(400);
    throw new Error('A payment for this fee already exists for this household in the specified period');
  }

  const payment = await Payment.create({
    fee,
    household,
    amount: amount || feeExists.amount,
    paymentDate: paymentDate || Date.now(),
    payerName,
    payerId,
    payerPhone,
    receiptNumber,
    collector: req.user._id, // User who created the payment
    note,
    period: paymentPeriod,
    status: 'paid'
  });

  // Populate the new payment with fee and household details
  const populatedPayment = await Payment.findById(payment._id)
    .populate('fee', 'name feeType amount')
    .populate('household', 'apartmentNumber')
    .populate('collector', 'name');

  res.status(201).json(populatedPayment);
});

// @desc    Update a payment
// @route   PUT /api/payments/:id
// @access  Private/Admin/Accountant
const updatePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (payment) {
    payment.status = req.body.status || payment.status;
    payment.paymentDate = req.body.paymentDate || payment.paymentDate;
    payment.amount = req.body.amount || payment.amount;
    payment.method = req.body.method || payment.method;

    const updatedPayment = await payment.save();
    res.json(updatedPayment);
  } else {
    res.status(404);
    throw new Error('Payment not found');
  }
});