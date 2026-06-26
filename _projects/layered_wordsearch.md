---
layout: page
title: Layered Word Search
description: Find hidden words by excavating stacked word-search layers.
importance: 2
category: standalone puzzles
---

<link rel="stylesheet" href="{{ '/assets/css/layered_wordsearch.css' | relative_url }}">

<div class="layered-wordsearch" data-layered-wordsearch>
  <p>
    Drag across the grid to find an animal. When you find a valid word, those letters disappear and reveal letters from the next layer underneath.
  </p>
  <p>
    Note: you may not be able to find every word from the beginning. As you excavate deeper into the word search, new letters and new words will be uncovered.
  </p>

  <div class="lws-hidden-config" aria-hidden="true">
    <textarea id="lws-layers" data-lws-layers spellcheck="false">FISHBAUD
OLGOEMOD
XNAOEBIA
HLAACINR
BSEAGTKG
REOYOOAT
SCAOELAB
EECRGCOW

FORRKNRC
EBAATGRE
DAEIALRE
EBBDGABA
AAQFBTYR
ETOUOCCO
BHAMBNUR
GCAKOCDF

TAKWAPDH
OHBGOLAE
OLIHPXOD
OTAROERN
OEILVSAO
BEOFFEUB
ETOFEURE
LCFESTBZ

