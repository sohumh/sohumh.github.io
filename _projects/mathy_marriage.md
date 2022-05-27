---
layout: page
title: Mathy Marriage
description: Match every woman to a man with arithmetic.
img: assets/img/mathy.png
importance: 5
category: puzzles
---

Each puzzle consists of a list of `women`, `men`, and `numbers`, where the `women` and `men` are numbers themselves. The goal is to apply arithmetic operations on `women` using numbers from `numbers` so that each woman is changed to be equal to one unique man. A number in `numbers` can be used only once.

Finally, the arithmetic operations consist of:
- addition
- subtraction
- multiplication
- division (must divide cleanly)

Each arithmetic operation must be applied to the woman, e.g. `operation_two(operation_one(woman, num_one), num_two)`. 

Admittedly, this may appear a bit confusing, so let's see an example! Suppose we have the women, men, and numbers below:
```python
women:  [19, 15, 22]
men: [20, 2, 3]
numbers: [4, 2, 5, 4, 5]
```

Then, a possible solution is the following:
```ruby
woman 19 matched with man 2: ((19 + 5) / 4) - 4
woman 15 matched with man 3: 15 / 5
woman 22 matched with man 20: 22 - 2
```

Observe that:
- Each number in `numbers` is used at most once, e.g. the only time the `2` is used is in the operation `22 - 2`. Most solutions will require all to be used, but some may not!
- Each woman is matched to a unique man who doesn't necessarily appear at the same index as her. 

