const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config.js');
const cors=require("cors");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Enabling CORS for all HTTP methods
app.use(cors())

require('./routes.js')(app);

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