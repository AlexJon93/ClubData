const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const port = 5000;

var app = express();
app.enable('trust proxy');

var router = require('./routes/index');
var logger = (req, res, next) => {
    var ip = req.ip;
    var date = new Date();

    console.log('request received at ' + date.toUTCString() + ' from ' + ip + ' for ' + req.path);
    
    next();
};

// app.use(express.static(path.join(__dirname, './client')));
app.use(logger);
// app.use('/', express.static(path.join(__dirname, './client/public')));
app.use('*', router);

app.use((req, res, next) => {
    var err = new Error('404 - File Not Found!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
    console.log('\t' + req.path + ' does not exist 404');
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = app;