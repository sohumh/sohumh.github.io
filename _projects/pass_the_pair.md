---
layout: page
title: Pass the Pair
description: Two letters go in, two different letters come out.
importance: 5
category: standalone puzzles
---

You'll be given a starting pair of letters and a list of words. At each step:

1. **Insert** the pair somewhere inside the word — as a contiguous chunk — so that the result is a new word.
2. **Pull out** a *different* two-letter slice of that new word, such that what remains is *also* a word.
3. The slice you pulled out is the pair you insert into the next word. Repeat.

So every word you build splits two ways: undo the insertion and you get the word you started from; make the other cut and you get a word you throw away.

A quick example of one step: given `RI` and `CARED`, the only insertion that produces a word is `CAR·RI·ED`. Now make a different cut — take the `AR` out of CARRIED and you're left with `CRIED`, which is a word, so the cut is legal and `AR` is the pair you carry into the next word.

Not every insertion can be continued. `TR` into `SONG` gives `S·TR·ONG`, but no other cut of STRONG leaves anything behind — `RONG`, `STNG`, `STRG`, `STRO` — so STRONG is a dead end no matter how good the first move looked. The words below are all 4 or 5 letters, so the words you build are 6 or 7.

---

### The puzzle

**Start with: `AL`**

1. SEED
2. BRING
3. POLE
4. BANS
5. TIGHT

Careful: at several steps there is more than one *legal* cut, and only one of them survives the following word. Every wrong turn is a word you'd happily accept.

---

**Only look below once you've had a real go at it.**

<details>
<summary>
Solution:
</summary>

<br>

| insert | into | word | pull | leaves |
|---|---|---|---|---|
| AL | SEED | SE·**AL**·ED | EA | SLED |
| EA | BRING | B·**EA**·RING | AR | BEING |
| AR | POLE | P·**AR**·OLE | RO | PALE |
| RO | BANS | BA·**RO**·NS | ON | BARS |
| ON | TIGHT | T·**ON**·IGHT | TO | NIGHT |

<br>

**The near misses.** Every step has exactly one insertion that produces a word at all — the difficulty is entirely in choosing the cut. Below is every legal cut at every step, with each leftover's Zipf frequency (a log scale of how often the word actually occurs; below about 2.5 you're into words no one uses):

<pre>
AL + seed  -> sealed:  SE→aled(z2.3)  EA→sled(z3.2)  LE→sead(z1.9)  ED→seal(z4.3)
EA + bring -> bearing: BE→aring(z1.3)  AR→being(z6.0)
AR + pole  -> parole:  PA→role(z5.2)  RO→pale(z4.1)  OL→pare(z2.8)  LE→paro(z2.4)
RO + bans  -> barons:  BA→rons(z1.5)  AR→bons(z2.3)  ON→bars(z4.5)  NS→baro(z2.2)
ON + tight -> tonight: TO→night(z5.6)  NI→toght(z0.0)
</pre>

Only three of the alternates are defensible English — `seal`, `role`, and `pare` — and all three dead-end on the very next word.

<br>

**On uniqueness.** The chain was verified by exhaustive search against a 198,067-word dictionary (words of length 4–7, pooled from Webster's 2nd Unabridged, GCIDE, pyspellchecker, wordfreq's top 500k, and two corpus-derived lists). Exactly one solution exists, with one asterisk: the final cut also admits `toght`, which appears in a single web-scraped list at Zipf 0.0 and is not a word. It sits on the terminal cut, so it changes nothing.

</details>
