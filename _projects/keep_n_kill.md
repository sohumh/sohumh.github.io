---
layout: page
title: Keep And Kill
description: A two player word game with different goals for each player
# img: assets/img/escaperoom.png
importance: 4
category: competitive games
---
**Objective:** The goal is for the guesser to say 4 words without the prompter stopping her.

**Gameplay:** 
1. One player becomes the *guesser* and the other player becomes the *prompter*. 
    - Suppose Greta is the guesser and Shreya is the prompter.
2. The guesser says any word that abides by the restrictions specified by the prompter. Note for the first word, there are no restrictions, so the guesser can say any word. 
    - Greta says `ROOM`. 
3. Then, the prompter says **one spot in the word to kill** and **another spot in the word to keep**. The letter at the spot to kill cannot be the current in all subsequent words, and the letter at the spot to keep must stay the same in all subsquent words.
    - Shreya says to kill `position 3 (i.e. the second O)`, and keep `position 4 (i.e. the M)`. This means that the third letter in all subsquent words cannot be an `O`, and the last letter in all subsequent words must be an `M`. 
4. Steps 2 and 3 repeat until either the guesser says 4 words or is unable to say a word that meets all the restrictions.
    - To finish the example game, suppose Greta says `WORM` as her next word. Notice that this abides by the restrictions given so far since the last letter is `M`, and the letter at the third position is not an `O`. 
    - Then, Shreya decides to keep the `W` and kill the `R`.
        - When there are no duplicate letters, it's quicker to say to kill/keep a given letter rather than a keep/kill position, i.e. say "Keep the R" vs "Keep the letter at position 3", but the meaning of the two are the same.
    - Greta says `WHIM` which doesn't have an R or an O in the third position (notice that restrictions accumulate!) and starts with a W and ends with an M.
    - Shreya decides to keep the `I` and kill the `H`. 
    - Greta is unable to think of a word that starts with a W and ends with an I and M that doesn't have an H in the second spot, and accordingly loses.



