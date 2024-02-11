const Loan = require('../models/Loan');


exports.showOverview = async (req, res) => {
  try {
    const totalLeads = await Loan.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const totalLeadsToday = await Loan.countDocuments({
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    });
    res.render('overview', { totalLeads, totalLeadsToday });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};


exports.showLeads = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 100;  
    const skip = (page - 1) * limit;

    const loans = await Loan.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Loan.countDocuments();

    res.render('leads', { loans, page, pages: Math.ceil(total / limit),role: req.session.user.role });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};


exports.searchLeads = async (req, res) => {
  try {
    const query = req.query.q;
    const dateQuery = req.query.date;
    let searchCondition = { 
      $or: [
        { fullName: new RegExp(query, 'i') },
        { contactNo: new RegExp(query, 'i') }
      ]
    };
    if (dateQuery) {
      const date = new Date(dateQuery);
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      searchCondition.createdAt = {
        $gte: date,
        $lt: nextDate
      };
    }
    const loans = await Loan.find(searchCondition);

    const page = req.query.page || 1;
    const limit = 100;
    const total = await Loan.countDocuments(searchCondition);

    res.render('leads', { loans, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    }); 
  }
};
