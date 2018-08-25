var UserInstance = require('../models/User');

exports.hello = (req, res) => {
    res.send('Hello there from usercontroller!');
};