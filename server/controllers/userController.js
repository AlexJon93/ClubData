var UserInstance = require('../models/User');

exports.hello = (req, res) => {
    res.json({message: 'Hello there from usercontroller!'});
};

exports.sample_user = (req, res) => {
    res.status(200).json({
        fName: 'Joe',
        lName: 'Citizen',
        age: 23,
        studentNo: 's1234567',
        phoneNo: '0401234567',
        email: 'test@provider.com',
        studyType: 'Postgraduate',
        course: 'Masters of Sample Data',
        postcode: '1234',
        member: false
    })
}