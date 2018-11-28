'use strict';
let gameLoggerInstance = null;

class GameLogger {
  constructor(game) {
    if (!gameLoggerInstance) {

      this.newPlayerAdded = function(playerName, totalPlayers) {
        console.log(`${playerName} was added`);
        console.log(`They are player number ${totalPlayers}`)
      }

      this.currentPlayer = function(currentPlayer){
        console.log(`${currentPlayer} is the current player`);
      }

      this.rolledDice = function(roll){
        console.log(`They have rolled a ${roll}`);
      }

      this.playerOutOfPenaltyBox = function(currentPlayer, isGettingOutOfPenaltyBox){
        if (isGettingOutOfPenaltyBox) {
          console.log(`${currentPlayer} is getting out of the penalty box`);
        } else {
          console.log(`${currentPlayer} is not getting out of the penalty box`);
        }
      }

      this.playerWithTotalGoldCouns = function(currentPlayer, totalCoins){
        console.log(`${currentPlayer} now has ${totalCoins} Gold Coins.`);
      }

      this.playerSentToPenaltyBox = function(currentPlayer){
        console.log(`Question was incorrectly answered`);
        console.log(`${currentPlayer} was sent to the penalty box`);
      }

      this.playerNewLocation = function(currentPlayer, newLocation){
        console.log(`${currentPlayer}'s new location is ${newLocation}`);
      }

      this.playerCurrentCategory = function(currentCatgory){
        console.log(`The category is ${currentCatgory}`);
      }

      gameLoggerInstance = this;
    }

    return gameLoggerInstance;
  }
}

module.exports = GameLogger;
