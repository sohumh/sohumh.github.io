---
layout: page
title: Interweave
description: A puzzle where atone works but stone doesn't 
importance: 6
img: assets/img/interweavewords.png
category: standalone puzzles
---

Given the words:

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  padding: 10px;
}

.grid-item {
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
  cursor: pointer; /* change cursor to hand pointer on hover */
}

.strikethrough {
  text-decoration: line-through;
  border: 0px solid #ccc;
  
}
</style>

<div class="grid-container">
  <div class="grid-item">top</div>
  <div class="grid-item">car</div>
  <div class="grid-item">bra</div>
  <div class="grid-item">gel</div>
  <div class="grid-item">hey</div>
  <div class="grid-item">she</div>
  <div class="grid-item">big</div>
  <div class="grid-item">and</div>
  <div class="grid-item">son</div>
  <div class="grid-item">eat</div>
  <div class="grid-item">am</div>
  <div class="grid-item">an</div>
  <div class="grid-item">he</div>
  <div class="grid-item">in</div>
  <div class="grid-item">my</div>
  <div class="grid-item">no</div>
  <div class="grid-item">on</div>
  <div class="grid-item">hi</div>
  <div class="grid-item">we</div>
</div>

<script>
const items = document.querySelectorAll('.grid-item');

items.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('strikethrough');
  });
});
</script>


Create nine 5 letter words, where every 5 letter word contains a two letter word above "interwoven" with a three letter word. The interweaving of two words should preserve the relative order of each word and the new word should contain all the letters of both words. For instance, `AT` and `PAR` can be merged to make `APART`. Also, no two letter word should fill the same positions as any other two letter word, as indicated by the blue circles the answer template below. For instance, since `AT` filled the first and last letters of `APART`, we couldn’t fill just those two letters again. 

After creating the nine words, you’ll notice one three letter word is not used and one blank in the template is not used. Determine the missing two letter word in the missing configuration. Note that words on the same row in the table above are not necessarily meant to be interwoven. 

Tip: Use Tab and Shift Tab to "quickly" enter and remove words in the template. Also, clicking on a word in the list above will strike it through. 

<style>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.box-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #f6f6f6;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 180px;
    margin: 10px;
}


.box-container-solution {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #CFFACE;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 180px;
    margin: 10px;
}

.circle {
    border-radius: 50%;
    border: 1px solid #0000ff; /* Blue border */
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    background-color: #fff;
    font-weight: bold;
    color: #000080; /* Dark Blue text */
}

.circle-sol {
    border-radius: 50%;
    border: 1px solid #0000ff; /* Blue border */
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    background-color: #CED8FA;
    font-weight: bold;
    color: #000080; /* Dark Blue text */
}

.rectangle {
    border: 1px solid #ff0000; /* Red border */
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    background-color: #fff;
    font-weight: bold;
    color: #8b0000; /* Dark Red text */
}
</style>


<div class="container">
    <!-- First combination: Circles at position 1, 2 -->
    <div class="box-container">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    </div>

    <!-- Second combination: Circles at position 1, 3 -->
    <div class="box-container">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    </div>

    <!-- Third combination: Circles at position 1, 4 -->
    <div class="box-container">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    </div>

    <!-- Fourth combination: Circles at position 1, 5 -->
    <div class="box-container">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    </div>

    <!-- Fifth combination: Circles at position 2, 3 -->
    <div class="box-container">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    </div>

    <!-- Sixth combination: Circles at position 2, 4 -->
    <div class="box-container">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    </div>

    <!-- Seventh combination: Circles at position 2, 5 -->
    <div class="box-container">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    </div>

    <!-- Eighth combination: Circles at position 3, 4 -->
    <div class="box-container">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    </div>

    <!-- Ninth combination: Circles at position 3, 5 -->
    <div class="box-container">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    </div>

    <!-- Tenth combination: Circles at position 4, 5 -->
    <div class="box-container">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="rectangle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    <input type="text" class="circle" maxlength="1">
    </div>
