const Hapi = require('hapi');
const server = new Hapi.Server();

const hltv = require('./app.js');

server.connection({
    host: 'localhost',
    port: (process.env.PORT || 3000)
});

server.route({
    method: 'GET',
    path:'/hello',
    handler: function (request, reply) {
        return reply('hello world');
    }
});
server.route({
    method: 'GET',
    path:'/hltv',
    handler: function (request, reply) {
        hltv.requestMatch( (err, matchs) => {
            if (err) return reply(err).code(406);
            return reply(matchs);
        })
    }
});

server.start((err) => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});
