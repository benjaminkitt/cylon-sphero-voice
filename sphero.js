'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.use(app.router);
app.use(function middlewarePlaceholder(req, res, next) {
    return next();
});

var Cylon = require('cylon'),
    sport = '/dev/tty.Sphero-BYP-RN-SPP';

Cylon.robot({
    connection: {
        name: 'sphero',
        adaptor: 'sphero',
        port: sport
    },
    device: {
        name: 'sphero',
        driver: 'sphero'
    },

    work: function(me) {
        require('./routes/routes')(app, me);
        me.sphero.on('messages', function(data) {
            console.log("message:");
            console.log(data);
        });
        me.sphero.stop();
    }
}).start();

exports = module.exports = server;
app.listen(3000);