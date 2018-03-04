class Player {

  constructor( player ) {
    this.username = player.username;
    this.soloWins = ( ( player.soloWins ) ? player.soloWins : 0 );
    this.duoWins = ( ( player.duoWins ) ? player.duoWins : 0 );
    this.squadWins = ( ( player.squadWins ) ? player.squadWins : 0 );
  }

}

module.exports = Player;
