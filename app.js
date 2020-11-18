const express = require('express');
//const mongoose = require('mongoose');
const BodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.set("view engine", "ejs")



const MongoClient = require("mongodb").MongoClient;

const connection = 'mongodb+srv://test1:datavis@gettingstarted.kf9d9.gcp.mongodb.net/test?retryWrites=true&w=majority'

var database, collection;
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
//     MongoClient.connect(connection, {useNewUrlParser: true}, (error, client) => {
//         if(error) throw error
//         database = client.db("example")
//         collection = database.collection("people")
//         console.log("Add a database")
//     })
// })
//
// app.post("/person", (request, response) => {
//     collection.insertOne(request.body, (error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result.result);
//     });
// });

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})





MongoClient.connect(connection, {useNewUrlParser: true}, (error, client) => {
    if(error) throw error
    database = client.db("example")
    collection = database.collection("people")
    console.log("connected")

    app.get('/', (req, res) => {
        //res.sendFile(__dirname + "/public/index.html")
        collection.find().toArray().then(results => {
            console.log("get the data")
            res.render(__dirname + "/public/index.ejs", {quotes: results})
        })
            .catch(error => console.error(error))
    })
})



app.post("/quotes", (req, res) => {
    //console.log(req.body)
    collection.insertOne(req.body).then(result => {
        console.log(result)
        res.redirect("/")
    })
        .catch(error => console.error(error))
    console.log("Submit")
})

app.delete("/quotes", (req, res) => {
    collection.deleteOne(
        {name: req.body.name}
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