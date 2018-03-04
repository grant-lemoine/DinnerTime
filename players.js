const fs = require('fs');
const Player = require('./player.js');
var exports = module.exports = {};
var playersjson = require("./players.json");


  exports.registerPlayer = async function( username ){
    var ret = { "success" : true, "message" : "" };

    //No players.  We'll just add one.
    if( playersjson.players.length == 0 ){
      var newPlayer = new Player( { "username" : username } );
      playersjson.players.push(newPlayer);
      ret = writePlayers();
      if( ret.success ) ret.message = "You're added bro! Go get some dinners!";
      return ret;
    }

    //We have players. We'll make sure we don't add duplicates.
    for( var i = 0; i < playersjson.players.length; i++ ){
      if( playersjson.players[i].username == username ){
        ret.success = false;
        ret.message = "Player already exists, man! What do you want from me?!";
        return ret;
      }
    }

    var newPlayer = new Player( { "username" : username } );
    playersjson.players.push(newPlayer);
    ret = writePlayers();
    if( ret.success ) ret.message = "You're added bro! Go get some dinners!";
    return ret;
  }

  exports.deRegisterPlayer = async function( username ){
    var ret = { "success" : true, "message" : "" };

    //No players.
    if( playersjson.players.length == 0 ){
      ret.success = false;
      ret.message = "Hmm, couldn't find anyone named " + username;
      return ret;
    }

    //We have players. Splice him out and rewrite.
    for( var i = 0; i < playersjson.players.length; i++ ){
      if( playersjson.players[i].username == username ){
        playersjson.players.splice(i, 1);
        ret = writePlayers();
        if( ret.success ) ret.message = "Sad to see you go bro!";
        return ret;

      }
    }
  }

  function writePlayers() {
    var ret = { "success" : true, "message" : "" };
      fs.writeFileSync('players.json', JSON.stringify( playersjson ), (err) => {
        if (err) {
          ret.success = false;
          ret.message = err;
        }
      });
      return ret;
  }
