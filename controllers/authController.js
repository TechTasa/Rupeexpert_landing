const User = require('../models/User');

exports.signup = async (req, res) => {
  const { username, password,role } = req.body;
  const lowerCaseUsername = username.toLowerCase();
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ username: lowerCaseUsername });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists'
      });
    }
    const user = await User.create({ username: lowerCaseUsername, password ,role});
    // req.session.user = user;
    res.redirect('dashboard/leads');
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const lowerCaseUsername = username.toLowerCase();
  try {
    const user = await User.findOne({ username: lowerCaseUsername });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    const isCorrect = await user.checkPassword(password);
    if (!isCorrect) {
      return res.status(400).json({
        status: 'error',
        message: 'Incorrect username or password'
      });
    }
    req.session.user = user;
    res.redirect('/dashboard/overview')
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};
