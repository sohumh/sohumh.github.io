const assert = require('assert');
const { JSDOM } = require('jsdom');
const path = require('path');

function createHarness() {
  const dom = new JSDOM(`<!doctype html><html><body>
    <div data-layered-wordsearch>
      <textarea data-lws-layers>CATSXXXX
DOGSXXXX
BIRDXXXX
FISHXXXX
XXXXXXXX
XXXXXXXX
XXXXXXXX
XXXXXXXX

MOONXXXX
STARXXXX
TREEXXXX
WINDXXXX
XXXXXXXX
XXXXXXXX
XXXXXXXX
XXXXXXXX

FIREXXXX
RAINXXXX
SNOWXXXX
ROCKXXXX
XXXXXXXX
XXXXXXXX
XXXXXXXX
XXXXXXXX</textarea>
      <textarea data-lws-words>CATS DOGS BIRD FISH MOON STAR TREE WIND FIRE RAIN SNOW ROCK</textarea>
      <button data-lws-build></button>
      <button data-lws-reset></button>
      <div data-lws-status></div>
      <strong data-lws-selected-word></strong>
      <span data-lws-validity></span>
      <div data-lws-board></div>
      <div data-lws-legend></div>
      <ul data-lws-word-list></ul>
    </div>
  </body></html>`, { url: 'http://localhost' });

  global.window = dom.window;
  global.document = dom.window.document;
  global.HTMLElement = dom.window.HTMLElement;

  const scriptPath = path.resolve(__dirname, '../assets/js/layered_wordsearch.js');
  delete require.cache[scriptPath];
  require(scriptPath);

  const root = document.querySelector('[data-layered-wordsearch]');
  const game = new window.LayeredWordSearch(root);
  return { dom, root, game };
}

function visibleRow(game, row) {
  let value = '';
  for (let col = 0; col < game.puzzle.cols; col += 1) {
    value += game.visibleAt(row, col).letter || '.';
  }
  return value;
}

(function testBuildsEightByEightPuzzle() {
  const { game, root } = createHarness();
  assert.strictEqual(game.puzzle.rows, 8, 'expected 8 rows');
  assert.strictEqual(game.puzzle.cols, 8, 'expected 8 columns');
  assert.strictEqual(root.querySelectorAll('.lws-cell').length, 64, 'expected 64 rendered cells');
  assert.strictEqual(root.querySelectorAll('[data-lws-word-list] li').length, 12, 'expected word bank entries');
})();

(function testLiveSelectionShowsValidWord() {
  const { game, root } = createHarness();
  game.selected = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 }
  ];
  game.updateLiveSelection();

  assert.strictEqual(root.querySelector('[data-lws-selected-word]').textContent, 'CATS');
  assert.match(root.querySelector('[data-lws-validity]').textContent, /Valid word/);
  assert.strictEqual(root.querySelectorAll('.lws-cell.selected.valid').length, 4, 'selected cells should be highlighted as valid');
  assert(root.querySelector('[data-word="CATS"]').classList.contains('candidate'), 'word bank should preview the candidate word');
})();

(function testFoundWordCrossesOutAndRevealsLowerLayer() {
  const { game, root } = createHarness();
  game.selected = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 }
  ];
  game.finishSelection();

  assert(game.puzzle.found.has('CATS'), 'CATS should be marked found');
  assert(root.querySelector('[data-word="CATS"]').classList.contains('found'), 'found word should be crossed out in word bank');
  assert.strictEqual(visibleRow(game, 0), 'MOONXXXX', 'solved cells should reveal letters from the next layer');
})();

(function testNewlyRevealedWordCanBeSolved() {
  const { game, root } = createHarness();
  game.selected = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 }
  ];
  game.finishSelection();

  game.selected = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 }
  ];
  game.finishSelection();

  assert(game.puzzle.found.has('MOON'), 'MOON should be solvable after being revealed');
  assert(root.querySelector('[data-word="MOON"]').classList.contains('found'), 'revealed word should cross out when solved');
  assert.strictEqual(visibleRow(game, 0), 'FIREXXXX', 'second solve should reveal the third layer');
})();

(function testInvalidSelectionDoesNotRemoveLetters() {
  const { game, root } = createHarness();
  game.selected = [
    { row: 4, col: 0 },
    { row: 4, col: 1 },
    { row: 4, col: 2 }
  ];
  game.finishSelection();

  assert.strictEqual(game.puzzle.found.size, 0, 'invalid selection should not add found words');
  assert.strictEqual(visibleRow(game, 4), 'XXXXXXXX', 'invalid selection should not reveal lower layers');
  assert.match(root.querySelector('[data-lws-status]').textContent, /not in the solution list/);
})();

console.log('Layered word search UI tests passed.');

(function testIncidentalWordInWrongSpotDoesNotCount() {
  const placements = [
    { word: 'BOBCAT', path: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]] },
    { word: 'CAT', path: [[1, 0], [1, 1], [1, 2]] }
  ];
  const dom = new JSDOM(`<!doctype html><html><body>
    <div data-layered-wordsearch>
      <textarea data-lws-layers>BOBCATXX
CATXXXXX
XXXXXXXX
XXXXXXXX
XXXXXXXX
XXXXXXXX
XXXXXXXX
XXXXXXXX</textarea>
      <textarea data-lws-words>BOBCAT CAT</textarea>
      <script type="application/json" data-lws-placements>${JSON.stringify(placements)}</script>
      <button data-lws-build></button>
      <button data-lws-reset></button>
      <div data-lws-status></div>
      <strong data-lws-selected-word></strong>
      <span data-lws-validity></span>
      <div data-lws-board></div>
      <div data-lws-legend></div>
      <ul data-lws-word-list></ul>
    </div>
  </body></html>`, { url: 'http://localhost' });

  global.window = dom.window;
  global.document = dom.window.document;
  global.HTMLElement = dom.window.HTMLElement;

  const scriptPath = path.resolve(__dirname, '../assets/js/layered_wordsearch.js');
  delete require.cache[scriptPath];
  require(scriptPath);

  const root = document.querySelector('[data-layered-wordsearch]');
  const game = new window.LayeredWordSearch(root);
  game.selected = [{ row: 0, col: 3 }, { row: 0, col: 4 }, { row: 0, col: 5 }];
  game.finishSelection();

  assert.match(root.querySelector('[data-lws-status]').textContent, /not its intended hiding spot/);
  assert(!game.puzzle.found.has('CAT'), 'CAT inside BOBCAT should not count as CAT');
  assert(!root.querySelector('[data-word="CAT"]').classList.contains('found'));
})();
