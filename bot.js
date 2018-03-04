const Discord           = require("discord.js");
const Fortnite          = require('fortnite');
const discordClient     = new Discord.Client();
const fortniteClient    = new Fortnite('e7b047d2-5ce8-42fd-b55c-15620ebd5238');
const fs                = require('fs');
const _                 = require("underscore.string");
const Players           = require("./players.js");

discordClient.login('NDE4ODY4MzI2NjQ3OTg4MjI0.DXn3wA.cCbySY5hnV3jhuKM-AMrm_KYn1E');

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

//Listen for messages.
discordClient.on('message', msg => {

  var msgContent = _.clean( msg.content.trim() );   //Cleans spaces from middle and trims whitespace off end.

  if ( msgContent === 'ping' ) {
    msg.channel.send('pong');
    return;
  }

  if ( _( msgContent ).startsWith("!dtregister") ) {
    var username = _.strRight(msgContent, ' ');
    Players.registerPlayer( username ).then( data => msg.channel.send( data.message ) );
  }

  if ( _( msgContent ).startsWith("!dtremove") ) {
    var username = _.strRight(msgContent, ' ');
    Players.deRegisterPlayer( username ).then( data => msg.channel.send( data.message ) );
  }

});
