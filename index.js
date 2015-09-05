// In the card game poker, a hand consists of five cards and are ranked, from lowest to highest, in the following way:

// High Card: Highest value card.
// One Pair: Two cards of the same value.
// Two Pairs: Two different pairs.
// Three of a Kind: Three cards of the same value.
// Straight: All cards are consecutive values.
// Flush: All cards of the same suit.
// Full House: Three of a kind and a pair.
// Four of a Kind: Four cards of the same value.
// Straight Flush: All cards are consecutive values of same suit.
// Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
// The cards are valued in the order:
// 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.

// If two players have the same ranked hands then the rank made up of the highest value wins; for example, a pair of eights beats a pair of fives (see example 1 below). But if two ranks tie, for example, both players have a pair of queens, then highest cards in each hand are compared (see example 4 below); if the highest cards tie then the next highest cards are compared, and so on.

// Consider the following five hands dealt to two players:

// Hand    Player 1              Player 2                Winner
//   1     5H 5C 6S 7S KD        2C 3S 8S 8D TD          Player 2
//         Pair of Fives         Pair of Eights

//   2     5D 8C 9S JS AC        2C 5C 7D 8S QH          Player 1
//         Highest card Ace      Highest card Queen

//   3     2D 9C AS AH AC        3D 6D 7D TD QD          Player 2
//         Three Aces            Flush with Diamonds

//   4     4D 6S 9H QH QC        3D 6D 7H QD QS          Player 1
//         Pair of Queens        Pair of Queens
//         Highest card Nine     Highest card Seven

//   5     2H 2D 4C 4D 4S        3C 3D 3S 9S 9D          Player 1
//         Full House            Full House
//         With Three Fours      with Three Threes

var sampleHands = [
  ['5H 5C 6S 7S KD', '2C 3S 8S 8D TD'],
  ['5D 8C 9S JS AC', '2C 5C 7D 8S QH'],
  ['2D 9C AS AH AC', '3D 6D 7D TD QD'],
  ['4D 6S 9H QH QC', '3D 6D 7H QD QS'],
  ['2H 2D 4C 4D 4S', '3C 3D 3S 9S 9D'],
];

var should = require('should');
var _ = require('lodash');

function countCards(indexToCount, hand) {
  return _.countBy(hand.split(' '), indexToCount);
}
var countValues = _.curry(countCards)(0);
var countSuits = _.curry(countCards)(1);

function hasAKind(count, hand) {
  return _.findKey(countValues(hand), _.curry(_.eq)(count));
}

var hasPair = _.curry(hasAKind)(2);
hasPair(sampleHands[0][0]).should.eql('5');
hasPair(sampleHands[0][1]).should.eql('8');

var hasThreeOfAKind = _.curry(hasAKind)(3);
hasThreeOfAKind(sampleHands[2][0]).should.eql('A');

var hasFourOfAKind = _.curry(hasAKind)(4);
hasFourOfAKind('9D 9S KH 9H 9C').should.eql('9');


var cardOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

function getValueIndex(value) {
  return cardOrder.indexOf(value);
}

function sortCards(hand) {
  return _.sortBy(Object.keys(countValues(hand)), getValueIndex);
}

function hasTwoPairs(hand) {
  var values = countValues(hand);
  var leftPair = _.findKey(values, _.curry(_.eq)(2));
  var rightPair = _.findLastKey(values, _.curry(_.eq)(2));
  if (leftPair && rightPair && leftPair !== rightPair) {
    return sortCards(leftPair + ' ' + rightPair);
  }
}
hasTwoPairs('3H 9C 9S 2D 3D').should.eql(['9', '3']);
hasTwoPairs('7S 8H 8C KH KS').should.eql(['K', '8']);
sampleHands[0].map(hasTwoPairs).should.eql([undefined, undefined]);

function highestCard(hand) {
  return sortCards(hand).filter(function (value) {
    return value !== hasPair(hand);
  });
}
highestCard(sampleHands[1][0])[0].should.eql('A');
highestCard(sampleHands[1][1])[0].should.eql('Q');

function hasFlush(hand) {
  return _.findKey(countSuits(hand), _.eq.bind(null, 5));
}
hasFlush(sampleHands[2][1]).should.eql('D');

hasPair(sampleHands[3][0]).should.eql('Q');
hasPair(sampleHands[3][1]).should.eql('Q');
highestCard(sampleHands[3][0])[0].should.eql('9');
highestCard(sampleHands[3][1])[0].should.eql('7');

function hasFullHouse(hand) {
  var values = countValues(hand);
  if (_.findKey(values, _.eq.bind(null, 2))) {
    return _.findKey(values, _.eq.bind(null, 3));
  }
}
hasFullHouse(sampleHands[4][0]).should.eql('4');
hasFullHouse(sampleHands[4][1]).should.eql('3');

function hasStraight(hand) {
  var sortedCards = highestCard(hand);
  var isStraight = sortedCards.every(function (card, index, cards) {
    if (index === 4) {return true; }
    return cards[index + 1] === cardOrder[cardOrder.indexOf(card) + 1];
  });
  return isStraight ? sortedCards[0] : false;
}
hasStraight('8D 6C 5S 7H 4S').should.eql('8');

function hasStraightFlush(hand) {
  if (hasFlush(hand)) {
    return hasStraight(hand);
  }
}
hasStraightFlush('4H 3H 6H 5H 7H').should.eql('7');

function hasRoyalFlush(hand) {
  return hasStraightFlush(hand) === 'A';
}
hasRoyalFlush('AD KD JD QD TD').should.eql(true);

var bestHands = [
  hasRoyalFlush,    // 0
  hasStraightFlush, // 1
  hasFourOfAKind,   // 2
  hasFullHouse,     // 3
  hasFlush,         // 4
  hasStraight,      // 5
  hasThreeOfAKind,  // 6
  hasTwoPairs,      // 7
  hasPair,          // 8
  highestCard       // 9
];

function getHandStrength(hand) {
  return _.find(_.range(bestHands.length), function (bestHandsIndex) {
    return bestHands[bestHandsIndex](hand);
  });
}
sampleHands.map(function (round) {
  return round.map(getHandStrength);
}).should.eql([[8, 8], [9, 9], [6, 4], [8, 8], [3, 3]]);

function judgeWinner(players) {
  var handStrengths = players.map(getHandStrength);
  if (handStrengths[0] !== handStrengths[1]) {
    return handStrengths.indexOf(_.min(handStrengths));
  }
  var tiebreakers = players.map(bestHands[handStrengths[0]]);
  return tiebreakers.indexOf(_.min(tiebreakers, getValueIndex));
}
sampleHands.map(judgeWinner).should.eql([1, 0, 1, 0, 0]);

module.exports = {
  highestCard: highestCard,
  hasPair: hasPair,
  hasTwoPairs: hasTwoPairs,
  hasThreeOfAKind: hasThreeOfAKind,
  hasStraight: hasStraight,
  hasFlush: hasFlush,
  hasFullHouse: hasFullHouse,
  hasFourOfAKind: hasFourOfAKind,
  hasStraightFlush: hasStraightFlush,
  hasRoyalFlush: hasRoyalFlush,
  getHandStrength: getHandStrength,
  judgeWinner: judgeWinner
};
