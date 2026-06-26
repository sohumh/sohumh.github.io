class LayeredWordSearch {
  constructor(root) {
    this.root = root;
    this.layersInput = root.querySelector('[data-lws-layers]');
    this.wordsInput = root.querySelector('[data-lws-words]');
    this.buildButton = root.querySelector('[data-lws-build]');
    this.resetButton = root.querySelector('[data-lws-reset]');
    this.board = root.querySelector('[data-lws-board]');
    this.status = root.querySelector('[data-lws-status]');
    this.wordList = root.querySelector('[data-lws-word-list]');
    this.legend = root.querySelector('[data-lws-legend]');
    this.selectedWord = root.querySelector('[data-lws-selected-word]');
    this.validity = root.querySelector('[data-lws-validity]');
    this.timer = root.querySelector('[data-lws-timer]');
    this.rank = root.querySelector('[data-lws-rank]');
    this.finalMessageDisplay = root.querySelector('[data-lws-final-message]');
    this.placementsInput = root.querySelector('[data-lws-placements]');

    this.puzzle = null;
    this.finalMessage = 'WHALEDONEYOUBEAST';
    this.timerStartedAt = null;
    this.timerInterval = null;
    this.elapsedSeconds = 0;
    this.isDragging = false;
    this.dragStart = null;
    this.selected = [];
    this.candidateMatch = null;

    this.bindEvents();
    this.watchThemeChanges();
    this.buildPuzzle();
  }

  bindEvents() {
    this.buildButton.addEventListener('click', () => this.buildPuzzle());
    this.resetButton.addEventListener('click', () => this.buildPuzzle());

    this.board.addEventListener('pointerdown', (event) => {
      if (!this.puzzle) return;
      const cell = this.cellFromEvent(event);
      if (!cell) return;
      event.preventDefault();
      this.startTimer();
      this.board.setPointerCapture?.(event.pointerId);
      this.isDragging = true;
      this.dragStart = cell;
      this.selected = [cell];
      this.updateLiveSelection();
    });

    this.board.addEventListener('pointermove', (event) => {
      if (!this.isDragging || !this.dragStart) return;
      const cell = this.cellFromEvent(event);
      if (!cell) return;
      const line = this.cellsOnLine(this.dragStart, cell);
      if (!line.length) {
        this.setReadout('', 'Select in a straight line', 'bad');
        return;
      }
      this.selected = line.filter(({ row, col }) => this.visibleAt(row, col).letter);
      this.updateLiveSelection();
    });

    window.addEventListener('pointerup', () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.dragStart = null;
      this.finishSelection();
    });
  }

  watchThemeChanges() {
    const Observer = window.MutationObserver || window.WebKitMutationObserver;
    if (!Observer) return;
    const observer = new Observer(() => {
      if (!this.puzzle) return;
      this.renderBoard();
      this.renderLegend();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  normalizeWord(value) {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  parseLayers(text) {
    const blocks = text.trim().split(/\n\s*\n/).filter(Boolean);
    if (!blocks.length) throw new Error('Add at least one layer.');

    const layers = blocks.map((block) => block.trim().split(/\n/).map((row) => {
      const compact = row.trim().replace(/\s+/g, '');
      return compact.toUpperCase().split('').map((letter) => (letter === '.' ? '' : letter));
    }));

    const rows = layers[0].length;
    const cols = layers[0][0] ? layers[0][0].length : 0;
    if (!rows || !cols) throw new Error('The first layer is empty.');

    layers.forEach((layer, layerIndex) => {
      if (layer.length !== rows) throw new Error(`Layer ${layerIndex + 1} has a different row count.`);
      layer.forEach((row, rowIndex) => {
        if (row.length !== cols) throw new Error(`Layer ${layerIndex + 1}, row ${rowIndex + 1} has a different width.`);
      });
    });

    return { layers, rows, cols };
  }

  parseWords(text) {
    const words = text.split(/[\s,]+/).map((word) => this.normalizeWord(word)).filter(Boolean);
    return Array.from(new Set(words)).sort((a, b) => a.localeCompare(b));
  }

  parsePlacements() {
    if (!this.placementsInput) return [];
    try {
      const raw = this.placementsInput.textContent || this.placementsInput.value || '';
      if (!raw.trim()) return [];
      return JSON.parse(raw).map((placement) => ({
        word: this.normalizeWord(placement.word),
        path: placement.path.map(([row, col]) => ({ row, col })),
        finalLayers: placement.final_layers_top_to_bottom || []
      }));
    } catch (error) {
      throw new Error(`Could not parse placement metadata: ${error.message}`);
    }
  }

  buildPuzzle() {
    try {
      const parsed = this.parseLayers(this.layersInput.value);
      const words = this.parseWords(this.wordsInput.value);
      if (!words.length) throw new Error('Add at least one solution word.');

      this.puzzle = {
        ...parsed,
        words,
        wordSet: new Set(words),
        placements: this.parsePlacements(),
        found: new Set(),
        removed: parsed.layers.map((layer) => layer.map((row) => row.map((letter) => !letter)))
      };

      this.selected = [];
      this.candidateMatch = null;
      this.resetTimer();
      this.applyTestOneWordLeft();
      if (this.finalMessageDisplay) this.finalMessageDisplay.textContent = '';
      this.renderBoard();
      this.renderLegend();
      this.renderWords();
      this.setStatus('Drag in a straight line to select a word.', '');
      this.setReadout('', 'Waiting for selection', '');
    } catch (error) {
      this.puzzle = null;
      this.board.innerHTML = '';
      this.wordList.innerHTML = '';
      this.legend.innerHTML = '';
      this.setStatus(error.message, 'bad');
      this.setReadout('', 'Invalid setup', 'bad');
    }
  }

  applyTestOneWordLeft() {
    const target = this.normalizeWord(this.root.dataset.lwsTestOneWordLeft || new URLSearchParams(window.location.search).get('lws_test_last') || '');
    if (!target || !this.puzzle.placements.length) return;

    this.puzzle.placements.forEach((placement) => {
      if (placement.word === target) return;
      placement.path.forEach(({ row, col }, index) => {
        const depth = placement.finalLayers[index];
        if (typeof depth === 'number' && this.puzzle.removed[depth]) {
          this.puzzle.removed[depth][row][col] = true;
        } else {
          const visible = this.visibleAt(row, col);
          if (visible.letter) this.puzzle.removed[visible.depth][row][col] = true;
        }
      });
      this.puzzle.found.add(placement.word);
    });
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  rankFor(seconds) {
    if (seconds <= 8 * 60) return 'Genius';
    if (seconds <= 12 * 60) return 'Amazing';
    if (seconds <= 16 * 60) return 'Great';
    if (seconds <= 20 * 60) return 'Nice';
    return 'Complete';
  }

  updateTimer() {
    if (this.timerStartedAt) {
      this.elapsedSeconds = Math.floor((Date.now() - this.timerStartedAt) / 1000);
    }
    if (this.timer) this.timer.textContent = this.formatTime(this.elapsedSeconds);
  }

  startTimer() {
    if (this.timerStartedAt || this.timerInterval) return;
    this.timerStartedAt = Date.now() - this.elapsedSeconds * 1000;
    this.timerInterval = window.setInterval(() => this.updateTimer(), 1000);
    this.updateTimer();
  }

  stopTimer() {
    this.updateTimer();
    if (this.timerInterval) window.clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.timerStartedAt = null;
  }

  resetTimer() {
    if (this.timerInterval) window.clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.timerStartedAt = null;
    this.elapsedSeconds = 0;
    if (this.timer) this.timer.textContent = '0:00';
    if (this.rank) {
      this.rank.textContent = 'Targets: 8 / 12 / 16 / 20 min';
      this.rank.className = 'lws-pill';
    }
  }

  setStatus(message, type) {
    this.status.textContent = message;
    this.status.className = 'lws-status' + (type ? ` ${type}` : '');
  }

  setReadout(word, message, type) {
    this.selectedWord.textContent = word || '—';
    this.validity.textContent = message;
    this.validity.className = 'lws-pill' + (type ? ` ${type}` : '');
  }

  layerColor(depth, maxDepth) {
    const t = maxDepth <= 1 ? 0 : depth / (maxDepth - 1);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      const hue = 214 + (226 - 214) * t;
      const saturation = 18 + 4 * t;
      const lightness = 34 - 8 * t;
      return `hsl(${hue} ${saturation}% ${lightness}%)`;
    }
    const hue = 208 + (218 - 208) * t;
    const saturation = 76 - 8 * t;
    const lightness = 88 - 8 * t;
    return `hsl(${hue} ${saturation}% ${lightness}%)`;
  }

  visibleAt(row, col) {
    for (let depth = 0; depth < this.puzzle.layers.length; depth += 1) {
      if (!this.puzzle.removed[depth][row][col]) {
        return { letter: this.puzzle.layers[depth][row][col], depth };
      }
    }
    return { letter: '', depth: this.puzzle.layers.length };
  }

  renderBoard(justSolvedCells = []) {
    this.board.innerHTML = '';
    this.board.style.gridTemplateColumns = `repeat(${this.puzzle.cols}, var(--lws-cell-size))`;

    for (let row = 0; row < this.puzzle.rows; row += 1) {
      for (let col = 0; col < this.puzzle.cols; col += 1) {
        const visible = this.visibleAt(row, col);
        const cell = document.createElement('div');
        cell.className = 'lws-cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.dataset.depthLabel = visible.letter ? visible.depth + 1 : '';
        cell.textContent = visible.letter || '·';
        if (!visible.letter) cell.classList.add('empty');
        cell.style.background = visible.letter ? this.layerColor(visible.depth, this.puzzle.layers.length) : '#f1f1f1';

        if (justSolvedCells.some((pos) => pos.row === row && pos.col === col)) {
          cell.classList.add('just-solved');
        }
        this.board.appendChild(cell);
      }
    }
    this.renderSelection();
  }

  renderLegend() {
    this.legend.innerHTML = '<strong>Visible layer:</strong>';
    this.puzzle.layers.forEach((_, depth) => {
      const swatch = document.createElement('span');
      swatch.className = 'lws-swatch';
      swatch.style.background = this.layerColor(depth, this.puzzle.layers.length);
      swatch.title = `Layer ${depth + 1}`;
      this.legend.appendChild(swatch);
      const label = document.createElement('span');
      label.textContent = depth + 1;
      this.legend.appendChild(label);
    });
  }

  renderWords() {
    this.wordList.innerHTML = '';
    this.puzzle.words.forEach((word) => {
      const item = document.createElement('li');
      item.textContent = word;
      item.dataset.word = word;
      if (this.puzzle.found.has(word)) item.classList.add('found');
      if (word === this.candidateMatch && !this.puzzle.found.has(word)) item.classList.add('candidate');
      this.wordList.appendChild(item);
    });
  }

  renderSelection(validity = '') {
    this.board.querySelectorAll('.lws-cell.selected, .lws-cell.valid, .lws-cell.invalid').forEach((cell) => {
      cell.classList.remove('selected', 'valid', 'invalid');
    });

    this.selected.forEach(({ row, col }) => {
      const cell = this.board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (!cell) return;
      cell.classList.add('selected');
      if (validity) cell.classList.add(validity);
    });
  }

  cellsOnLine(start, end) {
    const dr = end.row - start.row;
    const dc = end.col - start.col;
    const stepR = Math.sign(dr);
    const stepC = Math.sign(dc);
    const absR = Math.abs(dr);
    const absC = Math.abs(dc);

    if (!(dr === 0 || dc === 0 || absR === absC)) return [];

    const steps = Math.max(absR, absC);
    const cells = [];
    for (let i = 0; i <= steps; i += 1) {
      cells.push({ row: start.row + stepR * i, col: start.col + stepC * i });
    }
    return cells;
  }

  cellFromEvent(event) {
    const point = event.touches ? event.touches[0] : event;
    const el = document.elementFromPoint(point.clientX, point.clientY);
    const cell = el?.closest?.('.lws-cell');
    if (!cell || !this.board.contains(cell) || cell.classList.contains('empty')) return null;
    return { row: Number(cell.dataset.row), col: Number(cell.dataset.col) };
  }

  selectionWord() {
    return this.selected.map(({ row, col }) => this.visibleAt(row, col).letter).join('');
  }

  finalVisibleText() {
    const letters = [];
    for (let row = 0; row < this.puzzle.rows; row += 1) {
      for (let col = 0; col < this.puzzle.cols; col += 1) {
        letters.push(this.visibleAt(row, col).letter || '');
      }
    }
    return letters.join('');
  }

  finalMessageCells() {
    const cells = [];
    for (let row = 0; row < this.puzzle.rows; row += 1) {
      for (let col = 0; col < this.puzzle.cols; col += 1) {
        const visible = this.visibleAt(row, col);
        if (visible.letter) {
          cells.push({ row, col, letter: visible.letter, delay: cells.length * 230 });
        }
      }
    }
    return cells;
  }

  appendFinalMessageLetter(letter) {
    if (!this.finalMessageDisplay) return;
    const span = document.createElement('span');
    span.textContent = letter;
    this.finalMessageDisplay.appendChild(span);
  }

  showFinalMessage() {
    if (this.finalMessageDisplay) this.finalMessageDisplay.textContent = '';
    this.finalMessageCells().forEach(({ row, col, letter, delay }) => {
      const cell = this.board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (!cell) return;
      window.setTimeout(() => {
        cell.classList.remove('empty', 'selected', 'valid', 'invalid');
        cell.classList.add('final-message');
        this.appendFinalMessageLetter(letter);
      }, delay);
    });
  }

  pathsMatch(a, b) {
    return a.length === b.length && a.every((cell, index) => cell.row === b[index].row && cell.col === b[index].col);
  }

  selectedPathMatchesPlacement(placement) {
    if (this.pathsMatch(this.selected, placement.path)) return true;
    return this.pathsMatch(this.selected, [...placement.path].reverse());
  }

  getMatch(word) {
    const reversed = word.split('').reverse().join('');
    const candidate = this.puzzle.wordSet.has(word) ? word : (this.puzzle.wordSet.has(reversed) ? reversed : null);
    if (!candidate) return { word: null, placement: null, isOfficialSpot: false, isIncidental: false };

    if (!this.puzzle.placements.length) {
      return { word: candidate, placement: null, isOfficialSpot: true, isIncidental: false };
    }

    const officialPlacement = this.puzzle.placements.find((placement) => (
      placement.word === candidate && this.selectedPathMatchesPlacement(placement)
    ));

    return {
      word: candidate,
      placement: officialPlacement || null,
      isOfficialSpot: Boolean(officialPlacement),
      isIncidental: !officialPlacement
    };
  }

  updateLiveSelection() {
    const word = this.selectionWord();
    const match = this.getMatch(word);
    this.candidateMatch = match.word;

    if (match.word && match.isOfficialSpot && !this.puzzle.found.has(match.word)) {
      this.setStatus(`Release to mark ${match.word} as found.`, 'live');
      this.setReadout(word, 'Valid word', 'good');
      this.renderSelection('valid');
    } else if (match.word && match.isIncidental && !this.puzzle.found.has(match.word)) {
      this.setStatus(`${match.word} is an animal, but this is not its intended hiding spot. Nice catch!`, 'bad');
      this.setReadout(word, 'Animal, wrong spot', 'bad');
      this.renderSelection('');
    } else if (match.word) {
      this.setStatus(`${match.word} is already found.`, 'bad');
      this.setReadout(word, 'Already found', 'bad');
      this.renderSelection('');
    } else {
      this.setStatus('Keep dragging, or release to check this selection.', 'live');
      this.setReadout(word, 'Not a solution yet', word.length > 1 ? 'bad' : '');
      this.renderSelection('');
    }
    this.renderWords();
  }

  finishSelection() {
    if (!this.selected.length) return;
    const word = this.selectionWord();
    const match = this.getMatch(word);

    if (match.word && match.isOfficialSpot && !this.puzzle.found.has(match.word)) {
      const solvedCells = this.selected.slice();
      this.selected.forEach(({ row, col }) => {
        const visible = this.visibleAt(row, col);
        if (visible.letter) this.puzzle.removed[visible.depth][row][col] = true;
      });
      this.puzzle.found.add(match.word);
      this.candidateMatch = null;
      this.selected = [];
      this.renderBoard(solvedCells);
      this.renderWords();
      if (this.puzzle.found.size === this.puzzle.words.length) {
        this.stopTimer();
        const rank = this.rankFor(this.elapsedSeconds);
        if (this.rank) {
          this.rank.textContent = `${rank} • ${this.formatTime(this.elapsedSeconds)}`;
          this.rank.className = 'lws-pill good';
        }
        this.showFinalMessage();
        this.setStatus(`Congrats, you solved the puzzle in ${this.formatTime(this.elapsedSeconds)} — ${rank}! Whale done, you beast!`, 'good');
        this.setReadout(match.word, 'Puzzle complete', 'good');
      } else {
        this.setStatus(`Solved ${match.word}! Letters from the next layer underneath are now visible.`, 'good');
        this.setReadout(match.word, 'Found', 'good');
      }
      return;
    }

    if (match.word && match.isIncidental && !this.puzzle.found.has(match.word)) {
      this.setStatus(`${match.word} is an animal, but this is not its intended hiding spot. Nice catch!`, 'bad');
      this.setReadout(word, 'Animal, wrong spot', 'bad');
    } else if (match.word) {
      this.setStatus(`${match.word} was already found.`, 'bad');
      this.setReadout(word, 'Already found', 'bad');
    } else {
      this.setStatus(`${word || 'That selection'} is not in the solution list.`, 'bad');
      this.setReadout(word, 'Invalid word', 'bad');
    }
    this.candidateMatch = null;
    this.selected = [];
    this.renderSelection();
    this.renderWords();
  }
}

window.LayeredWordSearch = LayeredWordSearch;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-layered-wordsearch]').forEach((root) => new LayeredWordSearch(root));
});
