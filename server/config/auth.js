const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var logger = require('../config/logger');
var UserInstance = require('../models/User');

function getTokenFromHeader (req) {
    const { headers: {authorization}} = req;
    if(authorization && authorization.split(' ')[0] === 'Bearer') {
        return authorization.split(' ')[1];
    }

    return null;
}

exports.checkToken = (req, callback) => {
    logger.debug('Checking token exists');
    if((token = getTokenFromHeader(req)) !== null) {
        logger.debug('Token is not null')
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if(err) {
                logger.error(err.message);
                callback(false);
            } else {
                callback(true);
            }
        });
    } else {
        logger.debug('Token is null');
        callback(false);
    }
}

exports.login = (req, res) => {
    if(!req.body.email || req.body.email === undefined) {
        return res.status(500).json({message: 'Login details missing'});
    }

    UserInstance.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(404).json({message: 'User with email ' + req.body.email + ' not found'});
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(err) {
                        console.log(err);
                        return res.status(500).json({message: 'Error logging in'});
                    } else {
                        if(result) {
                            var token = jwt.sign({
                                user: user.email,
                                exp: Math.floor(new Date().getTime()/1000) + (60*60)
                            }, process.env.JWT_KEY);

                            return res.status(200).json({
                                token: token,
                            });
                        } else {
                            return res.status(400).json({message: 'Email address or password is incorrect'});
                        }
                    }
                });
            }
        })
}
