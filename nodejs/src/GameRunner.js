let Game = require('./Game.js');

class GameRunner {
  constructor() {
    let notAWinner = false;
    let game = new Game();
    game.add('Chet');
    game.add('Pat');
    game.add('Sue');

    do {
      game.roll(Math.floor(Math.random() * 6) + 1);
      notAWinner = game.getNotWinner(game.checkCurrentAnswer());
    } while (notAWinner);
  }
}

module.exports = GameRunner;
