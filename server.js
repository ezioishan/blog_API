const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config.js');
require('./routes.js')(app);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Enabling CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.Promise = global.Promise;

mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to the database...");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Blog posts API"});
});

app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
});