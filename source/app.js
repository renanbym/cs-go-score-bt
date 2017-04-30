const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const moment = require('moment');
const hltv = {}

hltv.getGames = ( data, callback ) => {
    let $ = cheerio.load(data);
    let games = $('#secondCollumn').html();
    callback( null, games )
}

hltv.getMatchs = ( games, callback ) =>{
    let $ = cheerio.load(games);
    let match = [];
    let inGames = $('a .frontpageMatchBox').toArray();

    inGames.map( (current) => {

        let box = cheerio('div', current);

        let horario = /[0-9]{2}\:[0-9]{2}/.exec( cheerio.load(current).html() );

        let team1 = null
        let team2 = null

        if( horario == null ){
            team1 = box.find('div').eq(0).find('div').eq(0).find('span').eq(1).html()
            team2 = box.find('div').eq(3).find('div').eq(0).find('span').eq(1).html()
            horario = 'live';
        }else{
          team1 = box.find('div').eq(0).find('span').eq(0).html()
          team2 = box.find('div').eq(1).find('span').eq(0).html()
          horario = horario[0];
        }

        if( team1 != null && team2 != null ){
          match.push({
                team1: team1
                ,team2:  team2
                ,time: horario
          })
        }

    })


    callback(null, match);

}

hltv.requestMatch = ( callback ) =>{

  request('http://www.hltv.org', (err, response, body) => {

    hltv.getGames( body, (err, games) => {

      hltv.getMatchs( games, callback );

    })

  })


}

module.exports = hltv
