---
layout: page
title: Bachelor Party
description: A layered word search for the bachelor party.
importance: 11
category: standalone puzzles
---

<link rel="stylesheet" href="/assets/css/layered_wordsearch.css">

<div class="layered-wordsearch" data-layered-wordsearch data-bachelor-party-wordsearch>
  <p>
    Drag across the grid to find a word. Words can be found in any direction, including diagonally. When you find a valid word, those letters disappear and reveal letters from the next layer underneath.
  </p>
  <p>
    Note: you may not be able to find every word from the beginning. As you excavate deeper into the word search, new letters and new words will be uncovered.
  </p>

  <div class="lws-hidden-config" aria-hidden="true">
    <textarea id="lws-layers" data-lws-layers spellcheck="false">CWLIFTS
FACTIOU
UPOSAGG
EAIOYLI
RRKMAOR
SWIEBHB
CSBNURR

EUIELMN
LVTINEB
DOLHKND
OGOCYRA
YRIOSHY
AHITCEO
MUEAMAN</textarea>
    <textarea id="lws-words" data-lws-words spellcheck="false">ABHI BEARD BONITA BOYS CHICKEN COOKIE GYM ITALY LIFT MIHIRA RAP RESOLVE RUN SUGAR SWITCH UFC</textarea>
    <script type="application/json" data-lws-placements>[{"word":"CHICKEN","row":6,"col":0,"direction":"NE","path":[[6,0],[5,1],[4,2],[3,3],[2,4],[1,5],[0,6]],"stack_heights_before":[0,0,0,0,0,0,0],"final_layers_top_to_bottom":[0,1,1,1,1,1,1]},{"word":"RESOLVE","row":6,"col":6,"direction":"NW","path":[[6,6],[5,5],[4,4],[3,3],[2,2],[1,1],[0,0]],"stack_heights_before":[0,0,0,1,0,0,0],"final_layers_top_to_bottom":[0,1,1,0,1,1,1]},{"word":"BONITA","row":1,"col":6,"direction":"W","path":[[1,6],[1,5],[1,4],[1,3],[1,2],[1,1]],"stack_heights_before":[0,1,0,0,0,1],"final_layers_top_to_bottom":[1,0,1,1,1,0]},{"word":"COOKIE","row":1,"col":2,"direction":"S","path":[[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]],"stack_heights_before":[1,1,0,1,0,0],"final_layers_top_to_bottom":[0,0,1,0,1,1]},{"word":"MIHIRA","row":0,"col":5,"direction":"SW","path":[[0,5],[1,4],[2,3],[3,2],[4,1],[5,0]],"stack_heights_before":[0,1,0,1,0,0],"final_layers_top_to_bottom":[1,0,1,0,1,1]},{"word":"SWITCH","row":5,"col":0,"direction":"E","path":[[5,0],[5,1],[5,2],[5,3],[5,4],[5,5]],"stack_heights_before":[1,1,1,0,0,1],"final_layers_top_to_bottom":[0,0,0,1,1,0]},{"word":"BEARD","row":6,"col":2,"direction":"NE","path":[[6,2],[5,3],[4,4],[3,5],[2,6]],"stack_heights_before":[1,1,1,0,0],"final_layers_top_to_bottom":[0,0,0,1,1]},{"word":"ITALY","row":0,"col":2,"direction":"SE","path":[[0,2],[1,3],[2,4],[3,5],[4,6]],"stack_heights_before":[0,1,1,1,0],"final_layers_top_to_bottom":[1,0,0,0,1]},{"word":"SUGAR","row":0,"col":6,"direction":"S","path":[[0,6],[1,6],[2,6],[3,6],[4,6]],"stack_heights_before":[1,1,1,0,1],"final_layers_top_to_bottom":[0,0,0,1,0]},{"word":"ABHI","row":6,"col":3,"direction":"NE","path":[[6,3],[5,4],[4,5],[3,6]],"stack_heights_before":[0,1,0,1],"final_layers_top_to_bottom":[1,0,1,0]},{"word":"BOYS","row":5,"col":6,"direction":"NW","path":[[5,6],[4,5],[3,4],[2,3]],"stack_heights_before":[0,1,0,1],"final_layers_top_to_bottom":[0,0,1,0]},{"word":"LIFT","row":0,"col":2,"direction":"E","path":[[0,2],[0,3],[0,4],[0,5]],"stack_heights_before":[1,0,0,1],"final_layers_top_to_bottom":[0,0,0,0]},{"word":"GYM","row":2,"col":5,"direction":"SW","path":[[2,5],[3,4],[4,3]],"stack_heights_before":[0,1,0],"final_layers_top_to_bottom":[0,0,0]},{"word":"RAP","row":4,"col":1,"direction":"N","path":[[4,1],[3,1],[2,1]],"stack_heights_before":[1,0,0],"final_layers_top_to_bottom":[0,0,0]},{"word":"RUN","row":6,"col":5,"direction":"W","path":[[6,5],[6,4],[6,3]],"stack_heights_before":[0,0,1],"final_layers_top_to_bottom":[0,0,0]},{"word":"UFC","row":2,"col":0,"direction":"N","path":[[2,0],[1,0],[0,0]],"stack_heights_before":[0,0,1],"final_layers_top_to_bottom":[0,0,0]}]</script>
    <button data-lws-build type="button">Build puzzle</button>
  </div>

  <div class="lws-grid-layout">
    <section class="lws-panel lws-game-panel">
      <div class="lws-status" data-lws-status>Build the puzzle, then drag across letters.</div>
      <div class="lws-readout" aria-live="polite">
        <span class="lws-pill">Time: <strong data-lws-timer>0:00</strong></span>
        <span class="lws-pill" data-lws-rank>Targets: 10 / 15 / 20 / 25 min</span>
        <span class="lws-pill">Selected: <strong data-lws-selected-word>—</strong></span>
        <span class="lws-pill" data-lws-validity>Waiting for selection</span>
      </div>
      <div class="lws-final-message" data-lws-final-message aria-live="polite"></div>
      <div class="lws-board-wrap">
        <div class="lws-board" data-lws-board aria-label="Bachelor Party layered word search board"></div>
      </div>
      <div class="lws-legend" data-lws-legend></div>
      <h3 style="margin-top: 1rem">Words</h3>
      <ul class="lws-word-list" data-lws-word-list></ul>
    </section>
  </div>
</div>

<script src="/assets/js/layered_wordsearch.js"></script>
<script>
  (() => {
    const originalBuildPuzzle = window.LayeredWordSearch.prototype.buildPuzzle;

    window.LayeredWordSearch.prototype.buildPuzzle = function () {
      originalBuildPuzzle.call(this);
      if (!this.root.matches('[data-bachelor-party-wordsearch]')) return;

      this.finalMessageSpaceBefore = new Set([4, 8]);
      this.startTimer();
    };
  })();
</script>
