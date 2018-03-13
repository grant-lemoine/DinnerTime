const Discord           = require("discord.js");
const DiscordClient     = new Discord.Client();
const fs                = require('fs');
const _                 = require("underscore.string");
const PlayerManager     = require("./playermanager.js");
const GeneralChannelID  = "296051294152425474";

DiscordClient.login('NDE5OTQ1Njc0NzY4MTIxODc4.DX3ggg.kfwe7pfouHZKPsHhJ8Es_9kidV8');

DiscordClient.on('ready', () => {
  console.log(`Logged in as ${DiscordClient.user.tag}!`);
});

//Listen for messages.
DiscordClient.on('message', msg => {

  var msgContent = _.clean( msg.content.trim() );   //Cleans spaces from middle and trims whitespace off end.

  if ( msgContent === 'ping' ) {
    msg.channel.send('pong');
    return;
  }

  if ( _( msgContent ).startsWith("!dtregister") ) {
    var username = _.strRight(msgContent, ' ');
    PlayerManager.registerPlayer(username).then( message => {
      msg.channel.send( message )
    }).catch(function (err) {
      msg.channel.send( err )
    });
  }

  if ( _( msgContent ).startsWith("!dtremove") ) {
    var username = _.strRight(msgContent, ' ');
    PlayerManager.deRegisterPlayer(username).then( message => {
      msg.channel.send( message )
    }).catch(function (err) {
      msg.channel.send( err )
    });
  }

  if ( _( msgContent ).startsWith("!status") ) {
    var name = _.strRight(msgContent, ' ');
    DiscordClient.channels.get(GeneralChannelID).send(name + "'s status is: RIP");
  }

});
