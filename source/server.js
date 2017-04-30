const Hapi = require('hapi');
const server = new Hapi.Server();
const hltv = require('./app.js');

server.connection({
    host:  '0.0.0.0',
    port: (process.env.PORT || 3000)
});

server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
      hltv.requestMatch( (err, matchs) => {
          if (err) return reply(err).code(406);
          return reply(matchs).code(203);
      })
    }
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
            return reply(matchs).code(203);
        })
    }
});

server.start((err) => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});
