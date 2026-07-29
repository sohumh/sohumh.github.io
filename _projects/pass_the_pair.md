---
layout: page
title: Pass the Pair
description: Two letters go in, two different letters come out.
importance: 5
category: standalone puzzles
---

You'll be given a starting pair of letters and a list of words. At each step:

1. **Insert** the pair somewhere inside the next word — as a contiguous chunk — so that the result is a new word.
2. **Pull out** a *different* two-letter slice of that new word, such that what remains is *also* a word.
3. The slice you pulled out is the pair you insert into the next word. Repeat.

So every word you build splits two ways: undo the insertion and you get the word you started from; make the other cut and you get a word you throw away.

A quick example of one step: given `RI` and `CARED` --> `CAR·RI·ED`. Then, you could remove the `AR` out of CARRIED and you're left with `CRIED`. Note that you couldn't remove the `IE` slice out of CARRIED, because `CARRD` is not a word, nor could you remove the `RI` because the new two-letter slice must be different.

---

### The puzzle

**Start with: `AL`**

1. SEED
2. BRING
3. POLE
4. BANS
5. TIGHT

---

<details>
<summary>
Solution:
</summary>

<br>

<table>
  <thead>
    <tr><th>insert</th><th>into</th><th>word</th><th>pull</th><th>leaves</th></tr>
  </thead>
  <tbody>
    <tr><td>AL</td><td>SEED</td><td>SE·<b>AL</b>·ED</td><td>EA</td><td>SLED</td></tr>
    <tr><td>EA</td><td>BRING</td><td>B·<b>EA</b>·RING</td><td>AR</td><td>BEING</td></tr>
    <tr><td>AR</td><td>POLE</td><td>P·<b>AR</b>·OLE</td><td>RO</td><td>PALE</td></tr>
    <tr><td>RO</td><td>BANS</td><td>BA·<b>RO</b>·NS</td><td>ON</td><td>BARS</td></tr>
    <tr><td>ON</td><td>TIGHT</td><td>T·<b>ON</b>·IGHT</td><td>TO</td><td>NIGHT</td></tr>
  </tbody>
</table>

<br>

</details>
