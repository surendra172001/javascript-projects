
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");

let items = ["Awesome", "Awesome", "Awesome"];
let workItems = [];

app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    let day = today.toLocaleDateString("hi-IN", options);
    let pageName = '/';

    res.render('list', {listTitle : day, eitems : items, epageName : pageName});
});


app.post('/', function(req, res){
    let item = req.body.newItem;
    items.push(item);
    res.redirect('/');
});


app.get('/work', function(req, res){
    let pageName = '/work';
    res.render('list', {listTitle : 'Work day', eitems : workItems,  epageName : pageName});
});


app.post('/work', function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
});



// app.get('/home', function(req, res){
//     res.send("home");
// });

// app.post('/home', function(req, res){
//     console.log(req.body);
// });

port = 8080;
app.listen(port, function() {
    console.log('App listening on port ' + port);
});