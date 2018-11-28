let GameLogger = require('./GameLogger.js');

const TOTAL_CATEGORY_SIZE = 50;
const MINIMUM_NUMBER_OF_PLAYERS = 2;
const WINNING_COIN_COUNT = 6;
const WRONG_ANSWER_ID = 7;
const MAXIMUM_ANSWER_ID = 10;

class Game {
  constructor() {
    this.players = new Array();
    this.places = new Array(6);
    this.purses = new Array(6);
    this.inPenaltyBox = new Array(6);

    this.popQuestions = new Array();
    this.scienceQuestions = new Array();
    this.sportsQuestions = new Array();
    this.rockQuestions = new Array();

    this.currentPlayer = 0;
    this.isGettingOutOfPenaltyBox = false;

    this.initializeQuestions();

    this.gameLogger = new GameLogger();

    this.isPlayable = function (howManyPlayers) {
      return this.howManyPlayers() >= MINIMUM_NUMBER_OF_PLAYERS;
    };

    this.add = function (playerName) {
      this.players.push(playerName);
      this.places[this.howManyPlayers() - 1] = 0;
      this.purses[this.howManyPlayers() - 1] = 0;
      this.inPenaltyBox[this.howManyPlayers() - 1] = false;

      this.gameLogger.newPlayerAdded(playerName, this.howManyPlayers());
      return true;
    };

    this.howManyPlayers = function () {
      return this.players.length;
    }

    this.roll = function (roll) {
      this.gameLogger.currentPlayer(this.players[this.currentPlayer]);
      this.gameLogger.rolledDice(roll);

      if (this.inPenaltyBox[this.currentPlayer]) {
        if (roll % 2 != 0) {
          this.isGettingOutOfPenaltyBox = true;
          this.gameLogger.playerOutOfPenaltyBox(this.players[this.currentPlayer], this.isGettingOutOfPenaltyBox);
          this.currentPlayerNewPosition(roll);
        } else {
          this.isGettingOutOfPenaltyBox = false;
          this.gameLogger.playerOutOfPenaltyBox(this.players[this.currentPlayer], this.isGettingOutOfPenaltyBox);
        }
      } else {
        this.currentPlayerNewPosition(roll)
      }
    }

    this.wasCorrectlyAnswered = function () {
      if (this.inPenaltyBox[this.currentPlayer]) {
        if (this.isGettingOutOfPenaltyBox) {
          console.log(`Answer was correct!!!!`);
          this.purses[this.currentPlayer] += 1;
          this.gameLogger.playerWithTotalGoldCouns(this.players[this.currentPlayer], this.purses[this.currentPlayer]);
          var winner = this.didPlayerWin();
          this.resetCurrentPlayer();
          return winner;
        } else {
          this.resetCurrentPlayer();
          return true;
        }
      } else {
        console.log(`Answer was correct!!!!`);
        this.purses[this.currentPlayer] += 1;
        this.gameLogger.playerWithTotalGoldCouns(this.players[this.currentPlayer], this.purses[this.currentPlayer]);
        var winner = this.didPlayerWin();
        this.resetCurrentPlayer();
        return winner;
      }
    };

    this.wrongAnswer = function () {
      this.gameLogger.playerSentToPenaltyBox(this.players[this.currentPlayer])
      this.inPenaltyBox[this.currentPlayer] = true;
      this.resetCurrentPlayer();
      return true;
    };
  }

  didPlayerWin() {
    return !(this.purses[this.currentPlayer] === WINNING_COIN_COUNT)
  }

  currentCategory() {
    let popCategory = 'Pop';
    let scienceCategory = 'Science';
    let sportsCategory = 'Sports';
    let rockCategory = 'Rock';
    let currentPlayerPosition = this.places[this.currentPlayer];

    if ((currentPlayerPosition === 0) || (currentPlayerPosition === 4) ||
      (currentPlayerPosition === 8)) {
      return popCategory;
    }

    if ((currentPlayerPosition === 1) || (currentPlayerPosition === 5) ||
      (currentPlayerPosition === 9)) {
      return scienceCategory;
    }

    if ((currentPlayerPosition === 2) || (currentPlayerPosition === 6) ||
      (currentPlayerPosition === 10)) {
      return sportsCategory;
    }

    return rockCategory;
  }

  askQuestion() {
    if (this.currentCategory() == 'Pop')
      console.log(this.popQuestions.shift());
    if (this.currentCategory() == 'Science')
      console.log(this.scienceQuestions.shift());
    if (this.currentCategory() == 'Sports')
      console.log(this.sportsQuestions.shift());
    if (this.currentCategory() == 'Rock')
      console.log(this.rockQuestions.shift());
  }

  initializeQuestions(){
    for (var i = 0; i < TOTAL_CATEGORY_SIZE; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push("Rock Question " + i);
    };
  }

  resetCurrentPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer === this.howManyPlayers()) {
      this.currentPlayer = 0;
    }
  }

  currentPlayerNewPosition(roll) {
    let boardSize = 12;
    let lastPlaceOnTheBoard = boardSize - 1;
    this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;

    if (this.places[this.currentPlayer] > lastPlaceOnTheBoard) {
      this.places[this.currentPlayer] = this.places[this.currentPlayer] - boardSize;
    }

    this.gameLogger.playerNewLocation(this.players[this.currentPlayer], this.places[this.currentPlayer]);
    this.gameLogger.playerCurrentCategory(this.currentCategory());
    this.askQuestion();
  }

  checkCurrentAnswer(){
    return (Math.floor(Math.random() * MAXIMUM_ANSWER_ID) != WRONG_ANSWER_ID);
  }

  getNotWinner(isAnswerCorrect){
    if (isAnswerCorrect) {
      return this.wasCorrectlyAnswered();
    } else {
      return this.wrongAnswer();
    }
  }
}

module.exports = Game;