</div>



<details>
<summary>
Solution:
</summary>

<br>
Answer: "SO"
<br>
<br>
<div class="container">
    <!-- First combination: Circles at position 1, 2 -->
    <div class="box-container">
    <input type="text" class="circle" value="A" readonly>
    <input type="text" class="circle" value="N" readonly>
    <input type="text" class="rectangle" value="g" readonly>
    <input type="text" class="rectangle" value="e" readonly>
    <input type="text" class="rectangle" value="l" readonly>
    </div>

    <!-- Second combination: Circles at position 1, 3 -->
    <div class="box-container-solution">
    <input type="text" class="circle-sol" value="S" readonly>
    <input type="text" class="rectangle" value="t" readonly>
    <input type="text" class="circle-sol" value="O" readonly>
    <input type="text" class="rectangle" value="o" readonly>
    <input type="text" class="rectangle" value="p" readonly>
    </div>

    <!-- Third combination: Circles at position 1, 4 -->
    <div class="box-container">
    <input type="text" class="circle" value="W" readonly>
    <input type="text" class="rectangle" value="a" readonly>
    <input type="text" class="rectangle" value="n" readonly>
    <input type="text" class="circle" value="E" readonly>
    <input type="text" class="rectangle" value="d" readonly>
    </div>

    <!-- Fourth combination: Circles at position 1, 5 -->
    <div class="box-container">
    <input type="text" class="circle" value="M" readonly>
    <input type="text" class="rectangle" value="e" readonly>
    <input type="text" class="rectangle" value="a" readonly>
    <input type="text" class="rectangle" value="t" readonly>
    <input type="text" class="circle" value="Y" readonly>
    </div>

    <!-- Fifth combination: Circles at position 2, 3 -->
    <div class="box-container">
    <input type="text" class="rectangle" value="h" readonly>
    <input type="text" class="circle" value="O" readonly>
    <input type="text" class="circle" value="N" readonly>
    <input type="text" class="rectangle" value="e" readonly>
    <input type="text" class="rectangle" value="y" readonly>
    </div>

    <!-- Sixth combination: Circles at position 2, 4 -->
    <div class="box-container">
    <input type="text" class="rectangle" value="c" readonly>
    <input type="text" class="circle" value="H" readonly>
    <input type="text" class="rectangle" value="a" readonly>
    <input type="text" class="circle" value="I" readonly>
    <input type="text" class="rectangle" value="r" readonly>
    </div>

    <!-- Seventh combination: Circles at position 2, 5 -->
    <div class="box-container">
    <input type="text" class="rectangle" value="s" readonly>
    <input type="text" class="circle" value="H" readonly>
    <input type="text" class="rectangle" value="o" readonly>
    <input type="text" class="rectangle" value="n" readonly>
    <input type="text" class="circle" value="E" readonly>
    </div>

    <!-- Eighth combination: Circles at position 3, 4 -->
    <div class="box-container">
    <input type="text" class="rectangle" value="s" readonly>
    <input type="text" class="rectangle" value="h" readonly>
    <input type="text" class="circle" value="A" readonly>
    <input type="text" class="circle" value="M" readonly>
    <input type="text" class="rectangle" value="e" readonly>
    </div>

    <!-- Ninth combination: Circles at position 3, 5 -->
    <div class="box-container">
    <input type="text" class="rectangle" value="b" readonly>
    <input type="text" class="rectangle" value="i" readonly>
    <input type="text" class="circle" value="N" readonly>
    <input type="text" class="rectangle" value="g" readonly>
    <input type="text" class="circle" value="O" readonly>
    </div>

    <!-- Tenth combination: Circles at position 4, 5 -->
    <div class="box-container">
    <input type="text" class="rectangle" value="b" readonly>
    <input type="text" class="rectangle" value="r" readonly>
    <input type="text" class="rectangle" value="a" readonly>
    <input type="text" class="circle" value="I" readonly>
    <input type="text" class="circle" value="N" readonly>
    </div>
</div>

</details>