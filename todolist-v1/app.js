
const express = require("express");

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true })

let items = ["Awesome", "Awesome", "Awesome"];

app = express();

app.set('view engine', 'ejs');

app.use(urlencodedParser);
app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res){

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    let day = today.toLocaleDateString("hi-IN", options);

    res.render('list', {eday : day, eitems : items});
});

app.post('/', function(req, res){
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
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