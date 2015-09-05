# poker-hands

[![NPM Version](https://img.shields.io/npm/v/poker-hands.svg)](https://www.npmjs.com/package/poker-hands)
[![Build Status](https://travis-ci.org/dsernst/poker-hands.svg?branch=master)](https://travis-ci.org/dsernst/poker-hands)

Quickly evaluate poker hands.

## Rules

> In the card game poker, a hand consists of five cards and are ranked, from lowest to highest, in the following way:
>
> - High Card: Highest value card.
> - One Pair: Two cards of the same value.
> - Two Pairs: Two different pairs.
> - Three of a Kind: Three cards of the same value.
> - Straight: All cards are consecutive values.
> - Flush: All cards of the same suit.
> - Full House: Three of a kind and a pair.
> - Four of a Kind: Four cards of the same value.
> - Straight Flush: All cards are consecutive values of same suit.
> - Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
>
> The cards are valued in the order:
>
> - 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.

## Install

```
$ npm install poker-hands
```

```js
var poker = require('poker-hands');
```

## Usage

A hand is represented as a string of 5 pairs of characters. For example:

```js
'5H 5C 6S 7S KD' // is a hand with
// 5 of Hearts
// 5 of Clubs
// 6 of Spades
// 7 of Spades
// King of Diamonds


'2C 3S 8S 8D TD' // is a hand with
// 2 of Clubs
// 3 of Spades
// 8 of Spades
// 8 of Diamonds
// Ten of Diamonds
```

### .judgeWinner([hand, hand])
Given a tuple of two hands, return the index of the stronger hand.

```js
poker.judgeWinner(['5H 5C 6S 7S KD', '2C 3S 8S 8D TD']); // 1
poker.judgeWinner(['5D 8C 9S JS AC', '2C 5C 7D 8S QH']); // 0
poker.judgeWinner(['2D 9C AS AH AC', '3D 6D 7D TD QD']); // 1
poker.judgeWinner(['4D 6S 9H QH QC', '3D 6D 7H QD QS']); // 0
poker.judgeWinner(['2H 2D 4C 4D 4S', '3C 3D 3S 9S 9D']); // 0
```

### .highestCard(hand)
Return an array of the cards' values, sorted strongest to weakest.

```js
poker.highestCards('5D AC JS 8C 9S'); // ['A', 'J', '9', '8', '5']
poker.highestCards('2C 5C 7D 8S QH'); // ['Q', '8', '7', '5', '2']
```

### .hasPair(hand)
If the hand has a pair, return the value of the pair, otherwise return `undefined`.

```js
poker.hasPair('5H 5C 6S 7S KD'); // '5'
poker.hasPair('2C 3S 8S 8D TD'); // '8'
poker.hasPair('2C 5C 7D 8S QH'); // undefined
```

### .hasTwoPairs(hand)
If the hand has a two pairs, return an array of the values of the pairs with the strongest first, otherwise return `undefined`.

```js
poker.hasTwoPair('3H 9C 9S 2D 3D'); // ['9', '3']
poker.hasTwoPair('7S 8H 8C KH KS'); // ['K', '8']
poker.hasTwoPair('5H 5C 6S 7S KD'); // undefined
```

### .hasThreeOfAKind(hand)
If the hand has a three of a kind, return the value of the three of a kind, otherwise return `undefined`.

```js
poker.hasThreeOfAKind('3H 9C 9S 2D 9D'); // '9'
poker.hasThreeOfAKind('7S 8H 8C KH KS'); // undefined
```

### .hasStraight(hand)
If the hand has a straight, return the highest value in the straight, otherwise return `undefined`.

```js
poker.hasStraight('8D 6C 5S 7H 4S'); // '8'
poker.hasStraight('7S 8H 8C KH KS'); // undefined
```

### .hasFlush(hand)
If the hand has a flush, return the suit of the flush, otherwise return `undefined`.

```js
poker.hasFlush('3D 6D 7D TD QD'); // 'D'
poker.hasFlush('7S 8H 8C KH KS'); // undefined
```

### .hasFullHouse(hand)
If the hand has a full house, return the value of the three of a kind, otherwise return `undefined`.

```js
poker.hasFullHouse('2H 2D 4C 4D 4S'); // '4'
poker.hasFullHouse('3C 3D 3S 9S 9D'); // '3'
```

### .hasFourOfAKind(hand)
If the hand has a four of a kind, return the value of the four of a kind, otherwise return `undefined`.

```js
poker.hasFourOfAKind('9D 9S KH 9H 9C'); // '9'
poker.hasFourOfAKind('3H 7C 7S 2D 7D'); // undefined
```

### .hasStraightFlush(hand)
If the hand has a straight flush, return the highest value in the straight, otherwise return `undefined`.

```js
poker.hasStraightFlush('4H 3H 6H 5H 7H'); // '7'
poker.hasStraightFlush('9D 9S KH 9H 9C'); // undefined
```

### .hasRoyalFlush(hand)
Return a boolean for if the hand has a royal flush.

```js
poker.hasRoyalFlush('AD KD JD QD TD'); // true
poker.hasRoyalFlush('4D 7D KD QD 2D'); // false
```

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```
$ npm install
$ npm test
```
