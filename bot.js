const Discord           = require("discord.js");
const discordClient     = new Discord.Client();
const fs                = require('fs');
const _                 = require("underscore.string");
const PlayerManager        = require("./playermanager.js");

// Players.checkForWins("GrantLemons");
// return;

discordClient.login('NDE5OTQ1Njc0NzY4MTIxODc4.DX3ggg.kfwe7pfouHZKPsHhJ8Es_9kidV8');
// setInterval(checkForwins, 10);

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

//discordClient.channels.find("id", "296051294152425474").send("svsvs");



//Listen for messages.
discordClient.on('message', msg => {

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
    PlayerManager.deRegisterPlayer( username ).then( data => msg.channel.send( data.message ) );
  }

});
