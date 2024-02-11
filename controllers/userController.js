const User = require('../models/User');

exports.showCreateUser = (req, res) => {
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have permission to access this route'
    });
  }
  res.render('createUser',{ role: req.session.user.role});
};


exports.createUser = async (req, res) => {
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have permission to access this route'
    });
  }

  // Create a new instance of the User model with the data from the request body
  const user = new User(req.body);

  // Save the new user to the database
  await user.save();

  res.redirect('/dashboard/users');
};



exports.showUsers = async (req, res) => {
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have permission to access this route'
    });
  }
  const users = await User.find();
  res.render('users', { users, role: req.session.user.role  });
};

exports.editUser = async (req, res) => {
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have permission to access this route'
    });
  }
  const user = await User.findById(req.params.id);
  res.render('editUser', { user, role: req.session.user.role });
};

exports.updateUser = async (req, res) => {
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have permission to access this route'
    });
  }

  // Find the user by id
  const user = await User.findById(req.params.id);

  // Update the user's fields
  user.username = req.body.username;
  if (req.body.password) {
    user.password = req.body.password;
  }
  user.role = req.body.role;
  // Save the user
  await user.save();

  res.redirect('/dashboard/users');
};




exports.deleteUser = async (req, res) => {
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have permission to access this route'
    });
  }
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/dashboard/users');
};