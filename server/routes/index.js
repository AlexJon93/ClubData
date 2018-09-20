const express = require('express');
const router = express.Router();

var userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.status(200).json({message: 'Hello there from home!'});
});

router.get('/user', userController.sample_user);

module.exports = router;