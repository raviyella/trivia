const Should = require('should');
const GameRunner = require('./GameRunner.js');

describe("Trivia GameRunner functionality", function () {
  it("GameRunner is accessible", function () {
    Should(GameRunner).not.equal(undefined);
  });
});
