const express = require('express');
const router = express.Router();

var userController = require('../controllers/userController');

router.get('/user', userController.hello);

module.exports = router;