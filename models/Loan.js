const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide Full Name as per PAN Card']
  },
  contactNo: {
    type: Number,
    required: [true, 'Please provide Contact No']
  },
  occupation: {
    type: String,
    enum: ['Job', 'Business'],
    required: [true, 'Please select Occupation']
  },
  monthlyNetSalary: {
    type: Number,
    required: function() { return this.occupation === 'Job'; }
  },
  yearlyTurnover: {
    type: Number,
    required: function() { return this.occupation === 'Business'; }
  }
}, { timestamps: true });

module.exports = mongoose.model('Loan', LoanSchema);
