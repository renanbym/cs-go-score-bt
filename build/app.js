'use strict';

var request = require('request');
var cheerio = require('cheerio');

request('http://www.hltv.org', function (err, response, body) {
    var $ = cheerio.load(body);

    var inGames = $('#secondCollumn .starred, #secondCollumn .notStarred');

    // inGames.each( ( index, games ) => {
    var games = inGames[0];
    // console.log(games);
    console.log(games.attribs.title);

    var frontpageMatchBox = games.children[1];

    var t = frontpageMatchBox.children[1].children[2];

    l.data;
    console.log(t);

    return true;
    // })
});

// <a class="notStarred" title="WESG 2016 Europe & CIS Regional Finals" href="/match/2305416-russia-bpro-wesg-2016-europe-cis-regional-finals">
//0     <div class="frontpageMatchBox" style="background-image: url(http://static.hltv.org//images/digital/emptybutton.gif);opacity: 0.4">
//
//0       <div style="display: flex;flex-direction: column;justify-content: space-between;padding-left:2px;padding-top:3px;height:26px;padding-right: 2px;;">
//
//0             <div style="display:flex;flex-direction: row;justify-content: space-between;">
//
// 0                <div style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
//  0                    <span style="display:inline-block;width:25px;text-align: center;">
//   1                        <img src="http://static.hltv.org//images/flag/ru.gif" alt="" height="12" width="18" class="flagFix"/>
//  0                    </span>
//  1                    <span style="">.Russia</span>
// 0                </div>
//
// 1                <div style="flex-shrink: 0;padding-left:2px;padding-right:2px;">
//  0                    <span id="hm_livescore_2305416_7268">0</span>
// 1                </div>
//0            </div>
//
//1            <div style="display:flex;flex-direction: row;justify-content: space-between">
//0                <div style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
//
//0                    <span style="display:inline-block;width:25px;text-align: center;">
// 0                        <img src="http://static.hltv.org//images/flag/bg.gif" alt="" height="12" width="18" class="flagFix"/>
//0                    </span>
//
//1                    <span style="">Bpro</span>
//0                </div>
//1                <div style="flex-shrink: 0;padding-left:2px;padding-right:2px;">
//0                    <span id="hm_livescore_2305416_6762">0 </span>
//1                </div>
//1            </div>
//
//0         </div>
//
//0     </div>
//
// </a>
//# sourceMappingURL=app.js.map