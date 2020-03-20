const express = require('express');

const app = express();

app.get("/", function(req, res) {
    res.send("<h1>This is my home page</h1>");
});

app.get("/about", function(req, res) {
    res.send("<h1>Hi, There everyone my name is Surendra Pandey</h1>");
});

app.get("/index", function(req, res) {
    res.sendFile("C:/Users/surendra/Desktop/my_files/customer_user_interface_project/au_tuts/node_js/my-server/index.html");
});

app.get("/calculate", function(req, res) {
    res.sendFile("C:/Users/surendra/Desktop/my_files/customer_user_interface_project/au_tuts/node_js/my-server/index.html");
});


const port = 8080;

app.listen(port, function() {
    console.log("server started listening on port: " + port);
});