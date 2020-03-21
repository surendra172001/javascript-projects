
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//#################################################
//#################################################

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    let result = num1 + num2;
    res.send("The result of the calculation is " + result);

});



//#################################################
//#################################################
app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
});


app.post("/bmicalculator", function(req, res) {
    let weight = Number(req.body.weight);
    let height = Number(req.body.height);
    let result = weight/(height ** 2);
    result = result.toPrecision(4);
    res.send("Your BMI is " + result);
});


let port = 8080;

app.listen(port, function(){
    console.log("Server started listening on port: " + port);
});
