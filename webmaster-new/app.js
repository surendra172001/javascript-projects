var express= require('express')
var app= express()
var body= require('body-parser')
var http= require('http')
var mongoose= require('mongoose')
const storage = require('node-sessionstorage')
var html = require('html')

app.use(body.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/shopsiteDB", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).catch(error => handleError(error));
mongoose.set('useFindAndModify', false);

var itemschema = new mongoose.Schema({
    itemname: String,
    expiryperiod: String,
    quantity: String,
    description: String,
    shopname: String,  
    owner : String,
    latitude: Number,
    longitude: Number
})

var ownerschema=new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    shopname: String,
    latitude: Number,
    longitude: Number,
    items: [itemschema]
})
var customerschema = new mongoose.Schema({
    name: String,
    phone: String,
    username: String,
    password: String
})

var messageschema = new mongoose.Schema({
    sender: String,
    receiver: String,
    message: String
})

var itemmodel= mongoose.model("itemmodel",itemschema)
var ownermodel= mongoose.model("ownermodel", ownerschema)
var customermodel = mongoose.model("customermodel", customerschema)
var messagemodel = mongoose.model("messagemodel", messageschema)


app.get("/", function(req, res){
    res.render("home");
});

app.get("/contact", function(req, res){
    res.render("partials/contact");
});

app.get("/about", function(req, res){
    res.render("partials/about");
});

app.get("/login", function(req, res){
    res.render("login");
})

app.get("/register", function(req, res){
    res.render("register");
})


app.get("/:ownid/additem", function(req, res){
    ownermodel.findById(req.params.ownid, function (err, owner) {
        if (err) {
            console.log(err)
        }
        else {
            res.render("additem", { owner: owner })
        }
    })
})

app.get("/ownerhome/:id", function (req, res){
    ownermodel.findById(req.params.id, function(err, owner){
        if (err) {
            console.log(err)
        }
        else{
            res.render("ownerhome", {own:owner})
        }
    })
})
app.get("/customerhome/:id", function (req, res) {
    customermodel.findById(req.params.id, function (err, customer) {
        if (err) {
            console.log(err)
        }
        else {
            var lat = storage.getItem('lat')
            var lon = storage.getItem('lon')
            res.render("customerhome", { cus: customer , lat: lat, lon: lon })
        }
    })
})

app.get("/registerowner", function (req, res){
    try {
        res.render("registerowner");
  } catch (err) {
    next(err);
  }
    // res.render("registerowner")
})

app.get("/registercustomer", function (req, res){
    res.render("registercustomer")
})



app.get("/:ownid/:itemid/edititem", function(req, res){
    var a= req.params.itemid;
    var b= req.params.ownid;
    ownermodel.findById(b, function(err, owner){
        if(err)
        {
            console.log(err)
        }
        else{
            owner.items.forEach(function (item) { 
                if(item._id == a)
                {
                    res.render("edititem",{item:item, owner:owner})
                }
            })
        } 
    })
})

// app.get("/:cusid/location", function(req, res){
//     var cus= req.params.cusid;
//     storage.setItem('customer',cus);
//     res.sendFile("C:/Users/admin/Desktop/projects/web/views/homepage.html")
// })

app.get("/:userid/showmessages", function (req, res) {
    var a = req.params.userid;
    loginmodel.findById(a, function (err, user) {
        if (err) {
            console.log(err)
        }                  
        messagemodel.find({ receiver: user.name }, function (err, transaction) {                              // messages
            if (err) {
                console.log(err)
            }
            else {
                res.render("showmessages", { transaction: transaction })
            }
        })
    })
})

app.post("/customer", function(req, res){
    var na = req.body.name
    var ph = req.body.phone
    var us = req.body.username
    var pa = req.body.password
    
    var newcustomer = { name: na, phone: ph, username: us, password: pa}
    customermodel.create(newcustomer, function (err, customer){
        if (err){
            console.log(err)
        }
        else{
            res.redirect("/login")
        }
    })
})

app.post("/owner", function(req, res){
    var n=req.body.name
    var em = req.body.email
    var us = req.body.username                                                                      // owner creation
    var pa = req.body.password
    var sa = req.body.address
    var sn = req.body.shopname;
    var lat = req.body.latitude;
    var lon = req.body.longitude;
    var newowner={name: n, email: em, username: us, password: pa, address: sa, shopname: sn, latitude : lat, longitude: lon}
    ownermodel.create(newowner, function(err, owner){
        if(err)
        {
            console.log(err)
        }
        else{
            res.redirect("/login")
        }
    })
})

app.post("/login",function(req, res){
    var us=req.body.username;
    var pass= req.body.password;
    if(req.body.type=="customer")
    {
        customermodel.findOne({username: us}, function(err, customer){
            if(pass == customer.password)
            {
                a = customer._id;
                storage.setItem('customer', a)
                res.redirect("/customerhome/"+a);
            }
            else if (p != customer.password){
                res.redirect("/login")
            }
            else {
                res.redirect("/register")                                                                     // login
            }
        })
    }
    else if (req.body.type == "shopowner"){
        ownermodel.findOne({ username: us }, function(err, owner){
            if (pass == owner.password){
                a= owner._id;
                res.redirect("/ownerhome/"+a)
            }
            else if (p != owner.password){
                res.redirect("/login")
            }
            else {
                res.redirect("/register") 
            }
        })
    }
    else{
        res.redirect("/login") 
    }
})

