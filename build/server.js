'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();

var HLTV = require('hltv');
var hltv = new HLTV();

// getMatch
// getMatches
// getLatestResults
// getStreams
// getActiveThreads

server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 3000
});

server.route({
    method: 'GET',
    path: '/hltv/matches',
    handler: function handler(request, reply) {
        console.log();

        hltv.getMatches().then(function (matchs) {
            return reply(matchs).code(200);
        }).catch(function (err) {
            console.log(err);
        });
    }
});

server.route({
    method: 'GET',
    path: '/hltv/results',
    handler: function handler(request, reply) {
        hltv.getLatestResults().then(function (matchs) {
            return reply(matchs).code(200);
        }).catch(function (err) {
            console.log(err);
        });
    }
});

server.start(function (err) {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});