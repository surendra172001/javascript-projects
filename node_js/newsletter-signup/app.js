const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const request = require('superagent');

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});


app.post('/', function(req, res) {
    console.log(req.body);
    res.end("yes");
});

let port = 8080;

app.listen(port, function() {
    console.log(`App listening on ${port}!!`); 
});

