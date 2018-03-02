const Fortnite = require('fortnite');
const client = new Fortnite('e7b047d2-5ce8-42fd-b55c-15620ebd5238');

module.exports = {

  checkForWins: (username, platform) => {
    var platform = typeof platform  !== 'undefined' ?  platform  : "pc";
    client.getInfo(username, 'pc').then(
      function( data ){
        var soloWins = data.stats.p2.top1.valueInt;
        var duoWins = data.stats.p10.top1.valueInt;
        var squadWins = data.stats.p9.top1.valueInt;



    });
  }
}
