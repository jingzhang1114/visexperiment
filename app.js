const express = require('express');
//const mongoose = require('mongoose');
const BodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/d3', express.static(__dirname + '/node_modules/d3/dist/'));

app.set("view engine", "ejs")

const MongoClient = require("mongodb").MongoClient;

const connection = 'mongodb+srv://test1:datavis@gettingstarted.kf9d9.gcp.mongodb.net/test?retryWrites=true&w=majority'

var database, collection;

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// var startTime = new Date();
// var string = startTime.getTime()+Math.random().toString(36).slice(-6);
//
// console.log(string)


MongoClient.connect(connection, {useNewUrlParser: true}, (error, client) => {
    if(error) throw error
    database = client.db("test1")
    collection = database.collection("demo1")
    console.log("connected")

    app.get('/', (req, res) => {
        res.sendFile(__dirname + "/public/index.html")
        // collection.find().toArray().then(results => {
        //     console.log("get the data")
        //     //res.sendFile(__dirname + "/public/modules/consent/index.html")
        //     res.render(__dirname + "/public/modules/consent/index.ejs", {quotes: results})
        // })
        //     .catch(error => console.error(error))
    })
})

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


app.post("/", (req, res) => {
    //console.log(req.body)
    collection.insertOne(req.body).then(result => {
        console.log("inserted.")
        //res.redirect("/")
    })
        .catch(error => console.error(error))
    console.log("Submit")
})

app.get('/dashboard', (req, res) => {
    //res.sendFile(__dirname + "/public/index.html")
    collection.find().toArray().then(results => {
        console.log("get the data")
        //res.sendFile(__dirname + "/public/modules/consent/index.html")
        res.render(__dirname + "/public/modules/dashboard/index.ejs", {quotes: results})
    })
        .catch(error => console.error(error))
})

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

// MongoClient.connect(connection, {
//     useUnifiedTopology: true
// },(err, client)=> {
//     if(err) return console.log(err)
//     console.log('Connected to db')
//     const db = client.db("testDatabase")
//     const collection = db.collection("testCollection")
//
//     collection.find().toArray(function(err, result) {
//         if(err) throw err
//         console.log(result)
//         app.get('/', (req, res) => {
//             res.send("Hello Jing!")
//             res.send(result.length)
//         })
//     })
//
//
// })