const express = require('express');
const router = express.Router();

router.use('/users', require('./api/users'));
// router.post('/users/login', auth.login);

router.get('/', (req, res) => {
    res.status(200).json({message: 'Hello there from home!'});
});

module.exports = router;