Y.......
........
........
........
........
........
........
........</textarea>
    <textarea id="lws-words" data-lws-words spellcheck="false">ANT AXOLOTL BABOON BADGER BAT BEAR BEAVER BIRD BISON BOBCAT BUFFALO CAMEL CAT CHEETAH COUGAR COW COYOTE CRAB DEER DOG DOLPHIN DUCK EAGLE EMU FISH FOX FROG GECKO GIRAFFE GOOSE HORSE KOALA PARROT YAK ZEBRA</textarea>
    <script type="application/json" data-lws-placements>[{"word":"YAK","row":0,"col":0,"direction":"E","path":[[0,0],[0,1],[0,2]],"stack_heights_before":[3,2,2],"final_layers_top_to_bottom":[3,2,2]},{"word":"ZEBRA","row":7,"col":7,"direction":"N","path":[[7,7],[6,7],[5,7],[4,7],[3,7]],"stack_heights_before":[2,2,2,1,1],"final_layers_top_to_bottom":[2,2,2,1,1]},{"word":"PARROT","row":0,"col":5,"direction":"W","path":[[0,5],[0,4],[0,3],[0,2],[0,1],[0,0]],"stack_heights_before":[2,2,1,1,1,2],"final_layers_top_to_bottom":[2,2,1,1,1,2]},{"word":"AXOLOTL","row":1,"col":6,"direction":"SW","path":[[1,6],[2,5],[3,4],[4,3],[5,2],[6,1],[7,0]],"stack_heights_before":[0,0,0,0,0,0,0],"final_layers_top_to_bottom":[2,2,2,2,2,2,2]},{"word":"BUFFALO","row":7,"col":6,"direction":"NW","path":[[7,6],[6,5],[5,4],[4,3],[3,2],[2,1],[1,0]],"stack_heights_before":[0,0,0,1,0,0,0],"final_layers_top_to_bottom":[2,2,2,1,2,2,2]},{"word":"CHEETAH","row":7,"col":1,"direction":"N","path":[[7,1],[6,1],[5,1],[4,1],[3,1],[2,1],[1,1]],"stack_heights_before":[0,1,0,0,0,1,0],"final_layers_top_to_bottom":[2,1,2,2,2,1,2]},{"word":"DOLPHIN","row":2,"col":7,"direction":"W","path":[[2,7],[2,6],[2,5],[2,4],[2,3],[2,2],[2,1]],"stack_heights_before":[0,0,1,0,0,0,2],"final_layers_top_to_bottom":[2,2,1,2,2,2,0]},{"word":"GIRAFFE","row":1,"col":3,"direction":"S","path":[[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3]],"stack_heights_before":[0,1,0,2,0,0,0],"final_layers_top_to_bottom":[2,1,2,0,2,2,2]},{"word":"BABOON","row":5,"col":0,"direction":"NE","path":[[5,0],[4,1],[3,2],[2,3],[1,4],[0,5]],"stack_heights_before":[0,1,1,2,0,0],"final_layers_top_to_bottom":[2,1,1,0,2,1]},{"word":"BADGER","row":3,"col":1,"direction":"E","path":[[3,1],[3,2],[3,3],[3,4],[3,5],[3,6]],"stack_heights_before":[1,2,1,1,0,0],"final_layers_top_to_bottom":[1,0,1,1,2,2]},{"word":"BEAVER","row":1,"col":1,"direction":"SE","path":[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]],"stack_heights_before":[1,1,2,0,0,0],"final_layers_top_to_bottom":[1,1,0,2,2,2]},{"word":"BOBCAT","row":6,"col":4,"direction":"N","path":[[6,4],[5,4],[4,4],[3,4],[2,4],[1,4]],"stack_heights_before":[0,1,1,2,1,1],"final_layers_top_to_bottom":[1,1,1,0,1,1]},{"word":"COUGAR","row":7,"col":1,"direction":"NE","path":[[7,1],[6,2],[5,3],[4,4],[3,5],[2,6]],"stack_heights_before":[1,0,1,2,1,1],"final_layers_top_to_bottom":[1,2,1,0,1,1]},{"word":"COYOTE","row":5,"col":5,"direction":"W","path":[[5,5],[5,4],[5,3],[5,2],[5,1],[5,0]],"stack_heights_before":[1,2,2,1,1,1],"final_layers_top_to_bottom":[1,0,0,1,1,1]},{"word":"BISON","row":2,"col":5,"direction":"S","path":[[2,5],[3,5],[4,5],[5,5],[6,5]],"stack_heights_before":[2,2,0,2,1],"final_layers_top_to_bottom":[0,0,2,0,1]},{"word":"CAMEL","row":6,"col":1,"direction":"E","path":[[6,1],[6,2],[6,3],[6,4],[6,5]],"stack_heights_before":[2,1,1,1,2],"final_layers_top_to_bottom":[0,1,1,0,0]},{"word":"EAGLE","row":1,"col":4,"direction":"W","path":[[1,4],[1,3],[1,2],[1,1],[1,0]],"stack_heights_before":[2,1,0,2,1],"final_layers_top_to_bottom":[0,1,0,0,1]},{"word":"GECKO","row":7,"col":0,"direction":"E","path":[[7,0],[7,1],[7,2],[7,3],[7,4]],"stack_heights_before":[1,2,0,1,0],"final_layers_top_to_bottom":[1,0,0,1,1]},{"word":"GOOSE","row":7,"col":4,"direction":"NW","path":[[7,4],[6,3],[5,2],[4,1],[3,0]],"stack_heights_before":[1,2,2,2,0],"final_layers_top_to_bottom":[0,0,0,0,1]},{"word":"HORSE","row":3,"col":0,"direction":"S","path":[[3,0],[4,0],[5,0],[6,0],[7,0]],"stack_heights_before":[1,0,2,0,2],"final_layers_top_to_bottom":[0,2,0,0,0]},{"word":"KOALA","row":0,"col":4,"direction":"SW","path":[[0,4],[1,3],[2,2],[3,1],[4,0]],"stack_heights_before":[0,2,2,2,1],"final_layers_top_to_bottom":[1,0,0,0,1]},{"word":"BEAR","row":4,"col":0,"direction":"SE","path":[[4,0],[5,1],[6,2],[7,3]],"stack_heights_before":[2,2,2,2],"final_layers_top_to_bottom":[0,0,0,0]},{"word":"BIRD","row":3,"col":6,"direction":"N","path":[[3,6],[2,6],[1,6],[0,6]],"stack_heights_before":[1,2,1,0],"final_layers_top_to_bottom":[1,0,1,2]},{"word":"CRAB","row":0,"col":7,"direction":"W","path":[[0,7],[0,6],[0,5],[0,4]],"stack_heights_before":[0,1,1,1],"final_layers_top_to_bottom":[1,1,0,0]},{"word":"DEER","row":0,"col":7,"direction":"S","path":[[0,7],[1,7],[2,7],[3,7]],"stack_heights_before":[1,0,1,0],"final_layers_top_to_bottom":[0,1,1,0]},{"word":"DUCK","row":7,"col":6,"direction":"N","path":[[7,6],[6,6],[5,6],[4,6]],"stack_heights_before":[1,1,0,0],"final_layers_top_to_bottom":[1,1,1,0]},{"word":"FISH","row":0,"col":0,"direction":"E","path":[[0,0],[0,1],[0,2],[0,3]],"stack_heights_before":[0,0,0,0],"final_layers_top_to_bottom":[1,0,0,0]},{"word":"FROG","row":7,"col":7,"direction":"N","path":[[7,7],[6,7],[5,7],[4,7]],"stack_heights_before":[0,0,0,0],"final_layers_top_to_bottom":[1,1,1,0]},{"word":"ANT","row":2,"col":7,"direction":"SW","path":[[2,7],[3,6],[4,5]],"stack_heights_before":[2,2,1],"final_layers_top_to_bottom":[0,0,1]},{"word":"BAT","row":6,"col":7,"direction":"NW","path":[[6,7],[5,6],[4,5]],"stack_heights_before":[1,1,2],"final_layers_top_to_bottom":[0,0,0]},{"word":"CAT","row":7,"col":5,"direction":"NE","path":[[7,5],[6,6],[5,7]],"stack_heights_before":[0,2,1],"final_layers_top_to_bottom":[1,0,0]},{"word":"COW","row":7,"col":5,"direction":"E","path":[[7,5],[7,6],[7,7]],"stack_heights_before":[1,2,1],"final_layers_top_to_bottom":[0,0,0]},{"word":"DOG","row":1,"col":7,"direction":"W","path":[[1,7],[1,6],[1,5]],"stack_heights_before":[1,2,0],"final_layers_top_to_bottom":[0,0,1]},{"word":"EMU","row":2,"col":4,"direction":"NE","path":[[2,4],[1,5],[0,6]],"stack_heights_before":[2,1,2],"final_layers_top_to_bottom":[0,0,0]},{"word":"FOX","row":0,"col":0,"direction":"S","path":[[0,0],[1,0],[2,0]],"stack_heights_before":[1,2,0],"final_layers_top_to_bottom":[0,0,0]}]</script>
    <button data-lws-build type="button">Build puzzle</button>
  </div>

  <div class="lws-grid-layout">
    <section class="lws-panel lws-game-panel">
      <div class="lws-status" data-lws-status>Build the puzzle, then drag across letters.</div>
      <div class="lws-readout" aria-live="polite">
        <span class="lws-pill">Time: <strong data-lws-timer>0:00</strong></span>
        <span class="lws-pill" data-lws-rank>Targets: 8 / 12 / 16 / 20 min</span>
        <span class="lws-pill">Selected: <strong data-lws-selected-word>—</strong></span>
        <span class="lws-pill" data-lws-validity>Waiting for selection</span>
      </div>
      <div class="lws-final-message" data-lws-final-message aria-live="polite"></div>
      <div class="lws-board-wrap">
        <div class="lws-board" data-lws-board aria-label="Layered word search board"></div>
      </div>
      <div class="lws-legend" data-lws-legend></div>
      <div class="lws-actions">
        <button class="lws-button secondary" data-lws-reset type="button">Reset puzzle</button>
      </div>
      <h3 style="margin-top: 1rem">Words</h3>
      <ul class="lws-word-list" data-lws-word-list></ul>
    </section>
  </div>
</div>

<script src="{{ '/assets/js/layered_wordsearch.js' | relative_url }}"></script>
