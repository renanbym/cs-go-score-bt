'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();

var hltv = require('./app.js');

server.connection({
    host: 'localhost',
    port: process.env.PORT || 3000
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: function handler(request, reply) {
        return reply('hello world');
    }
});
server.route({
    method: 'GET',
    path: '/hltv',
    handler: function handler(request, reply) {
        hltv.requestMatch(function (err, matchs) {
            if (err) return reply(err).code(406);
            return reply(matchs);
        });
    }
});

server.start(function (err) {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});