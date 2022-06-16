---
layout: page
title: Cooperative Bulls and Cows
description: A cooperative twist on the classic game
# img: assets/img/escaperoom.png
importance: 5
category: cooperative games
---

**Objective:** The goal is for every player to determine their word while **minimizing** the total number of turns taken.

**Gameplay:** 
- It is a turn based game, the youngest player starts, and turns proceed clockwise.
- Each person has a unique 4 letter word. You know everyone’s word *except* your own. 
    - To distribute words, the player to your left can write your word on a phone/sticky note, and then hand it to you.
    - If you'd like, you can have the 4 letter word have no duplicated letters, but that's not required.
- The team wins if everyone successfully guesses their own word.
- On a given turn, you can:
    - **alter** the previously stated word by changing the letter at *one* spot in the word **and** anagramming, i.e. unscrambling, the resulting word. Note you don't need to anagram the resulting word, but you do need to change exactly one letter.
        - For instance, if the last word was `rate`, you could say `rave` or `tray`, but not `tear` (since the letters are all the same) or `rile` (since more than one letter is changed). 
    - **reveal** the [bulls and cows](https://en.wikipedia.org/wiki/Bulls_and_Cows#The_word_version) in the current word for a given player.
         - For instance, if `beak` was changed to `bike` and Shreya's word is `belt`, you could tell her `bike` has 1 cow and 1 bull.
- Players can keep playing until all players guessed their word correctly. 
    - A player can guess their word at any time, out of turn and independent of the sequence. An incorrect guess is failure, though.
    - Once a player guesses their word, they can keep playing to give the remaining players information.
- This game transfers nicely to the two player version, where each player just thinks of the other player's word. 
