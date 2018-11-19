const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        lowercase: true,
        match: [/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/, 'Please provide a valid email address'],
        required: [true, 'Email address required']
    },
    club: { 
        type: String, 
        required: [true, 'Club name is required'] 
    },
    password: { 
        type: String, 
        required: [true, 'Password is required']
    }
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');