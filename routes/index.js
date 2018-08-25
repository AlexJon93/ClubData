const express = require('express');
const router = express.Router();

var userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send('Hello there from home!');
});
router.get('/user', userController.hello);

module.exports = router;