const express = require('express');
const bodyparser = require('body-parser');
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

app.use(logger);
app.use('/', router);

app.get('/', (req, res) => {
    res.send('Hello there from home!');
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = app;