const fs = require('fs');
const Player = require('./player.js');
const Fortnite          = require('fortnite');
const FortniteClient    = new Fortnite('e7b047d2-5ce8-42fd-b55c-15620ebd5238');
const q = require('q');
var exports = module.exports = {};
var playersjson = require("./players.json");


  exports.registerPlayer = async function( username ){

    var def = q.defer();
    var newPlayer = new Player( { "username" : username } );

    //Make sure we don't add duplicates.
    for( var i = 0; i < playersjson.players.length; i++ ){
      if( playersjson.players[i].username == username ){
        def.reject("Player already exists, man! What do you want from me?!");
        return def.promise;
      }
    }

    //Add and write them.
    playersjson.players.push(newPlayer);
    writePlayers().then( function() {
      def.resolve("You're added bro! Go get some dinners!");
    }).catch((error) =>{
      def.reject(error);
    });
    return def.promise;
  }

  exports.deRegisterPlayer = async function( username ){

    var def = q.defer();

    //No players.
    if( playersjson.players.length == 0 ){
      def.reject("404, " + username + " not found")
      return def.promise;
    }

    //We have players. Splice him out and rewrite.
    for( var i = 0; i < playersjson.players.length; i++ ){
      if( playersjson.players[i].username == username ){
        playersjson.players.splice(i, 1);
        writePlayers().then( function() {
          def.resolve("You're added bro! Go get some dinners!");
        }).catch((error) =>{
          def.reject(error);
        });
      }
    }

    return def.promise;

  }

  exports.checkForWins = async function( username ){
    var ret = { "success" : true, "message" : "" };
    var player = null;

    //Get their current stats from Fortnite API.
    var newPlayerData = await FortniteClient.getInfo( "GrantLemons" );

    //TODO: Make sure we have playerData.

    var playerIndex = 0;
    for( var i = 0; i < playersjson.players.length; i++ ){
      if( playersjson.players[i].username == username ){  //Looks like we've...got our man.
        player = playersjson.players[i];
        playerIndex = i;
      }
    }

    //Cap the new values for all three win types.
    var soloWins = newPlayerData.stats.p2.top1.valueInt;
    var duoWins = newPlayerData.stats.p10.top1.valueInt;
    var squadWins = newPlayerData.stats.p9.top1.valueInt;

    //Comapre each against what we have on record.
    var newSoloWin = false;
    if( soloWins > player.soloWins ){
      newSolowin = true;
    }

    var newDuoWin = false;
    if( duoWins > player.duoWins ){
      newDuoWin = true;
    }

    var newSquadWin = false;
    if( squadWins > player.squadWins ){
      newSquadWin = true;
    }

    //If any of these happened, we need to rewrite players.json with the new data.
    if( newSolowin || newDuoWin || newSquadWin ){
      var player = new Player(
        {
          "username" : username,
          "soloWins" : soloWins,
          "duoWins" : duoWins,
          "squadWins" : squadWins
        }
      );

      playersjson.players[i] = player;
      writePlayers();

    }
  }

  function writePlayers() {
    var def = q.defer();
      fs.writeFile( 'players.json', JSON.stringify( playersjson ), function(err) {
        if(err){
          def.reject(err);
        }else{
          def.resolve("You're added bro! Go get some dinners!");
        }
      });

      return def.promise;
  }
