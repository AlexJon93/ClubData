const express = require('express');
const bodyparser = require('body-parser');
const port = 5000;

var app = express();
app.enable('trust proxy');

var logger = (req, res, next) => {
    var ip = req.ip;
    var date = new Date();

    console.log('request received at ' + date.toUTCString() + ' from ' + ip);
    
    next();
};

app.use(logger);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});