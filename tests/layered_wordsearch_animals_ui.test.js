const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const puzzle = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/json/layered_wordsearch_animals.json'), 'utf8'));

const dom = new JSDOM(`<!doctype html><html><body>
  <div data-layered-wordsearch>
    <textarea data-lws-layers>${puzzle.layerText}</textarea>
    <textarea data-lws-words>${puzzle.wordText}</textarea>
    <script type="application/json" data-lws-placements>${JSON.stringify(puzzle.placements)}</script>
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

assert.strictEqual(game.puzzle.rows, 8);
assert.strictEqual(game.puzzle.cols, 8);
assert.strictEqual(game.puzzle.layers.length, puzzle.layerCount);
assert.strictEqual(root.querySelectorAll('.lws-cell').length, 64);
assert.strictEqual(root.querySelectorAll('[data-lws-word-list] li').length, puzzle.words.length);

// Words can always be solved in reverse placement order, because later-dropped
// words are above earlier-dropped words at every overlapping cell.
for (const placement of [...puzzle.placements].reverse()) {
  game.selected = placement.path.map(([row, col]) => ({ row, col }));
  const visible = game.selectionWord();
  assert.strictEqual(
    visible,
    placement.word,
    `expected ${placement.word} to be visible before solving it, got ${visible}`
  );
  game.updateLiveSelection();
  assert.match(root.querySelector('[data-lws-validity]').textContent, /Valid word/);
  game.finishSelection();
  assert(game.puzzle.found.has(placement.word), `${placement.word} should be found`);
  assert(root.querySelector(`[data-word="${placement.word}"]`).classList.contains('found'));
}

assert.strictEqual(game.puzzle.found.size, puzzle.words.length, 'all animal words should be solved');
assert.match(root.querySelector('[data-lws-status]').textContent, /Congrats, you solved the puzzle/);
assert(!puzzle.finalMessage, 'animal puzzle should not use a hidden final message');
console.log('Layered animal word search full UI solve test passed.');
