---
layout: page
title: Mathy Marriage
description: Match every woman to a man with arithmetic.
img: assets/img/marbles.png
importance: 5
category: puzzles
---
Each puzzle consists of a list of `women`, `men`, and `numbers`, where the `women` and `men` are numbers themselves. The goal is to apply arithmetic operations on `women` using numbers from `numbers` so that each woman is changed to be equal to one unique man. A number in `numbers` must be used exactly once.

Finally, the arithmetic operations consist of:
- multiplication
- division (must divide cleanly)
- addition
- subtraction
and each arithmetic operation must be applied to the woman, e.g. `operation_two(operation_one(woman, num_one), num_two)`. 

Admittedly, this may appear a bit confusing, so let's see an example! Suppose we have the women, men, and numbers below:
- women:  [19, 15, 22]
- men: [20, 2, 3]
- numbers: [4, 2, 5, 4, 5]

Then, a possible solution is the following:
- woman 19 matched with man 2: ((19 + **5**) / **4**) - **4**
- woman 15 matched with man 3: 15 / **5**
- woman 22 matched with man 20: 22 - **2**

Observe that:
- each number in `numbers` is used exactly once. See the bolded numbers above. 
- each woman is matched to a unique man who doesn't necessarily appear at the same index as her. 

Without further ado, here are some challenges!


```python
women:  [2, 20, 24]
men: [9, 23, 22]
numbers: [2, 4, 3, 4, 2]
```
<details> 
<summary>
Solution:
</summary>

- women 0 matched with man 0: ((2 / 2) + 4) + 4
- women 1 matched with man 1: 20 + 3
- women 2 matched with man 2: 24 - 2

</details>

- women:  [2, 20, 24]
- men: [9, 23, 22]
- numbers: [2, 4, 3, 4, 2]
<details> 
<summary>
Solution:
</summary>

```python
women 0 matched with man 0: ((2 / 2) + 4) + 4
women 1 matched with man 1: 20 + 3
women 2 matched with man 2: 24 - 2
```

</details>

----------
----------
women:  [24, 1, 11]
men: [12, 9, 8]
numbers: [6, 3, 4, 6, 4]
Solution: 
women 0 matched with man 0: (24 - 6) - 6
women 1 matched with man 1: (1 + 4) + 4
women 2 matched with man 2: 11 - 3

----------
----------
women:  [23, 8, 17]
men: [1, 11, 4]
numbers: [5, 6, 4, 5, 3]
Solution: 
women 0 matched with man 0: ((23 - 5) / 3) - 5
women 1 matched with man 2: 8 - 4
women 2 matched with man 1: 17 - 6

----------
----------
women:  [11, 13, 15]
men: [18, 7, 8]
numbers: [4, 6, 1, 2, 2]
Solution: 
women 0 matched with man 0: (11 * 2) - 4
women 1 matched with man 1: 13 - 6
women 2 matched with man 2: (15 + 1) / 2

----------
----------
women:  [6, 2, 15]
men: [1, 23, 19]
numbers: [2, 2, 7, 1, 5]
Solution: 
women 0 matched with man 1: (6 * 5) - 7
women 1 matched with man 0: 2 - 1
women 2 matched with man 2: (15 + 2) + 2

----------
----------
women:  [9, 8, 7]
men: [24, 2, 4]
numbers: [4, 2, 2, 6, 6]
Solution: 
women 0 matched with man 0: (9 * 2) + 6
women 1 matched with man 2: 8 - 4
women 2 matched with man 1: (7 - 6) * 2

----------
----------
women:  [11, 6, 7]
men: [10, 20, 2]
numbers: [1, 7, 2, 6, 7]
Solution: 
women 0 matched with man 0: 11 - 1
women 1 matched with man 1: (6 + 7) + 7
women 2 matched with man 2: (7 - 6) * 2

----------
----------
women:  [15, 24, 19]
men: [2, 7, 12]
numbers: [5, 6, 3, 2, 3]
Solution: 
women 0 matched with man 2: 15 - 3
women 1 matched with man 0: (24 / 3) - 6
women 2 matched with man 1: (19 - 5) / 2

----------
----------
women:  [15, 11, 16]
men: [7, 18, 9]
numbers: [5, 4, 2, 4, 4]
Solution: 
women 0 matched with man 2: ((15 + 5) / 4) + 4
women 1 matched with man 0: 11 - 4
women 2 matched with man 1: 16 + 2

----------
----------
women:  [23, 1, 3]
men: [7, 20, 4]
numbers: [4, 5, 7, 7, 5]
Solution: 
women 0 matched with man 2: (23 - 7) / 4
women 1 matched with man 0: 1 * 7
women 2 matched with man 1: (3 * 5) + 5

----------