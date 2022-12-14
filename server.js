'use strict'

/**
 * Module dependencies.
 */

const PORT = process.env.PORT || 8080;


const express = require('express')
var app = express();
app.set('etag', false); // turn off

var logger = require('morgan');
var path = require('path');

var cors = require('cors')

// enabling CORS for any origin
app.use(cors());

// log requests
app.use(logger('dev'));


app.get('/', function (req, res) {
    res.set("Cache-Control", "private, immutable, max-age=3600")
    res.set("Content-Type", "text/plain")
    const randomNumber = Math.floor((Math.random() + Math.floor(Math.random() * 9) + 1) * Math.pow(10, 8))
    res.send('Hello cache partition test: ' + randomNumber);
});


// express on its own has no notion
// of a "file". The express.static()
// middleware checks for a file matching
// the `req.path` within the directory
// that you pass it. In this case "GET /js/app.js"
// will look for "./public/js/app.js".

app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT);
console.log('listening on http://localhost:' + PORT);