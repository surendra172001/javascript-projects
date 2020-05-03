//jshint esversion:6

require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
const encrypt = require('mongoose-encryption');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false});


const userSchema = new mongoose.Schema({
    email : String,
    password : String
});

const secret = process.env.SECRET;
userSchema.plugin(encrypt, { secret: secret , encryptedFields: ['password'] });

const User = mongoose.model("User", userSchema);


app.route("/")
.get(function(req, res){
    res.render("home");
});

app.route("/login")
.get(function(req, res){
    res.render("login");
})
.post(function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email : username}, function(err, foundUser) {
        if(err) {
            console.log(err);
        } else if(foundUser.password === password) {
            res.render("secrets");
        }
    });
});

app.route("/register")
.get(function(req, res){
    res.render("register");
})
.post(function(req, res) {
    const newUser = new User({
        email : req.body.username,
        password : req.body.password
    });
    newUser.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.render("secrets");
        }
    });
});

app.get("/logout", function(req, res) {
    res.render("home");
});


const port = 3000;

app.listen(port, function() {
  console.log(`app started successfully on port: ${port}`);
});
