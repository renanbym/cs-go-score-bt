const Hapi = require('hapi');
const server = new Hapi.Server();

const HLTV = require('hltv');
const hltv = new HLTV();

// getMatch
// getMatches
// getLatestResults
// getStreams
// getActiveThreads

server.connection({
    host:  '0.0.0.0',
    port: (process.env.PORT || 3000)
});


server.route({
    method: 'GET',
    path:'/hltv/matches',
    handler: function (request, reply) {
      console.log();
      
      hltv.getMatches()
      .then( (matchs) => {
          return reply(matchs).code(200);
      })
      .catch( (err) => {
        console.log(err);
      })

    }
});

server.route({
    method: 'GET',
    path:'/hltv/results',
    handler: function (request, reply) {
      hltv.getLatestResults()
      .then( (matchs) => {
          return reply(matchs).code(200);
      })
      .catch( (err) => {
        console.log(err);
      })

    }
});

server.start((err) => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});
