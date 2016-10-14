'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var moment = require('moment');

var getMatchs = function getMatchs(data, callback) {
    var $ = cheerio.load(data);
    var match = [];

    var inGames = $('#secondCollumn a');
    for (var i = 0; i < inGames.length; i++) {
        var title = $('#secondCollumn a').eq(i).attr('title');
        var href = $('#secondCollumn a').eq(i).attr('href');
        var matchBox = $('#secondCollumn a .frontpageMatchBox').eq(i).html();
        var img = $('#secondCollumn a .frontpageMatchBox').eq(i).find('img.flagFix');

        var t1 = $('#secondCollumn a .frontpageMatchBox').eq(i).find('img.flagFix').eq(0).parent();
        var t2 = $('#secondCollumn a .frontpageMatchBox').eq(i).find('img.flagFix').eq(1).parent();

        if (typeof title != 'undefined' && typeof href != 'undefined' && matchBox != null) {

            var r1 = '*';
            var r2 = '*';

            var time1 = t1.find('span').html();
            var time2 = t2.find('span').html();

            var horario = /[0-9]{2}\:[0-9]{2}/.exec(matchBox);

            if (horario == null) {
                time1 = /\<span.*\>.*\<\/span.*\>.*\<span.*\>(.*)\<\/span.*\>/.exec(t1.parent().html());
                time2 = /\<span.*\>.*\<\/span.*\>.*\<span.*\>(.*)\<\/span.*\>/.exec(t2.parent().html());
                horario = 'live';
            } else {

                // horario = moment('2016-12-12 '+horario[0]+':00').subtract( 2, 'hour').format('HH:mm');
                horario = horario[0];
            }

            match.push({
                title: title,
                link: href,
                t1: (typeof time1 === 'undefined' ? 'undefined' : _typeof(time1)) == 'object' ? time1[1] : time1,
                t2: (typeof time2 === 'undefined' ? 'undefined' : _typeof(time2)) == 'object' ? time2[1] : time2,
                time: horario,
                img1: img.eq(0).attr('src'),
                img2: img.eq(1).attr('src')
            });
        }
    }

    callback(null, match);
};

request('http://www.hltv.org', function (err, response, body) {
    getMatchs(body, function (err, match) {
        console.log(match);
    });
});