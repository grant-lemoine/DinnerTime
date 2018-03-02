const Discord           = require("discord.js");
const Fortnite          = require('fortnite');
const discordClient     = new Discord.Client();
const fortniteClient    = new Fortnite('e7b047d2-5ce8-42fd-b55c-15620ebd5238');
const fs                = require('fs');
const _                 = require("underscore.string");

discordClient.login('NDE4ODY4MzI2NjQ3OTg4MjI0.DXn3wA.cCbySY5hnV3jhuKM-AMrm_KYn1E');

discordClient.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Listen for messages.
discordClient.on('message', msg => {

  var msgContent = _.clean( msg.content.trim() );   //Cleans spaces from middle and trims whitespace off end.

  if ( msgContent === 'ping' ) {
    msg.channel.send('pong');
    return;
  }

  if ( s( msgContent ).startsWith("!register") ) {
    var username = _.strRight(msgContent, ' ');
  }

});




fs.readFile('players.txt', 'utf8', (err, data) => {
  if (err) throw "err";

  var players = _.lines(data);
  for (var i = 0; i < players.length; i++) {

    if( players[i].length ){

      fortniteClient.getInfo(players[i], 'pc').then(
        function( data ){

          var soloWins = data.stats.p2.top1.valueInt;
          var duoWins = data.stats.p10.top1.valueInt;
          var squadWins = data.stats.p9.top1.valueInt;



      });
    }
  }

});

registerPlayer: (player) => {
  //read the json and append a new player.
  fs.appendFile('players.txt', 'testy\n', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

}
