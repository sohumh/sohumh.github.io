---
layout: page
title: Cooperative Wordle
description: A two player, cooperative twist on wordle.
# img: assets/img/escaperoom.png
importance: 2
category: cooperative games
---

**Overview:** This is a two player game where each partner will be given a word that only they know, and each player’s objective is to **guess their partner’s word** while minimizing the total number of **shared guesses**.

**Gameplay:**
- Each “round”, partners will **alternate** adding letters to create a valid 5 letter word, let’s call this the **shared guess**. After the shared guess is formed, each partner will reveal which letters are green or yellow for their word. 
    - Players should alternate starting each round, with the youngest player starting first.
    - The catch is a player cannot contribute a letter in their own word unless there are no possible words that exist. Maybe create a convention to communicate information around this…
- For an example, if Alice’s word is **apple** and Bob’s word is **baton** and Alice starts, they could form the shared guess **cycle** as Alice contributes both **c**’s and the **e**, and Bob contributes the **y** and the **l**. 
    - Observe that Alice contributed the final **e** despite it being in her word because that was the only letter possible.
- After a round finishes, players may **guess** their partner’s word, but guessing incorrectly causes both players to lose!
- We recommend putting your word into [mywordle.me](mywordle.me) and sending your partner a link! 
- If you are stuck trying to think of a five letter word starting with a given prefix, you may go to the website [tinyurl.com/prefixhelper](tinyurl.com/prefixhelper) to find all five letter words of a given prefix!
    - If you do choose to use the site above, your convention cannot leverage its information

**[Our Strategy](https://docs.google.com/presentation/d/14nZ53WbsbPcRj9emxFg3kOhI8_yTAricUxhebNfphk0/edit#slide=id.g11514a71d20_0_11)**
- Please create your own strategy before looking at ours!
- Also, note that ours isn't "optimal" by any means.