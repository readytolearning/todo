var databaseUrl = "mongodb://localhost:27017/test"
var collections = ["models", "items"];

var ObjectId = require("C:/Users/P.Venkatesh/node_modules/mongodb").ObjectID;
var db = require("C:/Users/P.Venkatesh/node_modules/mongojs").connect(databaseUrl, collections);

var express = require('C:/Users/P.Venkatesh/node_modules/express');


var app = express();
var fs = require("fs");
//app.use(express.bodyParser());
/*
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
*/


app.get('/listUsers/:objectName', function(req, res) {
    var usersObj;
    console.log(req.params.objectName);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.models.find({
        model_for: req.params.objectName
    }, function(err, users) {
        if (err) throw err;
        usersObj = users;
        // object of all the users
        console.log(usersObj);
        res.send(usersObj);
    });
    //	return exString;
});

// Loading using modelId
app.get('/itemsUnderModel/:modelId', function(req, res) {
    var usersObj;
    console.log(req.params.modelId);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.items.find({
        model_id: req.params.modelId
    }, function(err, users) {
        if (err) throw err;
        usersObj = users;
        // object of all the users
        console.log(usersObj);
        res.send(usersObj);
    });
    //	return exString;
});

// Loading using ItemId
app.get('/showItem/:Itemid', function(req, res) {
    var usersObj;
    console.log(req.params.Itemid);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.items.find(ObjectId(req.params.Itemid), function(err, users) {
        if (err) throw err;
        usersObj = users;
        // object of all the users
        console.log(usersObj);
        res.send(usersObj);
    });
    //	return exString;
});

// Loading using ItemId

app.post("/getIteamsByIds/:items", function(request, response) {
  //  console.log(request.body.name);
    var itemIds = JSON.parse(request.params.items);
    var ObjectIdsList = [];
    for (i = 0; i < itemIds.length; i++) {
        ObjectIdsList.push(ObjectId(itemIds[i]));
    };

    //var arr1 = itemIds.split(',')
    response.header('Access-Control-Allow-Origin', "*");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    db.items.find({
        _id: {
            $in: ObjectIdsList
        }
    }, function(err, itemObj) {
        if (err) throw err;
        itemObjVal = itemObj;
        // object of all the users
      //  console.log(itemObjVal);
        response.send(itemObjVal);
    });
    console.log("Ok");
});




var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

});
