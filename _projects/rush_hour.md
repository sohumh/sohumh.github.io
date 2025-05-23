---
layout: page
title: Word Rush Hour
description: Rush hour where the cars are words.
importance: 1
img: assets/img/rush-hour.png
category: puzzles
---

In the following variation of rush hour, the cars are words. Any time a car finishes movement, the resulting grid must contain only valid 
words. Cars can only move forwards or backwards in the direction they are facing, and can move many spaces at once.


<html>
<head>
   <title>Word Rush Hour</title>
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
           outline: none;
       }

       .game-instance h3 {
           margin: 0 0 15px 0;
           font-size: 24px;
           color: #333;
       }

       .game-instance:not(:last-child)::after {
           content: '';
           display: block;
           height: 1px;
           background: linear-gradient(to right, transparent, #ccc, transparent);
           margin-top: 20px;
       }

       .game-board {
           display: grid;
           gap: 2px;
           padding: 10px;
           background-color: #ccc;
           width: fit-content;
           border: 2px solid #333;
       }

       .cell {
           width: 50px;
           height: 50px;
           background-color: #fff;
           position: relative;
           display: flex;
           align-items: center;
           justify-content: center;
           cursor: pointer;
           font-size: 24px;
           font-family: monospace;
           border-top: 2px solid #333;
           border-left: 2px solid #333;
       }

        .vehicle-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Add red as another vehicle option */
        .car.vehicle-red .vehicle-container {
            background-color: #f44336;
        }

       .selected .vehicle-container {
           outline: 3px solid #fff;
           outline-offset: -3px;
           box-shadow: 0 0 10px rgba(0,0,0,0.5);
       }

       .controls {
           margin-top: 20px;
       }

       .controls button {
           padding: 8px 16px;
           font-size: 16px;
           cursor: pointer;
           background-color: #fff;
           border: 2px solid #333;
           border-radius: 4px;
       }

       .controls button:hover {
           background-color: #f0f0f0;
       }

       .instructions {
           margin: 20px 20px;
           padding: 15px;
           border-radius: 5px;
       }

       .instructions ul {
           margin: 10px 0;
           padding-left: 20px;
       }

       .instructions li {
           margin: 5px 0;
       }

       .vehicle-start .vehicle-container, .vehicle-end .vehicle-container {
            position: relative;
        }

        .vehicle-start .vehicle-container::before, .vehicle-end .vehicle-container::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: white;
            border-radius: inherit;
            z-index: -1;
        }

        .invalid-word {
            background-color: #ffebee;
        }
   </style>
