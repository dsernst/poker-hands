# poker-hands

Quickly evaluate poker hands.

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
'5H 5C 6S 7S KD'
// is a hand with the 5 of Hearts, 5 of Clubs, 6 of Spades, 7 of Spades, and King of Diamonds.

'2C 3S 8S 8D TD'
// is a hand with the 2 of Clubs, 3 of Spades, 8 of Spades, 8 of Diamonds, and Ten of Diamonds.
```

### .judgeWinner([hand, hand])
Given a tuple of two hands, return the index of the stronger hand.

### .highestCard(hand)
Given a hand, return an array of the cards' values, sorted strongest to weakest.

### .hasPair(hand)
Given a hand, if the hand has a pair, return the value of the pair, otherwise return `undefined`.

### .hasTwoPairs(hand)
Given a hand, if the hand has a two pairs, return an array of the values of the pairs with the strongest first, otherwise return `undefined`.

### .hasThreeOfAKind(hand)
Given a hand, if the hand has a three of a kind, return the value of the three of a kind, otherwise return `undefined`.

### .hasStraight(hand)
Given a hand, if the hand has a straight, return the highest value in the straight, otherwise return `undefined`.

### .hasFlush(hand)
Given a hand, if the hand has a flush, return the suit of the flush, otherwise return `undefined`.

### .hasFullHouse(hand)
Given a hand, if the hand has a full house, return an array of the values of the full house with the three of a kind first, otherwise return `undefined`.

### .hasFourOfAKind(hand)
Given a hand, if the hand has a four of a kind, return the value of the four of a kind, otherwise return `undefined`.

### .hasStraightFlush(hand)
Given a hand, if the hand has a straight flush, return the highest value in the straight, otherwise return `undefined`.

### .hasRoyalFlush(hand)
Given a hand, return a boolean for if the hand has a royal flush.

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

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```
$ npm install
$ npm test
```
