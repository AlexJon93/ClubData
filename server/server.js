const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

var router = require('./routes/index');

dotenv.config();

const port = 5000;
const db = process.env.MONGOLAB_URI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

var app = express();
app.enable('trust proxy');


var logger = (req, res, next) => {
    var ip = req.ip;
    var date = new Date();

    console.log('request received at ' + date.toUTCString() + ' from ' + ip + ' for ' + req.path);
    
    next();
};

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(logger);
app.use(bodyparser.json());
app.use(router);

app.use((req, res, next) => {
    var err = new Error('404 - File Not Found!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
    console.log('\t' + req.path + err.message);
    next();
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
}).on('error', console.log);

module.exports = app;