</head>
<body>
   <div class="instructions">
       <p>Instructions:</p>
       <ul>
           <li>Click a car to select it</li>
           <li>Use the keyboard arrow keys to move selected car</li>
           <li>Move the red car horizontally to the exit arrow</li>
           <li>Moves count once per track selection</li>
           <li>All consecutive letters must form valid words</li>
           <li>The whole grid does not need to be connected</li>
           <li>Individual letters can stand alone and move both forwards and backwards.</li>
       </ul>
   </div>

   <div id="all-games-container">
       <!-- Games will be dynamically added here -->
   </div>

   <script>
       const PUZZLE_0_WORDS = ['ACRE', 'RASH', 'HEY', 'EASY', 'EASE', 'CASE', 'CASH', 'HASH', 'HAS', 'AS', 'ASH', 'OWE', 'WE', 'MY', 'WHEY', 'AM'];
       const PUZZLE_1_WORDS = ['EAR', 'ON', 'UP', 'AT', 'TO', 'AX', 'ATOP', 'TOP', 'TEAR', 'OX'];
       const PUZZLE_2_WORDS = ['HORN', 'TIE', 'YEA', 'OR', 'OAT', 'HAT', 'NOR', 'IN', 'THORN', 'YEAR', 'RAIN', 'RAINY', 'TIER'];
       const PUZZLE_3_WORDS = ['PINT', 'PIN', 'IN', 'AT', 'IF', 'GNAT', 'BE'];
       const VALID_WORDS = new Set([...PUZZLE_0_WORDS, ...PUZZLE_1_WORDS, ...PUZZLE_2_WORDS, ...PUZZLE_3_WORDS]);


       class GameInstance {
           constructor(container, initialState) {
               this.container = container;
               this.initialState = JSON.parse(JSON.stringify(initialState));
               this.gameState = JSON.parse(JSON.stringify(initialState));
               this.selectedVehicle = null;
               this.moveCount = 0;
               this.lastTrack = null;
               this.gridSize = initialState.gridSize;
               // Store the state before a vehicle is selected
               this.preSelectionState = null;
               this.preSelectionMoveCount = 0;
               
               this.createBoard();
               this.setupEventListeners();
           }

           attachEventListeners() {
                // Clear existing listeners first
                this.container.querySelectorAll('.cell').forEach(cell => {
                    const clone = cell.cloneNode(true);
                    cell.parentNode.replaceChild(clone, cell);
                });

                // Attach new listeners
                this.container.querySelectorAll('.cell').forEach(cell => {
                    cell.addEventListener('click', (e) => this.handleCellClick(e));
                });
            }
           createBoard() {
               const board = this.container.querySelector('.game-board');
               board.innerHTML = '';
               
               // Add unique ID to board
               const boardId = `game-board-${this.container.id}`;
               board.id = boardId;
               
               const styleId = `board-style-${this.container.id}`;
               let styleEl = document.getElementById(styleId);
               if (!styleEl) {
                   styleEl = document.createElement('style');
                   styleEl.id = styleId;
                   document.head.appendChild(styleEl);
               }
               
               styleEl.textContent = `
                   #${boardId} {
                       grid-template-columns: repeat(${this.gridSize.width}, 50px);
                       grid-template-rows: repeat(${this.gridSize.height}, 50px);
                       padding: 2px;  /* Make padding consistent and small */
                       gap: 2px;
                       background-color: #ccc;
                   }
                   
                   #${boardId} .cell[data-x="${this.gridSize.width - 1}"] {
                       border-right: 2px solid #333;
                   }
                   
                   #${boardId} .cell[data-y="${this.gridSize.height - 1}"] {
                       border-bottom: 2px solid #333;
                   }
                   
                   #${boardId} .cell[data-x="${this.gridSize.width - 1}"][data-y="${this.gameState.redCar.y}"] {
                       border-right: none;
                   }
                   
                   #${boardId} .cell[data-x="${this.gridSize.width - 1}"][data-y="${this.gameState.redCar.y}"]::after {
                       content: "→";
                       position: absolute;
                       right: -22px;
                       top: 50%;
                       transform: translateY(-50%);
                       font-size: 20px;
                       color: #333;
                       font-weight: bold;
                       text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
                   }
               `;

               styleEl.textContent += this.gameState.vehicles.map((_, index) => `
                   #${boardId} .vehicle-${index}-start.horizontal .vehicle-container {
                       border-radius: 25px 0 0 25px;
                   }
                   #${boardId} .vehicle-${index}-end.horizontal .vehicle-container {
                       border-radius: 0 25px 25px 0;
                   }
                   #${boardId} .vehicle-${index}-start.vertical .vehicle-container {
                       border-radius: 25px 25px 0 0;
                   }
                   #${boardId} .vehicle-${index}-end.vertical .vehicle-container {
                       border-radius: 0 0 25px 25px;
                   }
                   #${boardId} .vehicle-red-start.horizontal .vehicle-container {
                       border-radius: 0 25px 25px 0;
                   }
               `).join('\n');

               styleEl.textContent += this.gameState.vehicles.map((vehicle, index) => {
                   const blueShade = Math.max(20, 80 - (index * 5));
                   return `
                       #${boardId} .car.vehicle-${index} .vehicle-container {
                           background-color: hsl(210, 80%, ${blueShade}%);
                       }
                   `;
               }).join('\n');

               // Create cells
               for (let y = 0; y < this.gridSize.height; y++) {
                   for (let x = 0; x < this.gridSize.width; x++) {
                       const cell = document.createElement('div');
                       cell.className = 'cell';
                       cell.dataset.x = x;
                       cell.dataset.y = y;
                       board.appendChild(cell);
                   }
               }

               this.placeVehicles();
               this.attachEventListeners();
           }

           placeVehicles() {
               this.container.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
               this.placeVehicle(this.gameState.redCar);
               this.gameState.vehicles.forEach(vehicle => this.placeVehicle(vehicle));
               
               if (this.selectedVehicle) {
                   this.highlightVehicle(this.selectedVehicle);
               }
           }

           validateWords() {
               // Get all letters in the grid
               const grid = Array(this.gridSize.height).fill().map(() => 
                   Array(this.gridSize.width).fill(' ')
               );

               // Fill grid with letters from vehicles
               const fillVehicleLetters = (vehicle) => {
                   for (let i = 0; i < vehicle.letters.length; i++) {
                       const x = vehicle.horizontal ? vehicle.x + i : vehicle.x;
                       const y = vehicle.horizontal ? vehicle.y : vehicle.y + i;
                       grid[y][x] = vehicle.letters[i];
                   }
               };

               fillVehicleLetters(this.gameState.redCar);
               this.gameState.vehicles.forEach(fillVehicleLetters);

               // Check rows and columns for invalid words
               let isValid = true;
               let invalidWord = '';

               // Check rows
               for (let y = 0; y < this.gridSize.height; y++) {
                   let word = '';
                   for (let x = 0; x < this.gridSize.width; x++) {
                       if (grid[y][x] !== ' ') {
                           word += grid[y][x];
                       } else if (word.length >= 2) {
                           if (!VALID_WORDS.has(word)) {
                               isValid = false;
                               invalidWord = word;
                           }
                           word = '';
                       } else {
                           word = '';
                       }
                   }
                   if (word.length >= 2 && !VALID_WORDS.has(word)) {
                       isValid = false;
                       invalidWord = word;
                   }
               }

               // Check columns
               for (let x = 0; x < this.gridSize.width; x++) {
                   let word = '';
                   for (let y = 0; y < this.gridSize.height; y++) {
                       if (grid[y][x] !== ' ') {
                           word += grid[y][x];
                       } else if (word.length >= 2) {
                           if (!VALID_WORDS.has(word)) {
                               isValid = false;
                               invalidWord = word;
                           }
                           word = '';
                       } else {
                           word = '';
                       }
                   }
                   if (word.length >= 2 && !VALID_WORDS.has(word)) {
                       isValid = false;
                       invalidWord = word;
                   }
               }

               if (!isValid) {
                   this.invalidWord = invalidWord;
               }
               return isValid;
           }

            placeVehicle(vehicle) {
                const { x, y, horizontal, letters, color } = vehicle;
                const vehicleIndex = color === 'red' ? 'red' : this.gameState.vehicles.indexOf(vehicle);
                const direction = horizontal ? 'horizontal' : 'vertical';
                const length = letters.length;

                for (let i = 0; i < length; i++) {
                    const cellX = horizontal ? x + i : x;
                    const cellY = horizontal ? y : y + i;
                    const cell = this.container.querySelector(`[data-x="${cellX}"][data-y="${cellY}"]`);

                    if (!cell) continue;

                    const vehicleContainer = document.createElement('div');
                    vehicleContainer.className = 'vehicle-container';
                    
                    cell.classList.add('car', direction, `vehicle-${vehicleIndex}`);

                    if (i === 0) {
                        cell.classList.add(`vehicle-${vehicleIndex}-start`);
                    } else if (i === length - 1) {
                        cell.classList.add(`vehicle-${vehicleIndex}-end`);
                    }

                    vehicleContainer.textContent = letters[i];
                    cell.appendChild(vehicleContainer);
                }
            }

           highlightVehicle(vehicle) {
               for (let i = 0; i < vehicle.letters.length; i++) {
                   const x = vehicle.horizontal ? vehicle.x + i : vehicle.x;
                   const y = vehicle.horizontal ? vehicle.y : vehicle.y + i;
                   const cell = this.container.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                   cell.classList.add('selected');
               }
           }

            setupEventListeners() {
                // Convert global event listener to board-specific
                this.container.addEventListener('keydown', (e) => {
                    if (this.selectedVehicle) {
                        this.handleKeyPress(e);
                    }
                });

                this.container.querySelector('button').addEventListener('click', () => this.resetGame());

                // Make the container focusable
                this.container.tabIndex = 0;
            }

           handleCellClick(event) {
                const cell = event.target.closest('.cell');
                const x = parseInt(cell.dataset.x);
                const y = parseInt(cell.dataset.y);

                if (cell.classList.contains('car') || cell.classList.contains('truck')) {
                    // Check word validity before changing selection
                    if (this.selectedVehicle && !this.validateWords()) {
                        // Restore to pre-selection state instead of full reset
                        this.gameState = JSON.parse(JSON.stringify(this.preSelectionState));
                        this.moveCount = this.preSelectionMoveCount;
                        this.container.querySelector('.moves').textContent = this.moveCount;
                        this.selectedVehicle = null;
                        this.lastTrack = null;
                        alert(`Invalid word formation: ${this.invalidWord}`);
                        this.createBoard();
                        return;
                    }
                    
                    // Before selecting a new vehicle, store the current state
                    this.preSelectionState = JSON.parse(JSON.stringify(this.gameState));
                    this.preSelectionMoveCount = this.moveCount;
                    
                    const vehicle = this.findVehicle(x, y);
                    this.selectedVehicle = vehicle;
                    this.lastTrack = null;
                    this.placeVehicles();
                    
                    // Add this line to focus the container when selecting a vehicle
                    this.container.focus();
                }
            }

           handleKeyPress(event) {
               if (!this.selectedVehicle) return;

               if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                   event.preventDefault();
               }

               let dx = 0;
               let dy = 0;

               if (this.selectedVehicle.horizontal) {
                   if (event.key === 'ArrowLeft') dx = -1;
                   if (event.key === 'ArrowRight') dx = 1;
               } else {
                   if (event.key === 'ArrowUp') dy = -1;
                   if (event.key === 'ArrowDown') dy = 1;
               }

               if (dx !== 0 || dy !== 0) {
                   if (this.canMove(this.selectedVehicle, dx, dy)) {
                       this.moveVehicle(this.selectedVehicle, dx, dy);
                       this.checkWin();
                   }
               }
           }

           findVehicle(x, y) {
               if (this.isPointInVehicle(this.gameState.redCar, x, y)) return this.gameState.redCar;
               return this.gameState.vehicles.find(v => this.isPointInVehicle(v, x, y));
           }

           isPointInVehicle(vehicle, x, y) {
               for (let i = 0; i < vehicle.letters.length; i++) {
                   const vx = vehicle.horizontal ? vehicle.x + i : vehicle.x;
                   const vy = vehicle.horizontal ? vehicle.y : vehicle.y + i;
                   if (vx === x && vy === y) return true;
               }
               return false;
           }

           canMove(vehicle, dx, dy) {
               const newX = vehicle.x + dx;
               const newY = vehicle.y + dy;

               if (newX < 0 || newY < 0) return false;
               if (vehicle.horizontal && newX + vehicle.letters.length > this.gridSize.width) return false;
               if (!vehicle.horizontal && newY + vehicle.letters.length > this.gridSize.height) return false;

               for (let i = 0; i < vehicle.letters.length; i++) {
                   const x = vehicle.horizontal ? newX + i : newX;
                   const y = vehicle.horizontal ? newY : newY + i;
                   
                   if (this.gameState.redCar !== vehicle && 
                       this.isPointInVehicle(this.gameState.redCar, x, y)) return false;
                   
                   for (const other of this.gameState.vehicles) {
                       if (other !== vehicle && this.isPointInVehicle(other, x, y)) return false;
                   }
               }

               return true;
           }

           moveVehicle(vehicle, dx, dy) {
               const currentTrack = vehicle.horizontal ? vehicle.y : vehicle.x;
               
               if (this.selectedVehicle && (this.lastTrack === null || this.lastTrack !== currentTrack)) {
                   this.moveCount++;
                   this.container.querySelector('.moves').textContent = this.moveCount;
                   this.lastTrack = currentTrack;
               }
               
               vehicle.x += dx;
               vehicle.y += dy;
               this.createBoard();
           }

           checkWin() {
               if (this.gameState.redCar.x + this.gameState.redCar.letters.length === this.gridSize.width && 
                   this.gameState.redCar.y === this.gameState.redCar.y) {
                   alert(`Congratulations! You solved the puzzle in ${this.moveCount} moves!`);
               }
           }

           resetGame() {
               this.gameState = JSON.parse(JSON.stringify(this.initialState));
               this.selectedVehicle = null;
               this.moveCount = 0;
               this.lastTrack = null;
               this.preSelectionState = null;
               this.preSelectionMoveCount = 0;
               this.container.querySelector('.moves').textContent = this.moveCount;
               this.createBoard();
           }
       }

       async function loadBoards() {
           try {
               const initialStates = [

                    {
                       gridSize: {
                           width: 6,
                           height: 7
                       },
                       redCar: { 
                           x: 0, y: 4, horizontal: true, color: 'red',
                           letters: [' ']
                       },
                       vehicles: [
                           {x: 1, y: 1, horizontal: false, letters: ['A', 'C', 'R', 'E']},
                           {x: 2, y: 4, horizontal: false, letters: ['A']},
                           {x: 3, y: 4, horizontal: false, letters: ['S']},
                           {x: 4, y: 2, horizontal: false, letters: ['H', 'E', 'Y']},
                           {x: 2, y: 6, horizontal: true        , letters: ['M']},
                           {x: 2, y: 0, horizontal: true, letters: ['O', 'W', 'E']},
                       ]
                    },
                     {
                       gridSize: {
                           width: 5,
                           height: 5
                       },
                       redCar: { 
                           x: 1, y: 2, horizontal: true, color: 'red',
                           letters: [' ']
                       },
                       vehicles: [
                           {x: 0, y: 1, horizontal: true, letters: ['E']},
                           {x: 4, y: 1, horizontal: false, letters: ['L']},
                           { x: 1, y: 0, horizontal: false, letters: ['G']},
                           { x: 3, y: 2, horizontal: false, letters: ['F']},
                           { x: 2, y: 1, horizontal: true, letters: ['P']},
                           { x: 2, y: 2, horizontal: false, letters: ['I', 'N']},
                           { x: 1, y: 4, horizontal: true, letters: ['A', 'T']}
                       ]
                    },
                   {
                       gridSize: {
                           width: 5,
                           height: 4
                       },
                       redCar: { 
                           x: 0, y: 1, horizontal: true, color: 'red',
                           letters: [' ']
                       },
                       vehicles: [
                           { x: 0, y: 0, horizontal: true, letters: ['E', 'A', 'R']},
                           { x: 1, y: 1, horizontal: false, letters: ['T']},
                           { x: 1, y: 2, horizontal: true, letters: ['O', 'N']},
                           { x: 0, y: 3, horizontal: true, letters: ['U', 'P']},
                           { x: 3, y: 1, horizontal: false, letters: ['X']}
                       ]
                    },
                    {
                       gridSize: {
                           width: 6,
                           height: 5
                       },
                       redCar: { 
                           x: 3, y: 1, horizontal: true, color: 'red',
                           letters: [' ']
                       },
                       vehicles: [
                           { x: 0, y: 0, horizontal: true, letters: ['H', 'O', 'R', 'N']},
                           { x: 2, y: 1, horizontal: true, letters: ['A']},
                           { x: 4, y: 1, horizontal: false, letters: ['O', 'R']},
                           { x: 1, y: 2, horizontal: true, letters: ['T', 'I', 'E']},
                           { x: 0, y: 3, horizontal: false, letters: ['T']},
                           { x: 2, y: 3, horizontal: true, letters: ['N']},
                           { x: 2, y: 4, horizontal: true, letters: ['Y', 'E', 'A']}
                       ]
                   }
               ];

               initialStates.forEach((state, index) => {
                   createGameInstance(state, index + 1);
               });
           } catch (error) {
               console.error('Error loading boards:', error);
           }
       }

       function createGameInstance(initialState, index) {
           const container = document.createElement('div');
           container.id = `game-instance-${index}`;
           container.className = 'game-instance';
           
           const boardId = `game-board-${index}`;
           
           // Get optimal move count based on puzzle number
           let optimalMoves = 0;
           switch(index) {
               case 1:
                   optimalMoves = 11;
                   break;
               case 2:
                   optimalMoves = 6;
                   break;
               case 3:
                   optimalMoves = 9;
                   break;
               case 4:
                   optimalMoves = 8;
                   break;
               default:
                   optimalMoves = "?";
           }
           
           const gameHTML = `
               <h3>Puzzle ${index}</h3>
               <div class="game-board" id="${boardId}"></div>
               <div class="controls">
                   <button>Reset</button>
                   <br>
                   <p>Moves: <span class="moves">0</span></p>
                   <p>Optimal: ${optimalMoves} moves</p>
               </div>
           `;
           
           container.innerHTML = gameHTML;
           document.getElementById('all-games-container').appendChild(container);
           
           new GameInstance(container, initialState);
       }

       loadBoards();
   </script>
</body>
</html>