const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const protectedController = require('../controllers/protectedController');

// Protected route
router.get('/protected', authenticateToken, protectedController.protectedRoute);

module.exports = router;