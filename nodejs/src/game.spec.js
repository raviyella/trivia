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
  it("Game instance is created and count number of players", function () {
    let game = new Game();
    Should(game).should.be.type('object');
    Should(game.howManyPlayers()).be.equal(0);
  });

  it("Players count when one or more players are added", function () {
    let game = new Game();
    game.add('foo');
    Should(game.howManyPlayers()).be.equal(1);
  });

  it("Game playable when minimum players 2 are added", function () {
    let game = new Game();
    game.add('foo');
    game.add('bar');
    game.isPlayable().should.be.true();
  });

  it("Game not playable when minimum players are not added", function () {
    let game = new Game();
    game.add('foo');
    game.isPlayable().should.not.be.true();
  });

  it("Add new players", function () {
    let game = new Game();
    game.add('foo');
    game.add('bar');
    game.howManyPlayers().should.be.equal(2);
    game.places[0].should.be.equal(0);
    game.places[1].should.be.equal(0);
  });

  it("Initialize questions", function () {
    let game = new Game();
    let expectedQuestionLength = 50;
    game.popQuestions.length.should.be.equal(expectedQuestionLength);
    game.scienceQuestions.length.should.be.equal(expectedQuestionLength);
    game.sportsQuestions.length.should.be.equal(expectedQuestionLength);
    game.rockQuestions.length.should.be.equal(expectedQuestionLength);
  });

  it("test to identify category", function () {
    let game = new Game();
    game.add('foo');
    game.currentCategory().should.be.equal('Pop');
  });

  it("test to determine if player is not a winner.", function () {
    let game = new Game();
    game.add('foo');
    game.didPlayerWin().should.be.not.false();
  });

  it("test to determine if player is a winner.", function () {
    let game = new Game();
    game.add('foo');
    game.purses[game.currentPlayer] = 6;
    game.didPlayerWin().should.be.false();
  });
});
