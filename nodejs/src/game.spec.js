const Should = require('should');
const Game = require('./game.js');

describe("The test environment", function () {
  it("should pass", function () {
    (true).should.equal(true);
  });

  it("should access game", function () {
    Should(Game).not.equal(undefined);
  });
});

describe("Trivia game functionality", function () {
  it("Game instance is created", function () {
    let game = new Game();
    Should(game).should.be.type('object');
    Should(game.howManyPlayers()).be.equal(0);
  });
});
