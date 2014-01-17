'use strict';

var directions = {
    left: 180,
    right: 0,
    forward: 90,
    backward: 270
};

module.exports = function(app, me) {
    app.get('/', function(req, res) {
        res.sendfile('sphero.html');
    });

    app.get('/moveme/:direction', function(req, res) {
        if (req.params.direction === 'square') {
            setTimeout(function() {
                me.sphero.roll(60, directions['forward']);
            }, 2000);
            setTimeout(function() {
                me.sphero.roll(60, directions['right']);
            }, 4000);
            setTimeout(function() {
                me.sphero.roll(60, directions['backward']);
            }, 6000);
            setTimeout(function() {
                me.sphero.roll(60, directions['left']);
            }, 8000);
            setTimeout(function() {
                me.sphero.stop();
            }, 10000);
        } else {
            me.sphero.roll(60, directions[req.params.direction]);
            setTimeout(function() {
                me.sphero.stop();
            }, 2000);
        }

        var body = 'you moved me ' + req.params.direction;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', Buffer.byteLength(body));
        res.end(body);
    });

    app.get('/colorme/:color', function(req, res) {
        me.sphero.setColor(req.params.color);
        var body = 'you made me ' + req.params.color;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', Buffer.byteLength(body));
        res.end(body);
    });

    app.get('/makeme/:shape', function(req, res) {

    });
}