Without further ado, here are some challenges. Grab some paper and a pencil and enjoy! Each puzzle was created [programmatically](https://github.com/sohumh/mathy-marriage), and is ensured to only have one solution!

**Puzzle Difficulties:**
* TOC
{:toc}
---
## Mild
**Two Pairs, Three Numbers**

---

**Puzzle 1:**
```python
women:  [14, 22]
men:  [24, 23]
numbers:  [5, 2, 2]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 14 matched with man 23: (14 * 2) - 5
woman 22 matched with man 24: 22 + 2
{% endhighlight %}

</details>
---

**Puzzle 2:**
```python
women:  [24, 15]
men:  [13, 10]
numbers:  [2, 6, 3]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 24 matched with man 10: (24 + 6) / 3
woman 15 matched with man 13: 15 - 2
{% endhighlight %}

</details>
---

**Puzzle 3:**
```python
women:  [20, 8]
men:  [4, 2]
numbers:  [3, 5, 2]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 20 matched with man 4: 20 / 5
woman 8 matched with man 2: (8 - 2) / 3
{% endhighlight %}

</details>
---

**Puzzle 4:**
```python
women:  [8, 23]
men:  [17, 1]
numbers:  [6, 2, 3]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 8 matched with man 1: (8 / 2) - 3
woman 23 matched with man 17: 23 - 6
{% endhighlight %}

</details>
---

**Puzzle 5:**
```python
women:  [16, 7]
men:  [14, 24]
numbers:  [2, 5, 2]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 16 matched with man 14: 16 - 2
woman 7 matched with man 24: (7 + 5) * 2
{% endhighlight %}

</details>
---

**Puzzle 6:**
```python
women:  [23, 6]
men:  [11, 16]
numbers:  [1, 2, 7]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 23 matched with man 16: 23 - 7
woman 6 matched with man 11: (6 * 2) - 1
{% endhighlight %}

</details>
---

**Puzzle 7:**
```python
women:  [16, 7]
men:  [4, 18]
numbers:  [2, 4, 4]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 16 matched with man 4: 16 / 4
woman 7 matched with man 18: (7 * 2) + 4
{% endhighlight %}

</details>
---

**Puzzle 8:**
```python
women:  [5, 24]
men:  [12, 11]
numbers:  [3, 7, 3]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 5 matched with man 12: 5 + 7
woman 24 matched with man 11: (24 / 3) + 3
{% endhighlight %}

</details>
---

**Puzzle 9:**
```python
women:  [13, 10]
men:  [24, 8]
numbers:  [4, 2, 5]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 13 matched with man 8: 13 - 5
woman 10 matched with man 24: (10 * 2) + 4
{% endhighlight %}

</details>
---

**Puzzle 10:**
```python
women:  [7, 14]
men:  [19, 18]
numbers:  [3, 2, 4]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 7 matched with man 19: (7 * 3) - 2
woman 14 matched with man 18: 14 + 4
{% endhighlight %}

</details>
---

## Medium
**Two Pairs, Four Numbers**

---

**Puzzle 1:**
```python
women:  [3, 23]
men:  [14, 12]
numbers:  [7, 1, 2, 7]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 3 matched with man 14: (3 * 7) - 7
woman 23 matched with man 12: (23 + 1) / 2
{% endhighlight %}

</details>
---

**Puzzle 2:**
```python
women:  [1, 11]
men:  [14, 4]
numbers:  [1, 4, 1, 1]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 1 matched with man 4: 1 * 4
woman 11 matched with man 14: ((11 + 1) + 1) + 1
{% endhighlight %}

</details>
---

**Puzzle 3:**
```python
women:  [23, 5]
men:  [3, 12]
numbers:  [5, 2, 2, 2]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 23 matched with man 12: ((23 + 5) / 2) - 2
woman 5 matched with man 3: 5 - 2
{% endhighlight %}

</details>
---

**Puzzle 4:**
```python
women:  [24, 6]
men:  [16, 7]
numbers:  [5, 2, 2, 2]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 24 matched with man 7: (24 / 2) - 5
woman 6 matched with man 16: (6 + 2) * 2
{% endhighlight %}

</details>
---

**Puzzle 5:**
```python
women:  [5, 21]
men:  [2, 12]
numbers:  [2, 3, 2, 4]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 5 matched with man 2: (5 - 4) * 2
woman 21 matched with man 12: (21 + 3) / 2
{% endhighlight %}

</details>
---

**Puzzle 6:**
```python
women:  [17, 23]
men:  [11, 15]
numbers:  [5, 4, 6, 4]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 17 matched with man 11: 17 - 6
woman 23 matched with man 15: (23 - 4) - 4
{% endhighlight %}

</details>
---

**Puzzle 7:**
```python
women:  [10, 24]
men:  [15, 1]
numbers:  [3, 4, 7, 2]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 10 matched with man 1: (10 / 2) - 4
woman 24 matched with man 15: (24 / 3) + 7
{% endhighlight %}

</details>
---

**Puzzle 8:**
```python
women:  [9, 21]
men:  [15, 19]
numbers:  [2, 2, 7, 7]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 9 matched with man 15: ((9 + 7) / 2) + 7
woman 21 matched with man 19: 21 - 2
{% endhighlight %}

</details>
---

**Puzzle 9:**
```python
women:  [14, 23]
men:  [5, 12]
numbers:  [1, 2, 1, 4]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 14 matched with man 12: 14 - 2
woman 23 matched with man 5: ((23 + 1) / 4) - 1
{% endhighlight %}

</details>
---

**Puzzle 10:**
```python
women:  [17, 18]
men:  [21, 23]
numbers:  [3, 5, 5, 5]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 17 matched with man 21: ((17 - 5) - 5) * 3
woman 18 matched with man 23: 18 + 5
{% endhighlight %}

</details>
---


## Hot
**Three Pairs, Five Numbers**

---

**Puzzle 1:**
```python
women:  [18, 20, 21]
men:  [14, 5, 13]
numbers:  [4, 4, 7, 4, 4]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 18 matched with man 14: 18 - 4
woman 20 matched with man 5: 20 / 4
woman 21 matched with man 13: (21 - 4) - 4
{% endhighlight %}

</details>
---

**Puzzle 2:**
```python
women:  [19, 15, 22]
men:  [20, 2, 3]
numbers:  [4, 2, 5, 4, 5]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 19 matched with man 2: ((19 + 5) / 4) - 4
woman 15 matched with man 3: 15 / 5
woman 22 matched with man 20: 22 - 2
{% endhighlight %}

</details>
---

**Puzzle 3:**
```python
women:  [1, 13, 3]
men:  [23, 9, 6]
numbers:  [7, 2, 7, 4, 1]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 1 matched with man 6: (1 * 7) - 1
woman 13 matched with man 9: 13 - 4
woman 3 matched with man 23: (3 * 7) + 2
{% endhighlight %}

</details>
---

**Puzzle 4:**
```python
women:  [18, 5, 16]
men:  [11, 19, 8]
numbers:  [3, 4, 4, 4, 5]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 18 matched with man 19: ((18 * 4) + 4) / 4
woman 5 matched with man 8: 5 + 3
woman 16 matched with man 11: 16 - 5
{% endhighlight %}

</details>
---

**Puzzle 5:**
```python
women:  [12, 16, 1]
men:  [19, 14, 21]
numbers:  [5, 1, 5, 7, 4]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 12 matched with man 19: 12 + 7
woman 16 matched with man 21: 16 + 5
woman 1 matched with man 14: ((1 + 1) * 5) + 4
{% endhighlight %}

</details>
---

**Puzzle 6:**
```python
women:  [7, 14, 6]
men:  [8, 15, 20]
numbers:  [1, 1, 4, 4, 7]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 7 matched with man 8: 7 + 1
woman 14 matched with man 15: 14 + 1
woman 6 matched with man 20: (6 * 4) - 4
{% endhighlight %}

</details>
---

**Puzzle 7:**
```python
women:  [22, 15, 13]
men:  [21, 2, 18]
numbers:  [3, 5, 2, 6, 2]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 22 matched with man 18: (22 - 2) - 2
woman 15 matched with man 21: 15 + 6
woman 13 matched with man 2: (13 - 3) / 5
{% endhighlight %}

</details>
---

**Puzzle 8:**
```python
women:  [11, 18, 21]
men:  [8, 3, 16]
numbers:  [5, 2, 1, 5, 4]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 11 matched with man 3: (11 + 4) / 5
woman 18 matched with man 8: (18 / 2) - 1
woman 21 matched with man 16: 21 - 5
{% endhighlight %}

</details>
---

**Puzzle 9:**
```python
women:  [22, 7, 24]
men:  [10, 2, 20]
numbers:  [2, 2, 7, 1, 2]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 22 matched with man 20: 22 - 2
woman 7 matched with man 2: (7 / 7) + 1
woman 24 matched with man 10: (24 / 2) - 2
{% endhighlight %}

</details>
---

**Puzzle 10:**
```python
women:  [20, 8, 7]
men:  [2, 3, 4]
numbers:  [1, 7, 5, 3, 3]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 20 matched with man 4: 20 / 5
woman 8 matched with man 3: (8 - 7) * 3
woman 7 matched with man 2: (7 - 1) / 3
{% endhighlight %}

</details>
---

## Habanero
**Four Pairs, Six Numbers**

---

**Puzzle 1:**
```python
women:  [7, 3, 20, 6]
men:  [8, 10, 23, 19]
numbers:  [5, 5, 3, 5, 5, 1]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 7 matched with man 10: (7 - 5) * 5
woman 3 matched with man 8: 3 + 5
woman 20 matched with man 19: 20 - 1
woman 6 matched with man 23: (6 * 3) + 5
{% endhighlight %}

</details>
---

**Puzzle 2:**
```python
women:  [20, 4, 24, 19]
men:  [9, 8, 3, 6]
numbers:  [5, 7, 2, 2, 4, 2]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 20 matched with man 8: (20 / 2) - 2
woman 4 matched with man 9: 4 + 5
woman 24 matched with man 6: 24 / 4
woman 19 matched with man 3: (19 + 2) / 7
{% endhighlight %}

</details>
---

**Puzzle 3:**
```python
women:  [20, 21, 19, 10]
men:  [17, 2, 14, 9]
numbers:  [1, 5, 1, 1, 3, 6]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 20 matched with man 14: 20 - 6
woman 21 matched with man 2: (21 / 3) - 5
woman 19 matched with man 17: (19 - 1) - 1
woman 10 matched with man 9: 10 - 1
{% endhighlight %}

</details>
---

**Puzzle 4:**
```python
women:  [9, 24, 3, 5]
men:  [8, 20, 21, 19]
numbers:  [2, 1, 2, 3, 4, 1]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 9 matched with man 19: (9 * 2) + 1
woman 24 matched with man 21: 24 - 3
woman 3 matched with man 8: (3 + 1) * 2
woman 5 matched with man 20: 5 * 4
{% endhighlight %}

</details>
---

**Puzzle 5:**
```python
women:  [23, 8, 3, 22]
men:  [4, 6, 16, 20]
numbers:  [6, 1, 3, 7, 7, 6]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 23 matched with man 20: 23 - 3
woman 8 matched with man 6: (8 - 7) * 6
woman 3 matched with man 4: 3 + 1
woman 22 matched with man 16: 22 - 6
{% endhighlight %}

</details>
---

**Puzzle 6:**
```python
women:  [23, 20, 1, 7]
men:  [16, 13, 14, 4]
numbers:  [3, 3, 2, 5, 5, 4]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 23 matched with man 13: (23 - 5) - 5
woman 20 matched with man 16: 20 - 4
woman 1 matched with man 4: 1 + 3
woman 7 matched with man 14: 7 * 2
{% endhighlight %}

</details>
---

**Puzzle 7:**
```python
women:  [4, 21, 7, 20]
men:  [17, 9, 15, 13]
numbers:  [2, 4, 6, 6, 2, 7]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 4 matched with man 15: ((4 * 6) + 6) / 2
woman 21 matched with man 17: 21 - 4
woman 7 matched with man 9: 7 + 2
woman 20 matched with man 13: 20 - 7
{% endhighlight %}

</details>
---

**Puzzle 8:**
```python
women:  [21, 7, 18, 5]
men:  [15, 24, 4, 11]
numbers:  [5, 7, 4, 6, 7, 5]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 21 matched with man 4: (21 + 7) / 7
woman 7 matched with man 11: 7 + 4
woman 18 matched with man 24: 18 + 6
woman 5 matched with man 15: (5 + 5) + 5
{% endhighlight %}

</details>
---

**Puzzle 9:**
```python
women:  [21, 23, 1, 6]
men:  [3, 24, 15, 16]
numbers:  [6, 3, 6, 1, 7, 6]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 21 matched with man 15: 21 - 6
woman 23 matched with man 16: 23 - 7
woman 1 matched with man 3: 1 * 3
woman 6 matched with man 24: ((6 - 1) * 6) - 6
{% endhighlight %}

</details>
---

**Puzzle 10:**
```python
women:  [9, 24, 19, 5]
men:  [18, 17, 23, 14]
numbers:  [7, 4, 4, 6, 3, 4]
```
<details>
<summary>
Solution:
</summary>

{% highlight ruby %}
woman 9 matched with man 17: (9 + 4) + 4
woman 24 matched with man 18: 24 - 6
woman 19 matched with man 23: 19 + 4
woman 5 matched with man 14: (5 - 3) * 7
{% endhighlight %}

</details>
---

