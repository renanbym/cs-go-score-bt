'use strict';

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var moment = require('moment');
var hltv = {};

hltv.getGames = function (data, callback) {
  var $ = cheerio.load(data);
  var games = $('#secondCollumn').html();
  callback(null, games);
};

hltv.getMatchs = function (games, callback) {
  var $ = cheerio.load(games);
  var match = [];
  var inGames = $('a .frontpageMatchBox').toArray();

  inGames.map(function (current) {

    var box = cheerio('div', current);

    var horario = /[0-9]{2}\:[0-9]{2}/.exec(cheerio.load(current).html());

    var team1 = null;
    var team2 = null;

    if (horario == null) {
      team1 = box.find('div').eq(0).find('div').eq(0).find('span').eq(1).html();
      team2 = box.find('div').eq(3).find('div').eq(0).find('span').eq(1).html();
      horario = 'live';
    } else {
      team1 = box.find('div').eq(0).find('span').eq(0).html();
      team2 = box.find('div').eq(1).find('span').eq(0).html();
      horario = horario[0];
    }

    if (team1 != null && team2 != null) {
      match.push({
        team1: team1,
        team2: team2,
        time: horario
      });
    }
  });

  callback(null, match);
};

hltv.requestMatch = function (callback) {

  request('http://www.hltv.org', function (err, response, body) {

    hltv.getGames(body, function (err, games) {

      hltv.getMatchs(games, callback);
    });
  });
};

module.exports = hltv;