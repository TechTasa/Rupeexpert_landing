const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authMiddleware=require('../middlewares/authMiddleware')


const router = express.Router();


router.get('/leads', authMiddleware.isLoggedIn, dashboardController.showLeads);
router.get('/overview', authMiddleware.isLoggedIn, dashboardController.showOverview);
router.get('/search', authMiddleware.isLoggedIn, dashboardController.searchLeads);
module.exports = router;