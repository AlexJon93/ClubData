const bcrypt = require('bcrypt');

var logger = require('../config/logger');
var UserInstance = require('../models/User');
const saltRounds = 10;


exports.create = (req, res) => {

    const user = new UserInstance({
        email: req.body.email,
        club: req.body.club,
        password: req.body.password
    });
    
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if(err) {
            logger.error(err);
            return res.status(500).json({message: "Issue saving user"});
        }
        else {
            user.password = hash;
            user.save()
                .then(user => {
                    return res.status(200).json(user);
                }).catch(err => {
                    return res.status(400).json({message: Object.values(err.errors)[0].message});
                });
        }
    })

    
}

exports.getAll = (req, res) => {
    UserInstance.find()
        .then(users => {
            if(!users) {
                return res.status(404).json({message: 'No users found'});
            }
            else {
                users.map(user => {
                    user.password = undefined;
                    return user;
                })
                return res.status(200).json(users);
            }
        }).catch(err => {
            return res.status(500).json({message: 'Error getting users'});
        })
}

exports.getOne = (req, res) => {
    const userEmail = decodeURI(req.params.email);
    UserInstance.findOne({email: userEmail})
        .then(user => {
            if(!user) {
                return res.status(404).json({message: 'User with email ' + req.params.email + ' not found'});
            }
            else {
                user.password = undefined;
                return res.status(200).json(user);
            }
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).json({message: 'User with email ' + req.params.email + ' not found'});
            }
            console.log(err);
            return;
        });
};

exports.delete = (req, res) => {
    const userEmail = decodeURI(req.params.email);
    UserInstance.findOneAndDelete({email: userEmail})
        .then(user => {
            if(!user) {
                return res.status(404).json({message: 'User with email ' + req.params.email + ' not found'});
            }
            else {
                return res.status(200).json(user)
            }
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).json({message: 'User with email ' + req.params.email + ' not found'});
            }
            return res.status(500).json({message: 'Error deleting user with email ' + req.params.email});
        })
}