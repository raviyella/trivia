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

    this.isPlayable = function (howManyPlayers) {
      return this.howManyPlayers() >= 2;
    };

    this.add = function (playerName) {
      this.players.push(playerName);
      this.places[this.howManyPlayers() - 1] = 0;
      this.purses[this.howManyPlayers() - 1] = 0;
      this.inPenaltyBox[this.howManyPlayers() - 1] = false;

      console.log(`${playerName} was added`);
      console.log(`They are player number ${this.howManyPlayers()}`)

      return true;
    };

    this.howManyPlayers = function () {
      return this.players.length;
    }

    this.roll = function (roll) {
      console.log(`${this.players[this.currentPlayer]} is the current player`);
      console.log(`They have rolled a ${roll}`);

      if (this.inPenaltyBox[this.currentPlayer]) {
        if (roll % 2 != 0) {
          this.isGettingOutOfPenaltyBox = true;
          console.log(`${this.players[this.currentPlayer]} is getting out of the penalty box`);
          this.currentPlayerNewPosition(roll);
        } else {
          console.log(`${this.players[this.currentPlayer]} is not getting out of the penalty box`);
          this.isGettingOutOfPenaltyBox = false;
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
          console.log(`${this.players[this.currentPlayer]} now has ${this.purses[this.currentPlayer]} Gold Coins.`);

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
        console.log(`${this.players[this.currentPlayer]} now has ${this.purses[this.currentPlayer]} Gold Coins.`);

        var winner = this.didPlayerWin();
        this.resetCurrentPlayer();
        return winner;
      }
    };

    this.wrongAnswer = function () {
      console.log(`Question was incorrectly answered`);
      console.log(`${this.players[this.currentPlayer]} was sent to the penalty box`);

      this.inPenaltyBox[this.currentPlayer] = true;

      this.resetCurrentPlayer();

      return true;
    };

  }

  didPlayerWin() {
    let winningCoinCount = 6;
    return !(this.purses[this.currentPlayer] === winningCoinCount)
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
    let questionSize = 50;
    for (var i = 0; i < questionSize; i++) {
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

    console.log(`${this.players[this.currentPlayer]}'s new location is ${this.places[this.currentPlayer]}`);
    console.log(`The category is ${this.currentCategory()}`);
    this.askQuestion();
  }
}

module.exports = Game;
