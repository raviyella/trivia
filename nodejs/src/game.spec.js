const Should = require('should');
const Game = require('./Game.js');

class FakeGameClass{
  getNotWinner(isAnswerCorrect){
    let correctAnswer;
    if (isAnswerCorrect) {
      correctAnswer = true;
    } else {
      correctAnswer = false;
    }
    return correctAnswer;
  }
}

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

  it("test to determine if player is not a winner", function () {
    let game = new Game();
    game.add('foo');
    game.didPlayerWin().should.be.not.false();
  });

  it("test to determine if player is a winner", function () {
    let game = new Game();
    game.add('foo');
    game.purses[game.currentPlayer] = 6;
    game.didPlayerWin().should.be.false();
  });

  it("test player position when dice is rolled", function () {
    let game = new Game();
    game.currentPlayer = 0;
    game.players[game.currentPlayer] = 'foo';
    game.inPenaltyBox[game.currentPlayer] = false;
    game.places[game.currentPlayer] = 0;
    game.roll(1);
    game.places[game.currentPlayer].should.be.equal(1);
  });

  it("player place is repositioned and category is changed when dice is rolled - 1", function () {
    let game = new Game();
    game.currentPlayer = 0;
    game.players[game.currentPlayer] = 'foo';
    game.inPenaltyBox[game.currentPlayer] = false;
    game.places[game.currentPlayer] = 5;
    game.roll(1);
    game.places[game.currentPlayer].should.be.equal(6);
    game.currentCategory().should.be.equal('Sports');
  });

  it("player position is restarted when player position is greater than board size", function () {
    let game = new Game();
    game.currentPlayer = 0;
    game.players[game.currentPlayer] = 'foo';
    game.inPenaltyBox[game.currentPlayer] = false;
    game.places[game.currentPlayer] = 11;
    game.roll(1);
    game.places[game.currentPlayer].should.be.equal(0);
    game.currentCategory().should.be.equal('Pop');
  });

  it("player is kept in penalty box when dice rolls even number", function () {
    let game = new Game();
    game.currentPlayer = 0;
    game.players[game.currentPlayer] = 'foo';
    game.inPenaltyBox[game.currentPlayer] = true;
    game.places[game.currentPlayer] = 0;
    game.roll(2);
    game.isGettingOutOfPenaltyBox.should.be.false();
  });

  it("player is kept in penalty box when dice rolls odd number", function () {
    let game = new Game();
    game.currentPlayer = 0;
    game.players[game.currentPlayer] = 'foo';
    game.inPenaltyBox[game.currentPlayer] = true;
    game.places[game.currentPlayer] = 0;
    game.roll(1);
    game.isGettingOutOfPenaltyBox.should.be.true();
  });

  it("Not a winner when answer is correct", function () {
    let game = new FakeGameClass();
    let isAnswerCorrect = true;
    game.getNotWinner(isAnswerCorrect).should.be.true();
  });

  it("Not a winner when answer is incorrect", function () {
    let game = new FakeGameClass();
    let isAnswerCorrect = false;
    game.getNotWinner(isAnswerCorrect).should.be.false();
  });

  it("player is sent to penalty box when incorrect answer", function () {
    let game = new Game();
    game.currentPlayer = 0;
    game.players[game.currentPlayer] = 'foo';
    game.howManyPlayers().should.be.equal(1);
    game.wrongAnswer();
    game.inPenaltyBox[game.currentPlayer].should.be.true();
    game.currentPlayer.should.be.equal(0);
  });
});
