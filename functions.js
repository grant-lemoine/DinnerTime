const fs = require('fs');

module.exports = {

  registerPlayer: (player) => {
    lr = new LineByLineReader('players.txt');
    console.log(lr);
    return;

    fs.appendFile('players.txt', 'testy\n', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

  },

  readPlayers: () => {
    fs.readFile('players.txt', 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  }

}


readPlayers();
