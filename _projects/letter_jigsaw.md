---
layout: page
title: Letter Jigsaw Puzzles
description: Place letter pieces to form words in each row
img: assets/img/jigsaw.png
importance: 1
category: puzzles
---

Insert the pieces in the grid so each row forms a word. Pieces should not be rotated, and only the rows must form words—not the columns. Drag and drop pieces from the piece area into the grid.

<html>
<head>
   <title>Letter Jigsaw Puzzles</title>
   <style>
       #all-games-container {
           display: flex;
           flex-direction: column;
           gap: 30px;
           padding: 20px;
       }

       .game-instance {
           margin-left: 20px;
           border: none;
           padding: 20px;
           border-radius: 8px;
           background-color: #f8f8f8;
           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
       }

       .game-instance h3 {
           margin: 0 0 15px 0;
           font-size: 24px;
           color: #333;
       }

       .puzzle-info {
           margin-bottom: 15px;
           font-size: 14px;
           color: #666;
           line-height: 1.6;
       }

       .puzzle-info-row {
           display: flex;
           justify-content: space-between;
           align-items: center;
       }

       .timer {
           font-size: 14px;
           color: #666;
           font-family: 'Courier New', monospace;
       }

       .timer.running {
           color: #2196f3;
           font-weight: bold;
       }

       .timer.completed {
           color: #4caf50;
           font-weight: bold;
       }

       .game-board {
           display: grid;
           gap: 4px;
           padding: 15px;
           background-color: #ddd;
           width: fit-content;
           border: 3px solid #333;
           border-radius: 8px;
           margin-bottom: 20px;
       }

       .grid-cell {
           width: 50px;
           height: 50px;
           background-color: #fff;
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 24px;
           font-family: 'Arial', sans-serif;
           font-weight: bold;
           border: 2px solid #999;
           border-radius: 4px;
           position: relative;
           transition: all 0.2s;
       }

       .grid-cell.filled {
           cursor: pointer;
       }

       .grid-cell.drop-target {
           background-color: #e3f2fd !important;
           border-color: #2196f3 !important;
           border-width: 3px !important;
           transition: none !important;
       }

       .grid-cell.drop-target-invalid {
           background-color: #ffebee !important;
           border-color: #f44336 !important;
           border-width: 3px !important;
           transition: none !important;
       }

       .grid-cell.filled {
           background-color: #b39ddb;
           color: #fff;
           border-color: #7b1fa2;
       }

       .grid-cell.valid-row {
           background-color: #81c784;
           border-color: #388e3c;
       }

       .grid-cell.invalid-row {
           background-color: #e57373;
           border-color: #c62828;
       }

       .pieces-container {
           display: flex;
           flex-wrap: wrap;
           gap: 10px;
           padding: 15px;
           background-color: #e8e8e8;
           border: 2px solid #999;
           border-radius: 8px;
           min-height: 80px;
       }

       .piece {
           cursor: grab;
           transition: all 0.2s;
           width: fit-content;
           height: fit-content;
           position: relative;
           display: block;
       }

       .piece:hover {
           transform: translateY(-2px);
       }

       .piece:hover .piece-cell {
           box-shadow: 0 4px 8px rgba(0,0,0,0.3);
       }

       .piece.dragging {
           opacity: 0.5;
           cursor: grabbing;
       }

       .piece-cell {
           width: 50px;
           height: 50px;
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 24px;
           font-family: 'Arial', sans-serif;
           font-weight: bold;
           color: #fff;
           background-color: #b39ddb;
           position: absolute;
           box-shadow: 0 2px 4px rgba(0,0,0,0.2);
           transition: box-shadow 0.2s;
       }

       /* Border and rounded corners for edge cells */
       .piece-cell.top { border-top: 2px solid #7b1fa2; }
       .piece-cell.bottom { border-bottom: 2px solid #7b1fa2; }
       .piece-cell.left { border-left: 2px solid #7b1fa2; }
       .piece-cell.right { border-right: 2px solid #7b1fa2; }

       .piece-cell.corner-tl { border-top-left-radius: 8px; }
       .piece-cell.corner-tr { border-top-right-radius: 8px; }
       .piece-cell.corner-bl { border-bottom-left-radius: 8px; }
       .piece-cell.corner-br { border-bottom-right-radius: 8px; }

       .controls {
           margin-top: 20px;
           display: flex;
           gap: 10px;
           align-items: center;
       }

       .controls button {
           padding: 10px 20px;
           font-size: 16px;
           cursor: pointer;
           background-color: #7b1fa2;
           color: white;
           border: none;
           border-radius: 4px;
           transition: background-color 0.2s;
       }

       .controls button:hover {
           background-color: #9c27b0;
       }

       .status-message {
           font-size: 16px;
           font-weight: bold;
           color: #333;
           padding: 10px;
           border-radius: 4px;
           display: none;
       }

       .status-message.success {
           display: block;
           background-color: #c8e6c9;
           color: #2e7d32;
       }

       .status-message.error {
           display: block;
           background-color: #ffcdd2;
           color: #c62828;
       }

       .hint {
           font-style: italic;
           color: #666;
           margin-top: 10px;
       }
   </style>
</head>
<body>
   <div class="instructions">
       <p><strong>How to play:</strong></p>
       <ul>
           <li>Drag letter pieces from the pieces area into the grid</li>
           <li>Each row must form a valid word</li>
           <li>Pieces can span multiple cells (1x2, 2x1, 2x2, etc.)</li>
           <li>Click on a piece in the grid to remove it back to the pieces area</li>
       </ul>
   </div>

   <div id="all-games-container">
       <!-- Games will be dynamically added here -->
   </div>

   <script>
       // Word validation lists for each puzzle
       const PUZZLE_WORDS = {
           1: ['YOU', 'HAD', 'FUN'],
           2: ['ONLY', 'PREY', 'NEED', 'LUCK'],
           3: ['WORDS', 'QUITE', 'OFTEN', 'LEAVE', 'MARKS'],
           4: ['PEOPLE', 'SHOULD', 'PUZZLE', 'DURING', 'BORING', 'EVENTS']
       };

       class JigsawPuzzle {
           constructor(container, puzzleData, index) {
               this.container = container;
               this.puzzleData = puzzleData;
               this.index = index;
               this.gridSize = puzzleData.gridSize;
               this.pieces = JSON.parse(JSON.stringify(puzzleData.pieces));
               this.grid = Array(this.gridSize.height).fill().map(() =>
                   Array(this.gridSize.width).fill(null)
               );
               this.draggedPiece = null;
               this.validWords = new Set(PUZZLE_WORDS[index]);

              // Timer properties
              this.startTime = null;
              this.timerInterval = null;
              this.elapsedTime = 0;
              this.isPuzzleCompleted = false;


               this.createBoard();
               this.setupEventListeners();
           }

           createBoard() {
               const boardHTML = `
                  <div class="game-board"></div>
                   <div class="pieces-container"></div>
                   <div class="controls">
                       <button class="check-btn">Check Solution</button>
                       <button class="reset-btn">Reset</button>
                       <div class="status-message"></div>
                   </div>
                   ${this.puzzleData.hint ? `<div class="hint">Hint: ${this.puzzleData.hint}</div>` : ''}
               `;

               this.container.querySelector('.game-content').innerHTML = boardHTML;

               // Set grid template
               const board = this.container.querySelector('.game-board');
               board.style.gridTemplateColumns = `repeat(${this.gridSize.width}, 50px)`;

               // Create grid cells
               for (let y = 0; y < this.gridSize.height; y++) {
                   for (let x = 0; x < this.gridSize.width; x++) {
                       const cell = document.createElement('div');
                       cell.className = 'grid-cell';
                       cell.dataset.x = x;
                       cell.dataset.y = y;
                       board.appendChild(cell);
                   }
               }

               this.renderPieces();
           }

           renderPieces() {
               const container = this.container.querySelector('.pieces-container');
               container.innerHTML = '';

               this.pieces.forEach((piece, index) => {
                   if (piece.placed) return;

                   const pieceEl = document.createElement('div');
                   pieceEl.className = 'piece';
                   pieceEl.dataset.pieceIndex = index;
                   pieceEl.draggable = true;

                   // Find bounds of actual cells
                   let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                   const cells = [];

                   piece.letters.forEach((row, y) => {
                       row.forEach((letter, x) => {
                           if (letter !== null) {
                               minX = Math.min(minX, x);
                               minY = Math.min(minY, y);
                               maxX = Math.max(maxX, x);
                               maxY = Math.max(maxY, y);
                               cells.push({ x, y, letter });
                           }
                       });
                   });

                   // Set container size
                   pieceEl.style.width = `${(maxX - minX + 1) * 50}px`;
                   pieceEl.style.height = `${(maxY - minY + 1) * 50}px`;

                   // Create a map of occupied cells for neighbor checking
                   const occupied = new Set(cells.map(c => `${c.x},${c.y}`));

                   // Create cells with smart borders and corners
                   cells.forEach(({ x, y, letter }) => {
                       const cellEl = document.createElement('div');
                       cellEl.className = 'piece-cell';
                       cellEl.textContent = letter;
                       cellEl.style.left = `${(x - minX) * 50}px`;
                       cellEl.style.top = `${(y - minY) * 50}px`;

                       // Check neighbors
                       const hasTop = occupied.has(`${x},${y - 1}`);
                       const hasBottom = occupied.has(`${x},${y + 1}`);
                       const hasLeft = occupied.has(`${x - 1},${y}`);
                       const hasRight = occupied.has(`${x + 1},${y}`);

                       // Add border classes for exposed edges
                       if (!hasTop) cellEl.classList.add('top');
                       if (!hasBottom) cellEl.classList.add('bottom');
                       if (!hasLeft) cellEl.classList.add('left');
                       if (!hasRight) cellEl.classList.add('right');

                       // Add corner classes for exposed corners
                       if (!hasTop && !hasLeft) cellEl.classList.add('corner-tl');
                       if (!hasTop && !hasRight) cellEl.classList.add('corner-tr');
                       if (!hasBottom && !hasLeft) cellEl.classList.add('corner-bl');
                       if (!hasBottom && !hasRight) cellEl.classList.add('corner-br');

                       pieceEl.appendChild(cellEl);
                   });

                   container.appendChild(pieceEl);
               });
           }

           createPieceDragImage(piece) {
               // Create a container for the drag image
               const dragContainer = document.createElement('div');
               dragContainer.style.position = 'absolute';
               dragContainer.style.top = '-9999px';
               dragContainer.style.left = '-9999px';

               // Find bounds of actual cells
               let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
               const cells = [];

               piece.letters.forEach((row, y) => {
                   row.forEach((letter, x) => {
                       if (letter !== null) {
                           minX = Math.min(minX, x);
                           minY = Math.min(minY, y);
                           maxX = Math.max(maxX, x);
                           maxY = Math.max(maxY, y);
                           cells.push({ x, y, letter });
                       }
                   });
               });

               // Set container size
               dragContainer.style.width = `${(maxX - minX + 1) * 50}px`;
               dragContainer.style.height = `${(maxY - minY + 1) * 50}px`;

               // Create a map of occupied cells for neighbor checking
               const occupied = new Set(cells.map(c => `${c.x},${c.y}`));

               // Create cells with smart borders and corners
               cells.forEach(({ x, y, letter }) => {
                   const cellEl = document.createElement('div');
                   cellEl.style.width = '50px';
                   cellEl.style.height = '50px';
                   cellEl.style.display = 'flex';
                   cellEl.style.alignItems = 'center';
                   cellEl.style.justifyContent = 'center';
                   cellEl.style.fontSize = '24px';
                   cellEl.style.fontFamily = 'Arial, sans-serif';
                   cellEl.style.fontWeight = 'bold';
                   cellEl.style.color = '#fff';
                   cellEl.style.backgroundColor = '#b39ddb';
                   cellEl.style.position = 'absolute';
                   cellEl.style.left = `${(x - minX) * 50}px`;
                   cellEl.style.top = `${(y - minY) * 50}px`;
                   cellEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                   cellEl.textContent = letter;

                   // Check neighbors
                   const hasTop = occupied.has(`${x},${y - 1}`);
                   const hasBottom = occupied.has(`${x},${y + 1}`);
                   const hasLeft = occupied.has(`${x - 1},${y}`);
                   const hasRight = occupied.has(`${x + 1},${y}`);

                   // Add borders for exposed edges
                   if (!hasTop) cellEl.style.borderTop = '2px solid #7b1fa2';
                   if (!hasBottom) cellEl.style.borderBottom = '2px solid #7b1fa2';
                   if (!hasLeft) cellEl.style.borderLeft = '2px solid #7b1fa2';
                   if (!hasRight) cellEl.style.borderRight = '2px solid #7b1fa2';

                   // Add corner rounding for exposed corners
                   if (!hasTop && !hasLeft) cellEl.style.borderTopLeftRadius = '8px';
                   if (!hasTop && !hasRight) cellEl.style.borderTopRightRadius = '8px';
                   if (!hasBottom && !hasLeft) cellEl.style.borderBottomLeftRadius = '8px';
                   if (!hasBottom && !hasRight) cellEl.style.borderBottomRightRadius = '8px';

                   dragContainer.appendChild(cellEl);
               });

               return dragContainer;
           }

           setupEventListeners() {
               const board = this.container.querySelector('.game-board');
               const piecesContainer = this.container.querySelector('.pieces-container');
               let isDragging = false;

               // Drag start from pieces
               piecesContainer.addEventListener('dragstart', (e) => {
                   if (e.target.classList.contains('piece')) {
                       this.draggedPiece = parseInt(e.target.dataset.pieceIndex);
                       this.draggedFromGrid = false;
                       e.target.classList.add('dragging');

                       // Calculate which cell of the piece was clicked
                       const piece = this.pieces[this.draggedPiece];
                       const pieceRect = e.target.getBoundingClientRect();
                       const clickX = e.clientX - pieceRect.left;
                       const clickY = e.clientY - pieceRect.top;

                       // Find the bounds of the piece
                       let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                       const cells = [];
                       piece.letters.forEach((row, y) => {
                           row.forEach((letter, x) => {
                               if (letter !== null) {
                                   minX = Math.min(minX, x);
                                   minY = Math.min(minY, y);
                                   maxX = Math.max(maxX, x);
                                   maxY = Math.max(maxY, y);
                                   cells.push({ x, y });
                               }
                           });
                       });

                       // Calculate which visual cell was clicked (in the rendered piece's coordinate system)
                       const visualCellX = Math.floor(clickX / 50);
                       const visualCellY = Math.floor(clickY / 50);

                       // Map back to piece coordinate system
                       this.dragOffsetX = minX + visualCellX;
                       this.dragOffsetY = minY + visualCellY;
                   }
               });

               piecesContainer.addEventListener('dragend', (e) => {
                   if (e.target.classList.contains('piece')) {
                       e.target.classList.remove('dragging');
                   }
               });

               // Allow dropping pieces back to the tray
               piecesContainer.addEventListener('dragover', (e) => {
                   e.preventDefault();
                   if (this.draggedFromGrid) {
                       piecesContainer.style.backgroundColor = '#d8d8d8'; // Highlight on hover
                   }
               });

               piecesContainer.addEventListener('dragleave', (e) => {
                   piecesContainer.style.backgroundColor = '';
               });

               piecesContainer.addEventListener('drop', (e) => {
                   e.preventDefault();
                   piecesContainer.style.backgroundColor = '';

                   if (this.draggedPiece !== null && this.draggedFromGrid) {
                       // Remove piece from grid
                       const piece = this.pieces[this.draggedPiece];
                       for (let py = 0; py < piece.letters.length; py++) {
                           for (let px = 0; px < piece.letters[py].length; px++) {
                               if (piece.letters[py][px] !== null) {
                                   this.grid[piece.y + py][piece.x + px] = null;
                               }
                           }
                       }
                       piece.placed = false;
                       delete piece.x;
                       delete piece.y;

                       this.updateBoard();
                       this.renderPieces();
                       this.clearValidation();
                   }

                   // Clear highlights and state
                   board.querySelectorAll('.drop-target, .drop-target-invalid').forEach(el => {
                       el.classList.remove('drop-target');
                       el.classList.remove('drop-target-invalid');
                   });
                   board.querySelectorAll('.grid-cell').forEach(c => c.style.opacity = '1');
                   this.draggedPiece = null;
                   this.draggedFromGrid = false;
               });

               // Drag start from grid
               board.addEventListener('dragstart', (e) => {
                   const cell = e.target.closest('.grid-cell');
                   if (cell && cell.classList.contains('filled')) {
                       isDragging = true;
                       const x = parseInt(cell.dataset.x);
                       const y = parseInt(cell.dataset.y);
                       const gridCell = this.grid[y][x];

                       if (gridCell) {
                           this.draggedPiece = gridCell.pieceIndex;
                           this.draggedFromGrid = true;
                           this.draggedFromX = x;
                           this.draggedFromY = y;

                           const piece = this.pieces[this.draggedPiece];

                           // Create a drag image showing the entire piece
                           const dragImage = this.createPieceDragImage(piece);
                           document.body.appendChild(dragImage);

                           // Set the drag image
                           const rect = cell.getBoundingClientRect();
                           const offsetX = (x - piece.x) * 50 + 25;
                           const offsetY = (y - piece.y) * 50 + 25;
                           e.dataTransfer.setDragImage(dragImage, offsetX, offsetY);

                           // Remove drag image after a short delay
                           setTimeout(() => {
                               if (dragImage && dragImage.parentNode) {
                                   dragImage.parentNode.removeChild(dragImage);
                               }
                           }, 0);

                           // Temporarily make cells semi-transparent
                           for (let py = 0; py < piece.letters.length; py++) {
                               for (let px = 0; px < piece.letters[py].length; px++) {
                                   if (piece.letters[py][px] !== null) {
                                       const c = board.querySelector(
                                           `[data-x="${piece.x + px}"][data-y="${piece.y + py}"]`
                                       );
                                       if (c) c.style.opacity = '0.5';
                                   }
                               }
                           }
                       }
                   }
               });

               board.addEventListener('dragend', (e) => {
                   // Reset opacity and clear highlights
                   board.querySelectorAll('.grid-cell').forEach(c => {
                       c.style.opacity = '1';
                       c.classList.remove('drop-target');
                       c.classList.remove('drop-target-invalid');
                   });
                   setTimeout(() => { isDragging = false; }, 10);
               });

               // Drop on grid
               board.addEventListener('dragover', (e) => {
                   e.preventDefault();

                   if (this.draggedPiece !== null) {
                       // Remove previous highlights
                       board.querySelectorAll('.drop-target').forEach(el => {
                           el.classList.remove('drop-target');
                           el.classList.remove('drop-target-invalid');
                       });

                       const piece = this.pieces[this.draggedPiece];

                       // Calculate which grid cell the mouse is over
                       const boardRect = board.getBoundingClientRect();
                       const mouseX = e.clientX - boardRect.left - 15; // Subtract padding
                       const mouseY = e.clientY - boardRect.top - 15;  // Subtract padding



                       // Calculate grid cell based on mouse position
                       const cellX = Math.floor(mouseX / 54); // 50px cell + 4px gap
                       const cellY = Math.floor(mouseY / 54);



                       if (cellX >= 0 && cellX < this.gridSize.width &&
                           cellY >= 0 && cellY < this.gridSize.height) {

                           // Calculate the piece's top-left corner position
                           let targetX, targetY;

                           if (this.draggedFromGrid && piece.placed) {
                               // If dragging from grid, adjust based on where we clicked
                               const clickedOffsetX = this.draggedFromX - piece.x;
                               const clickedOffsetY = this.draggedFromY - piece.y;
                               targetX = cellX - clickedOffsetX;
                               targetY = cellY - clickedOffsetY;
                           } else {
                               // If dragging from tray, adjust based on where we clicked within the piece
                               // dragOffsetX/Y are in piece coordinates (0-indexed in piece.letters)
                               // They represent which cell in piece.letters was clicked
                               // If not set, default to the top-left non-null cell
                               let offsetX, offsetY;
                               if (this.dragOffsetX !== undefined && this.dragOffsetY !== undefined) {
                                   offsetX = this.dragOffsetX;
                                   offsetY = this.dragOffsetY;
                               } else {
                                   // Find top-left non-null cell as default
                                   let minX = Infinity, minY = Infinity;
                                   piece.letters.forEach((row, y) => {
                                       row.forEach((letter, x) => {
                                           if (letter !== null) {
                                               minX = Math.min(minX, x);
                                               minY = Math.min(minY, y);
                                           }
                                       });
                                   });
                                   offsetX = minX !== Infinity ? minX : 0;
                                   offsetY = minY !== Infinity ? minY : 0;
                               }
                               
                               // Calculate where piece.letters[0][0] should go in the grid
                               // so that piece.letters[offsetY][offsetX] aligns with grid[cellY][cellX]
                               targetX = cellX - offsetX;
                               targetY = cellY - offsetY;
                           }



                           // Temporarily remove from grid if dragging from grid
                           let tempRemoved = false;
                           if (this.draggedFromGrid && piece.placed) {
                               for (let py = 0; py < piece.letters.length; py++) {
                                   for (let px = 0; px < piece.letters[py].length; px++) {
                                       if (piece.letters[py][px] !== null) {
                                           this.grid[piece.y + py][piece.x + px] = null;
                                       }
                                   }
                               }
                               tempRemoved = true;
                           }

                           // Always highlight the drop area to show where the piece would go
                           // Use different styling if placement is invalid
                           if (targetX >= 0 && targetY >= 0) {

                               this.highlightDropArea(piece, targetX, targetY);

                               
                               // If placement is invalid, add invalid class
                              const canPlace = this.canPlacePiece(piece, targetX, targetY);

                               if (!canPlace) {
                                   const board = this.container.querySelector('.game-board');
                                   for (let py = 0; py < piece.letters.length; py++) {
                                       for (let px = 0; px < piece.letters[py].length; px++) {
                                           if (piece.letters[py][px] === null) continue;
                                           const gridX = targetX + px;
                                           const gridY = targetY + py;
                                           if (gridX >= 0 && gridX < this.gridSize.width &&
                                               gridY >= 0 && gridY < this.gridSize.height) {
                                               const cell = board.querySelector(
                                                   `[data-x="${gridX}"][data-y="${gridY}"]`
                                               );
                                               if (cell) {
                                                   cell.classList.add('drop-target-invalid');
                                               }
                                           }
                                       }
                                   }
                               }
                           }
                           
                           if (this.canPlacePiece(piece, targetX, targetY)) {
                               this.dropTargetX = targetX;
                               this.dropTargetY = targetY;
                           } else {
                               this.dropTargetX = null;
                               this.dropTargetY = null;
                           }

                           // Restore if we removed temporarily
                           if (tempRemoved) {
                               for (let py = 0; py < piece.letters.length; py++) {
                                   for (let px = 0; px < piece.letters[py].length; px++) {
                                       if (piece.letters[py][px] !== null) {
                                           this.grid[piece.y + py][piece.x + px] = {
                                               letter: piece.letters[py][px],
                                               pieceIndex: this.draggedPiece
                                           };
                                       }
                                   }
                               }
                           }
                       } else {
                           // Mouse is outside grid bounds, clear highlights
                           this.dropTargetX = null;
                           this.dropTargetY = null;
                       }
                   }
               });

               board.addEventListener('drop', (e) => {
                   e.preventDefault();

                   if (this.draggedPiece !== null && this.dropTargetX !== null && this.dropTargetY !== null) {
                       // Remove from old position if dragging from grid
                       if (this.draggedFromGrid) {
                           const piece = this.pieces[this.draggedPiece];
                           for (let py = 0; py < piece.letters.length; py++) {
                               for (let px = 0; px < piece.letters[py].length; px++) {
                                   if (piece.letters[py][px] !== null) {
                                       this.grid[piece.y + py][piece.x + px] = null;
                                   }
                               }
                           }
                           piece.placed = false;
                       }

                       this.placePiece(this.draggedPiece, this.dropTargetX, this.dropTargetY);
                   }

                   // Clear highlights
                   board.querySelectorAll('.drop-target, .drop-target-invalid').forEach(el => {
                       el.classList.remove('drop-target');
                       el.classList.remove('drop-target-invalid');
                   });
                   board.querySelectorAll('.grid-cell').forEach(c => c.style.opacity = '1');
                   this.draggedPiece = null;
                   this.draggedFromGrid = false;
                   this.dropTargetX = null;
                   this.dropTargetY = null;
               });

               // Click to remove piece from grid (only if not dragging)
               board.addEventListener('click', (e) => {
                   if (isDragging) return;

                   const cell = e.target.closest('.grid-cell');
                   if (cell) {
                       const x = parseInt(cell.dataset.x);
                       const y = parseInt(cell.dataset.y);
                       this.removePiece(x, y);
                   }
               });

               // Buttons
               this.container.querySelector('.check-btn').addEventListener('click', () =>
                   this.checkSolution()
               );
               this.container.querySelector('.reset-btn').addEventListener('click', () =>
                   this.reset()
               );
           }

           highlightDropArea(piece, x, y) {

               const board = this.container.querySelector('.game-board');

               for (let py = 0; py < piece.letters.length; py++) {
                   for (let px = 0; px < piece.letters[py].length; px++) {
                       if (piece.letters[py][px] === null) continue;  // Skip empty cells
                       

                      const gridX = x + px;
                      const gridY = y + py;


                       if (gridX >= 0 && gridX < this.gridSize.width &&
                           gridY >= 0 && gridY < this.gridSize.height) {
                           const cell = board.querySelector(
                               `[data-x="${gridX}"][data-y="${gridY}"]`
                           );
                           if (cell) {
                              cell.classList.add('drop-target');
                          }
                          }

                   }
               }

           }


           canPlacePiece(piece, x, y) {
               for (let py = 0; py < piece.letters.length; py++) {
                   for (let px = 0; px < piece.letters[py].length; px++) {
                      if (piece.letters[py][px] === null) continue;  // Skip empty cells in L-shapes

                       const gridX = x + px;
                       const gridY = y + py;

                       if (gridX >= this.gridSize.width || gridY >= this.gridSize.height) {
                           return false;
                       }

                       if (this.grid[gridY][gridX] !== null) {
                           return false;
                       }
                   }
               }
               return true;
           }

           placePiece(pieceIndex, x, y) {
               const piece = this.pieces[pieceIndex];

               if (!this.canPlacePiece(piece, x, y)) {
                   return;
               }

              // Start timer on first piece placement
              this.startTimer();


               // Place piece in grid
               for (let py = 0; py < piece.letters.length; py++) {
                   for (let px = 0; px < piece.letters[py].length; px++) {
                       if (piece.letters[py][px] !== null) {
                           this.grid[y + py][x + px] = {
                               letter: piece.letters[py][px],
                               pieceIndex: pieceIndex
                           };
                       }
                   }
               }

               piece.placed = true;
               piece.x = x;
               piece.y = y;

               this.updateBoard();
               this.renderPieces();
           }

           removePiece(x, y) {
               const cell = this.grid[y][x];
               if (!cell) return;

               const pieceIndex = cell.pieceIndex;
               const piece = this.pieces[pieceIndex];

               // Remove from grid
               for (let py = 0; py < piece.letters.length; py++) {
                   for (let px = 0; px < piece.letters[py].length; px++) {
                       if (piece.letters[py][px] !== null) {
                           this.grid[piece.y + py][piece.x + px] = null;
                       }
                   }
               }

               piece.placed = false;
               delete piece.x;
               delete piece.y;

               this.updateBoard();
               this.renderPieces();
               this.clearValidation();
           }

           updateBoard() {
               const board = this.container.querySelector('.game-board');
               for (let y = 0; y < this.gridSize.height; y++) {
                   for (let x = 0; x < this.gridSize.width; x++) {
                       const cell = board.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                       const gridCell = this.grid[y][x];

                       if (gridCell) {
                           cell.textContent = gridCell.letter;
                           cell.classList.add('filled');
                           cell.draggable = true;
                       } else {
                           cell.textContent = '';
                           cell.classList.remove('filled');
                           cell.draggable = false;
                       }
                   }
               }
           }

           clearValidation() {
               const board = this.container.querySelector('.game-board');
               board.querySelectorAll('.grid-cell').forEach(cell => {
                   cell.classList.remove('valid-row', 'invalid-row');
               });

               const status = this.container.querySelector('.status-message');
               status.className = 'status-message';
               status.textContent = '';
           }

           checkSolution() {
               this.clearValidation();

               const board = this.container.querySelector('.game-board');
               let allValid = true;

               // Check each row
               for (let y = 0; y < this.gridSize.height; y++) {
                   let word = '';
                   for (let x = 0; x < this.gridSize.width; x++) {
                       word += this.grid[y][x] ? this.grid[y][x].letter : '';
                   }

                   const isValid = this.validWords.has(word);

                   // Highlight row
                   for (let x = 0; x < this.gridSize.width; x++) {
                       const cell = board.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                       if (this.grid[y][x]) {
                           cell.classList.add(isValid ? 'valid-row' : 'invalid-row');
                       }
                   }

                   if (!isValid) {
                       allValid = false;
                   }
               }

               const status = this.container.querySelector('.status-message');
               if (allValid) {
                   status.className = 'status-message success';
                   status.textContent = '🎉 Congratulations! You solved it!';
                  this.stopTimer();
                  this.isPuzzleCompleted = true;
                  const timerEl = this.container.querySelector('.timer');
                  timerEl.classList.remove('running');
                  timerEl.classList.add('completed');

               } else {
                   status.className = 'status-message error';
                   status.textContent = 'Not quite right. Check the red rows.';
               }
           }


          startTimer() {
              if (this.startTime !== null || this.isPuzzleCompleted) return;

              this.startTime = Date.now() - this.elapsedTime;
              const timerEl = this.container.querySelector('.timer');
              timerEl.classList.add('running');

              this.timerInterval = setInterval(() => {
                  this.elapsedTime = Date.now() - this.startTime;
                  this.updateTimerDisplay();
              }, 100);
          }

          stopTimer() {
              if (this.timerInterval) {
                  clearInterval(this.timerInterval);
                  this.timerInterval = null;
              }
          }

          updateTimerDisplay() {
              const timerEl = this.container.querySelector('.timer');
              const seconds = Math.floor(this.elapsedTime / 1000);
              const minutes = Math.floor(seconds / 60);
              const remainingSeconds = seconds % 60;
              timerEl.textContent = `Time: ${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
          }
           reset() {
               this.pieces = JSON.parse(JSON.stringify(this.puzzleData.pieces));
               this.grid = Array(this.gridSize.height).fill().map(() =>
                   Array(this.gridSize.width).fill(null)
               );
               this.updateBoard();
               this.renderPieces();
               this.clearValidation();

              // Reset timer
              this.stopTimer();
              this.startTime = null;
              this.elapsedTime = 0;
              this.isPuzzleCompleted = false;
              const timerEl = this.container.querySelector('.timer');
              timerEl.classList.remove('running', 'completed');
              timerEl.textContent = 'Time: 0:00';

           }
       }

       const puzzles = [
           {
               name: "Puzzle 1: 3×3",
               difficulty: "easy",
               targetTime: "1 minute",
               hint: "the final words will always form a phrase",
               gridSize: { width: 3, height: 3 },
               pieces: [
                   { letters: [['U']] },
                   { letters: [['Y']] },
                   { letters: [['F', 'U']] },
                   { letters: [['D'], ['N']] },
                   { letters: [['O'], ['A']] },
                   { letters: [['H']] }
               ]
           },
           {
               name: "Puzzle 2: 4×4",
               difficulty: "easy",
               targetTime: "3 minutes",
               hint: null,
               gridSize: { width: 4, height: 4 },
               pieces: [
                   { letters: [['N'], ['L']] },
                   { letters: [['E'], ['E']] },
                   { letters: [['N', 'L']] },
                   { letters: [['U', 'C']] },
                   { letters: [['D'], ['K']] },
                   { letters: [['O'], ['P']] },
                   { letters: [['Y'], ['Y']] },
                   { letters: [['R'], ['E']] }
               ]
           },
           {
               name: "Puzzle 3: 5×5",
               difficulty: "medium",
               targetTime: "5 minutes",
               hint: null,
               gridSize: { width: 5, height: 5 },
               pieces: [
                   { letters: [['R']] },                         // 1 letter - single tile
                   { letters: [['K', 'S']] },                    // 2 letters - horizontal
                   { letters: [['R', 'D']] },                    // 2 letters - horizontal
                   { letters: [['W', 'O']] },                    // 2 letters - horizontal
                   { letters: [['L'], ['M']] },                  // 2 letters - vertical
                   { letters: [['Q'], ['O']] },                  // 2 letters - vertical
                   { letters: [['E'], ['A']] },                  // 2 letters - vertical
                   { letters: [['U', 'I', 'T']] },               // 3 letters - horizontal
                   { letters: [['S'], ['E'], ['N']] },           // 3 letters - vertical
                   { letters: [['E', null], ['V', 'E']] },       // 3 letters - L-shape (missing top-right)
                   { letters: [['F', 'T'], [null, 'A']] }        // 3 letters - L-shape (missing bottom-left)
               ]
           },
           {
               name: "Puzzle 4: 6×6",
               difficulty: "medium",
               targetTime: "7 minutes",
               hint: null,
               gridSize: { width: 6, height: 6 },
               pieces: [
                   { letters: [['H', 'O']] },                    // 2 letters - horizontal
                   { letters: [['V', 'E']] },                    // 2 letters - horizontal
                   { letters: [['D', 'U']] },                    // 2 letters - horizontal
                   { letters: [['E', 'O']] },                    // 2 letters - horizontal
                   { letters: [['T', 'S']] },                    // 2 letters - horizontal
                   { letters: [['U', 'L']] },                    // 2 letters - horizontal
                   { letters: [['P'], ['S']] },                  // 2 letters - vertical
                   { letters: [['B'], ['E']] },                  // 2 letters - vertical
                   { letters: [['G'], ['G']] },                  // 2 letters - vertical
                   { letters: [['P', 'L', 'E']] },               // 3 letters - horizontal
                   { letters: [['P', 'U', 'Z']] },               // 3 letters - horizontal
                   { letters: [['Z', null], ['I', 'N']] },       // 3 letters - L-shape (missing top-right)
                   { letters: [['I', 'N'], ['N', null]] },       // 3 letters - L-shape (missing bottom-right)
                   { letters: [[null, 'D'], ['L', 'E']] },       // 3 letters - L-shape (missing top-left)
                   { letters: [[null, 'R'], ['O', 'R']] }        // 3 letters - L-shape (missing top-left)
               ]
           }
       ];

       function createGameInstance(puzzleData, index) {
           const container = document.createElement('div');
           container.className = 'game-instance';
           container.id = `puzzle-${index}`;

           container.innerHTML = `
               <h3>${puzzleData.name}</h3>
              <div class="puzzle-info">
                  <div>Difficulty: ${puzzleData.difficulty}</div>
                  <div class="puzzle-info-row">
                      <span>Target time: ${puzzleData.targetTime}</span>
                      <span class="timer">Time: 0:00</span>
                  </div>
              </div>
               <div class="game-content"></div>
           `;

           document.getElementById('all-games-container').appendChild(container);
           new JigsawPuzzle(container, puzzleData, index);
       }

       // Initialize all puzzles
       puzzles.forEach((puzzle, index) => {
           createGameInstance(puzzle, index + 1);
       });
   </script>
</body>
</html>
