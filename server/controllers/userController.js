var UserInstance = require('../models/User');

exports.create = (req, res) => {

    const user = new UserInstance({
        userId: req.body.userId,
        club: req.body.club,
        password: req.body.password
    });

    user.save()
        .then(user => {
            return res.status(200).json({message: 'User created successfully'});
        }).catch(err => {
            return res.status(400).json({message: 'Could not create user'});
        });
}

exports.getAll = (req, res) => {
    UserInstance.find()
        .then(users => {
            if(!users) {
                return res.status(404).json({message: 'No users found'});
            }
            else {
                return res.status(200).json(users);
            }
        }).catch(err => {
            return res.status(500).json({message: 'Error getting users'});
        })
}

exports.getOne = (req, res) => {
    UserInstance.findOne({userId: req.params.userId})
        .then(user => {
            if(!user) {
                return res.status(404).json({message: 'User with id ' + req.params.userId + ' not found'});
            }
            else {
                return res.status(200).json(user);
                // {message: 'User with id ' + user.userId + ' from ' + user.club + ' found'}
            }
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).json({message: 'User with id ' + req.params.userId + ' not found'});
            }
            return res.status(500).json({message: 'Error getting user with id ' + req.params.userId});
        });
};

exports.delete = (req, res) => {
    UserInstance.findOneAndDelete({userId: req.params.userId})
        .then(user => {
            if(!user) {
                return res.status(404).json({message: 'User with id ' + req.params.userId + ' not found'});
            }
            else {
                return res.status(200).json(user)
            }
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).json({message: 'User with id ' + req.params.userId + ' not found'});
            }
            return res.status(500).json({message: 'Error deleting user with id ' + req.params.userId});
        })
}