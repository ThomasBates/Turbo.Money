'use strict';
var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

//  Fixing the 'cannot GET /URL' error on refresh with React Router (or how client side routers work)
//  https://ui.dev/react-router-cannot-get-url-refresh
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('listening');
});