app.post("/:id/additem", function(req, res){
    var a= req.params.id;
    
    ownermodel.findById(a , function(err, user){
        if(err)
        {
            console.log(err);                                                             //  add item
        }
        else{
            var na = req.body.itemname;
            var ep = req.body.expiryperiod;                                                   
            var q = req.body.quantity;
            var desc = req.body.description;
            var owner = user.name;
            var sp= user.shopname;
            var lat= user.latitude;
            var lon= user.longitude;

            var newitem = { itemname: na, expiryperiod: ep, quantity: q, description: desc, owner : owner, shopname: sp, latitude: lat, longitude: lon};
            user.items.push(newitem);
            user.save(function(err, user){
                if(err){
                    console.log(err)
                }
                else{
                    itemmodel.create(newitem, function(err, item){
                        if(err)
                        {
                            console.log(err)
                        }
                        else{
                            res.redirect("/ownerhome/" + a);
                        }
                    })
                }
            }) 
        }
    })
})


app.post("/:ownid/:itemid/edit", function(req,res){
    var a = req.params.itemid;
    var b = req.params.ownid;
    ownermodel.findById(b, function (err, owner) {
        if (err) {
            console.log(err)
        }
        else {
            owner.items.forEach(function (item) {
                if (item._id == a) {
                    var eitem = item.itemname;
                    item.itemname = req.body.itemname;
                    item.expiryperiod = req.body.expiryperiod;                              // edit item
                    item.quantity = req.body.quantity;
                    item.description = req.body.description;
                    owner.save(function(err){
                        if(err)
                        {
                            console.log(err)
                        }
                    })
                    
                    itemmodel.findOne({itemname: eitem , owner: owner.name}, function(err, item){
                        if(err)
                        {
                            console.log(err)
                        }
                        else{
                            item.itemname = req.body.itemname;
                            item.expiryperiod = req.body.expiryperiod;                              
                            item.quantity = req.body.quantity;
                            item.description = req.body.description;
                        }
                    })
                    res.render("ownerhome",{own:owner});
                }
            })
        }
    })
})

app.post("/:cusid/search", function (req, res) {
    var b = req.body.searchitem;
    var lat = storage.getItem('lat')
    var lon = storage.getItem('lon')
    var cus= req.params.cusid
    customermodel.findById(cus , function(err, customer){
        if(err)
        {
            console.log(err)
        }
        else{
            storage.setItem('cus', customer)
        }
    })

    itemmodel.find({ itemname: b }, function (err, item) {                             //  item search
        if (err) {
            console.log("peter")
            console.log(err)
        }
        else {
            item.forEach(item => {
                var c = item.latitude;
                var d = item.longitude;
                if ((lat == item.latitude) && (lon == item.longitude)) {
                    return 0;
                }
                else {
                    
                    var radlat1 = Math.PI * lat / 180;
                    var radlat2 = Math.PI * item.latitude / 180;
                    var theta = lon - item.longitude;
                    var radtheta = Math.PI * theta / 180;
                    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                    if (dist > 1) {
                        dist = 1;
                    }
                    dist = Math.acos(dist);
                    dist = dist * 180 / Math.PI;
                    dist = dist * 60 * 1.1515;
                    dist = dist * 1.609344;
                    dist= dist.toFixed(2);
                    item.distance = dist;

                }
            })
            var cust= storage.getItem('cus')
            res.render("finditem", { la: lat, lo: lon, item: item, cus: cust })
        }
    })
})

app.post("/location", (req,res)=>{
    var lat= req.body.lat
    var lon= req.body.lon
    storage.setItem('lat', lat)
    storage.setItem('lon', lon)
    var customer= storage.getItem('customer')
    res.redirect("customerhome/" + customer);

})


app.post("/customerhome/:id", function (req, res) {
    customermodel.findById(req.params.id, function (err, customer) {
        if (err) {
            console.log(err)
        }
        else {
            res.render("customerhome", { cus: customer, lat:lat, lon: lon})
        }
    })
})

app.post("/:senderid/sendmessage", function (req, res) {
    var msg = req.body.message;
    var rcr = req.body.receiver;
    var a = req.params.senderid;
    var snr;  
    loginmodel.findById(a, function (err, sender) {                                        //  send message
        snr = sender.name;

        var newmsg = {
            sender: snr,
            receiver: rcr,
            message: msg
        }

        messagemodel.create(newmsg, function (err, msg) {
            if (err) {
                console.log(err)
            }
            else {
                res.render("welcome", { user: sender })
            }
        })
    })
})

const port = 2600;
app.listen(port, 'localhost', function(){
    console.log(`Connected to server on port ${port}`);
})



