/*global describe,it*/

var poker = require('./index.js');
var should = require('should');

var sampleHands = [
  ['5H 5C 6S 7S KD', '2C 3S 8S 8D TD'],
  ['5D 8C 9S JS AC', '2C 5C 7D 8S QH'],
  ['2D 9C AS AH AC', '3D 6D 7D TD QD'],
  ['4D 6S 9H QH QC', '3D 6D 7H QD QS'],
  ['2H 2D 4C 4D 4S', '3C 3D 3S 9S 9D'],
];

describe('poker', function () {

  it('.highestCard(hand) should return the cards sorted', function () {
    poker.highestCard(sampleHands[1][0])[0].should.eql('A');
    poker.highestCard(sampleHands[1][1])[0].should.eql('Q');
    poker.highestCard(sampleHands[3][0])[0].should.eql('9');
    poker.highestCard(sampleHands[3][1])[0].should.eql('7');
  });

  it('.hasPair(hand) should detect a pair', function () {
    poker.hasPair(sampleHands[0][0]).should.eql('5');
    poker.hasPair(sampleHands[0][1]).should.eql('8');
    poker.hasPair(sampleHands[3][0]).should.eql('Q');
    poker.hasPair(sampleHands[3][1]).should.eql('Q');
  });

  it('.hasTwoPair(hand) should detect two pairs', function () {
    poker.hasTwoPairs('3H 9C 9S 2D 3D').should.eql(['9', '3']);
    poker.hasTwoPairs('7S 8H 8C KH KS').should.eql(['K', '8']);
    sampleHands[0].map(poker.hasTwoPairs).should.eql([undefined, undefined]);
  });

  it('.hasThreeOfAKind(hand) should detect a three of a kind', function () {
    poker.hasThreeOfAKind(sampleHands[2][0]).should.eql('A');
  });

  it('.hasStraight(hand) should detect a straight', function () {
    poker.hasStraight('8D 6C 5S 7H 4S').should.eql('8');
  });

  it('.hasFlush(hand) should detect a flush', function () {
    poker.hasFlush(sampleHands[2][1]).should.eql('D');
  });

  it('.hasFullHouse(hand) should detect a full house', function () {
    poker.hasFullHouse(sampleHands[4][0]).should.eql('4');
    poker.hasFullHouse(sampleHands[4][1]).should.eql('3');
  });

  it('.hasFourOfAKind(hand) should detect a four of a kind', function () {
    poker.hasFourOfAKind('9D 9S KH 9H 9C').should.eql('9');
  });

  it('.hasStraightFlush(hand) should detect a straight flush', function () {
    poker.hasStraightFlush('4H 3H 6H 5H 7H').should.eql('7');
  });

  it('.hasRoyalFlush(hand) should detect a Royal flush', function () {
    poker.hasRoyalFlush('AD KD JD QD TD').should.eql(true);
  });

  it('.getHandStrength(hand) should return the lowest matching bestHands index', function () {
    sampleHands.map(function (round) {
      return round.map(poker.getHandStrength);
    }).should.eql([[8, 8], [9, 9], [6, 4], [8, 8], [3, 3]]);
  });

  it('.judgeWinner(hands) should return the index of the winning hand', function () {
    sampleHands.map(poker.judgeWinner).should.eql([1, 0, 1, 0, 0]);
  });

});
