const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const moment = require('moment');

const getMatchs = ( data, callback ) =>{
    let $ = cheerio.load(data);
    let match = [];

    let inGames = $('#secondCollumn a');
    for( var i = 0 ; i < inGames.length; i++ ){
        let title = $('#secondCollumn a').eq(i).attr('title');
        let href = $('#secondCollumn a').eq(i).attr('href');
        let matchBox = $('#secondCollumn a .frontpageMatchBox').eq(i).html();
        let img = $('#secondCollumn a .frontpageMatchBox').eq(i).find('img.flagFix');

        let t1 = $('#secondCollumn a .frontpageMatchBox').eq(i).find('img.flagFix').eq(0).parent();
        let t2 = $('#secondCollumn a .frontpageMatchBox').eq(i).find('img.flagFix').eq(1).parent();

        if( typeof title != 'undefined' &&  typeof href != 'undefined' && matchBox != null  ){

            let r1 = '*';
            let r2 = '*';

            let time1 = t1.find('span').html();
            let time2 = t2.find('span').html();

            let horario = /[0-9]{2}\:[0-9]{2}/.exec( matchBox );


            if( horario == null ){
                time1 = /\<span.*\>.*\<\/span.*\>.*\<span.*\>(.*)\<\/span.*\>/.exec( t1.parent().html() );
                time2 = /\<span.*\>.*\<\/span.*\>.*\<span.*\>(.*)\<\/span.*\>/.exec( t2.parent().html() );
                horario = 'live';
            }else{

                // horario = moment('2016-12-12 '+horario[0]+':00').subtract( 2, 'hour').format('HH:mm');
                horario = horario[0]
            }

            match.push({
                title: title
                , link: href
                ,t1:  ( typeof time1 == 'object' ? time1[1] : time1 )
                ,t2:  ( typeof time2 == 'object' ? time2[1] : time2 )
                ,time: horario
                ,img1: img.eq(0).attr('src')
                ,img2: img.eq(1).attr('src')
            })
        }

    }

    callback(null, match);

}

request('http://www.hltv.org', (err, response, body) => {
    getMatchs( body, (err, match ) => {
        console.log(match);
    } );
})
