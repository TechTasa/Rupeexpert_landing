const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/signup', (req, res) => {
    res.render('signup');
  });
  
router.get('/login', (req, res) => {
    res.render('login');
  });
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.redirect('/loan/apply');
      }
      res.clearCookie('sid');
      res.redirect('/auth/login');
    });
  });
  
  
module.exports = router;
