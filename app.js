/** import libraries */
const fs = require('fs');
const express = require('express');
const BodyParser = require( "body-parser");
const mongodb = require("mongodb");
const json2csv = require("json2csv").parse;
const app = express();
const port = 3000;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

/** specify path for front-end frameworks */
app.use(express.static("public"))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/d3', express.static(__dirname + '/node_modules/d3/dist/'));
app.use('/leaflet', express.static(__dirname + '/node_modules/leaflet/dist/'));
app.use('/vis', express.static(__dirname + '/public/modules/vis/'));


// use ejs view engine to dynamically render front-end page
app.set("view engine", "ejs")


/** Connect to MongoDB database */
const MongoClient = mongodb.MongoClient;

/**
 * collection name: test1
 * user name: datavis
 * */
const connection = 'mongodb+srv://test1:datavis@gettingstarted.kf9d9.gcp.mongodb.net/test?retryWrites=true&w=majority'


var database, collection, data;

var fields = [];


app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


MongoClient.connect(connection, {useNewUrlParser: true}, (error, client) => {
    if(error) throw error
    database = client.db("test1")
    //collection = database.collection("demo1")
    collection = database.collection("demo2")
    console.log("connected")

    app.get('/', (req, res) => {
        res.sendFile(__dirname + "/public/index.html")
    })
})


/** Router */



// create a document for a participant
app.post("/", (req, res) => {
    //console.log(req.body)
    collection.insertOne(req.body).then(result => {
        console.log("inserted.")
        //res.redirect("/")
    })
        .catch(error => console.error(error))
    console.log("Submit")
})



// update experiment data
app.put("/", (req, res) => {
    collection.findOneAndUpdate(
        {participantId: req.body.participantId},
        {
            $set: req.body
        },
        {upsert:true})
        .then(res => {
            console.log("updated.")
        })
        .catch(error => console.log(error))

})


// get all data from database
app.get('/dashboard', (req, res) => {

    collection.find().toArray().then(results => {
        console.log("get the data")


        results.forEach(function(d) {
            Object.keys(d).forEach(function(key){
                if(!fields.includes(key)) {
                    fields.push(key);
                }
            })
        })

        res.render(__dirname + "/public/modules/dashboard/index.ejs", {quotes: results, keys: fields})
        data = results
    })
        .catch(error => console.error(error))
})


// download json file
app.get('/dashboard/downloadJSON', (req, res) => {

        // Write to file

        try {
            fs.writeFileSync('result/data.json', JSON.stringify({data: data}));
            console.log('Done writing to file.');

        }
        catch(err) {
            console.log('Error writing to file', err)
        }
        res.download('result/data.json');


})


// download csv file
app.get('/dashboard/downloadCSV', (req, res) => {

    // Write to file

    //var fields = Object.keys(data[0]);

    var filePath = "result/data.csv";
    try {
        var csv = json2csv(data, {fields});
    } catch (err) {
        return res.status(500).json({err});
    }

    fs.writeFile(filePath, csv, function (err) {
        if (err) {
            return res.json(err).status(500);
        }
        else {
            res.download("result/data.csv");
        }
    })

})


// delete a document
app.delete("/dashboard", (req, res) => {
    collection.deleteOne(
        {participantId: req.body.participantId}
    )
        .then(result => {
            console.log("delete")
            res.json(`Deleted`)
        })
        .catch(error => console.error(error))
})


