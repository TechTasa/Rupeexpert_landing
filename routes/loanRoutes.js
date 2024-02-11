const express = require('express');
const loanController = require('../controllers/loanController');

const router = express.Router();

router.get('/apply', loanController.showApplyForm);
router.post('/apply', loanController.apply);
module.exports = router;
