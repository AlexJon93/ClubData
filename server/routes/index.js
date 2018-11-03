const express = require('express');
const router = express.Router();

// var userController = require('../controllers/userController');

router.use((req, res, next) => {
    const token = req.headers['x-access-token'];
});

router.use('/users', require('./api/users'));

router.get('/', (req, res) => {
    res.status(200).json({message: 'Hello there from home!'});
});

module.exports = router;