const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/users', authMiddleware.isLoggedIn, userController.showUsers);
router.get('/users/create', authMiddleware.isLoggedIn, userController.showCreateUser);
router.post('/users/create', authMiddleware.isLoggedIn, userController.createUser);
router.get('/users/edit/:id', authMiddleware.isLoggedIn, userController.editUser);
router.post('/users/edit/:id', authMiddleware.isLoggedIn, userController.updateUser);
router.get('/users/delete/:id', authMiddleware.isLoggedIn, userController.deleteUser);
module.exports = router;
