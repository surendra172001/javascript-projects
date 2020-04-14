
const express = require('express');

const bodyParser = require('body-parser');

const superagent = require('superagent');

app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
    res.sendFile("C:/Users/surendra/Desktop/my_files/customer_user_interface_project/au_tuts/node_js/bit-coin-ticker/index.html");
});

app.post("/", function(req, res) {
    superagent
    .get("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD")
    .then(
        res => {
            console.log(res.statusCode);
    })
    .catch(err => {
        console.log("Error");
        // console.log(err);
     });
});



// request
// .get('/search')
// .then(res => {
//    // res.body, res.headers, res.status
// })




const port = 8080;

app.listen(port, function() {
    console.log("app started listening on " + port);
});

// 1579219200