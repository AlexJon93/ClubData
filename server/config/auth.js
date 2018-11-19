const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var logger = require('../config/logger');
var UserInstance = require('../models/User');

function getTokenFromHeader (req) {
    // logger.debug(JSON.stringify(req.headers));
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

exports.login = (req, callback) => {
    logger.verbose('Checking login details');
    if(!req.body.email || req.body.email === undefined) {
        logger.debug('Email is undefined or null');
        callback({status: 400, message: 'Login details missing'});
        return;
    }

    UserInstance.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                logger.debug('Did not find user with given email');
                callback({status: 404, message: 'User with email ' + req.body.email + ' not found'});
            } else {
                logger.debug('Found user with given email');
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    logger.verbose('Checking user password');
                    if(err) {
                        logger.error(err);
                        callback({status: 500, message: 'Error logging in'});
                    } else {
                        if(result) {
                            logger.debug('User password is valid');
                            var token = jwt.sign({
                                user: user.email,
                                exp: Math.floor(new Date().getTime()/1000) + (60*60)
                            }, process.env.JWT_KEY);
                            logger.debug('Sending token to callback');
                            callback({
                                token: token,
                            });
                        } else {
                            logger.debug('User password is not valid');
                            callback({status: 404, message: 'Email address or password is incorrect'});
                        }
                    }
                });
            }
        })
}
