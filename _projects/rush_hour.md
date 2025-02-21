---
layout: page
title: Word Rush Hour
description: Rush hour where the cars are words.
importance: 6
img: assets/img/together.png
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
    /* Remove max-width and margin: 0 auto */
}

.game-instance {
    margin-left: 20px;
    border: none;  /* Remove any border */
    padding: 20px;
    border-radius: 8px;
    background-color: #f8f8f8;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    outline: none;  /* Add this to remove the focus outline */
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
   grid-template-columns: repeat(6, 50px);
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

.cell[data-x="5"] {
   border-right: 2px solid #333;
}

.cell[data-x="5"][data-y="2"] {
   border-right: none;
}

.cell[data-x="5"][data-y="2"]::after {
   content: "→";
   position: absolute;
   right: -15px;
   font-size: 24px;
   color: #333;
}

.cell[data-y="5"] {
   border-bottom: 2px solid #333;
}

.car {
   background-color: #4CAF50;
}

.car.red {
   background-color: #f44336;
}

.truck {
   background-color: #2196F3;
}

.selected {
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
    margin: 20px 20px;  /* Change from margin: 20px auto */
    padding: 15px;
    background-color: #f0f0f0;
    border-radius: 5px;
    /* Remove max-width */
}

.instructions ul {
   margin: 10px 0;
   padding-left: 20px;
}

.instructions li {
   margin: 5px 0;
}
   </style>
</head>
<body>
   <div class="instructions">
       <p>Instructions:</p>
       <ul>
           <li>Click a vehicle to select it</li>
           <li>Use arrow keys to move selected vehicle</li>
           <li>Get the red car to the exit arrow</li>
           <li>Moves count once per track selection</li>
       </ul>
   </div>

   <div id="all-games-container">
       <!-- Games will be dynamically added here -->
   </div>

   <script>
       const BOARD_SIZE = 6;

       class GameInstance {
           constructor(container, initialState) {
               this.container = container;
               this.initialState = JSON.parse(JSON.stringify(initialState));
               this.gameState = JSON.parse(JSON.stringify(initialState));
               this.selectedVehicle = null;
               this.moveCount = 0;
               this.lastTrack = null;
               
               this.createBoard();
               this.setupEventListeners();
           }

           createBoard() {
               const board = this.container.querySelector('.game-board');
               board.innerHTML = '';

               for (let y = 0; y < BOARD_SIZE; y++) {
                   for (let x = 0; x < BOARD_SIZE; x++) {
                       const cell = document.createElement('div');
                       cell.className = 'cell';
                       cell.dataset.x = x;
                       cell.dataset.y = y;
                       board.appendChild(cell);
                   }
               }

               this.placeVehicles();
           }

           placeVehicles() {
               this.container.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
               this.placeVehicle(this.gameState.redCar);
               this.gameState.vehicles.forEach(vehicle => this.placeVehicle(vehicle));
               
               if (this.selectedVehicle) {
                   this.highlightVehicle(this.selectedVehicle);
               }
           }

           placeVehicle(vehicle) {
               for (let i = 0; i < vehicle.length; i++) {
                   const x = vehicle.horizontal ? vehicle.x + i : vehicle.x;
                   const y = vehicle.horizontal ? vehicle.y : vehicle.y + i;
                   const cell = this.container.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                   cell.classList.add(vehicle.length === 3 ? 'truck' : 'car');
                   if (vehicle.color === 'red') cell.classList.add('red');
                   cell.textContent = vehicle.letters[i];
               }
           }

           highlightVehicle(vehicle) {
               for (let i = 0; i < vehicle.length; i++) {
                   const x = vehicle.horizontal ? vehicle.x + i : vehicle.x;
                   const y = vehicle.horizontal ? vehicle.y : vehicle.y + i;
                   const cell = this.container.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                   cell.classList.add('selected');
               }
           }

           setupEventListeners() {
                // Add cell click listeners
                this.container.querySelectorAll('.cell').forEach(cell => {
                    cell.addEventListener('click', (e) => this.handleCellClick(e));
                });

                // Add keyboard listener to the game container instead of document
                this.container.addEventListener('keydown', (e) => {
                    if (this.selectedVehicle) {
                        this.handleKeyPress(e);
                    }
                });

                // Add reset button listener
                this.container.querySelector('button').addEventListener('click', () => this.resetGame());
                
                // Make container focusable
                this.container.tabIndex = 0;
            }

            handleCellClick(event) {
                const cell = event.target;
                const x = parseInt(cell.dataset.x);
                const y = parseInt(cell.dataset.y);
                console.log('Clicked on x', x, 'and y', y);

                if (cell.classList.contains('car') || cell.classList.contains('truck')) {
                    const vehicle = this.findVehicle(x, y);
                    // Always select the clicked vehicle, replacing any previous selection
                    this.selectedVehicle = vehicle;
                    this.lastTrack = null;
                    this.placeVehicles();
                }
            }

            handleKeyPress(event) {
                if (!this.selectedVehicle) return;

                // Prevent page scrolling
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
               for (let i = 0; i < vehicle.length; i++) {
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
               if (vehicle.horizontal && newX + vehicle.length > BOARD_SIZE) return false;
               if (!vehicle.horizontal && newY + vehicle.length > BOARD_SIZE) return false;

               for (let i = 0; i < vehicle.length; i++) {
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

                // Reattach event listeners after recreating the board
                this.container.querySelectorAll('.cell').forEach(cell => {
                    cell.addEventListener('click', (e) => this.handleCellClick(e));
                });
           }

           checkWin() {
               if (this.gameState.redCar.x + this.gameState.redCar.length === BOARD_SIZE && 
                   this.gameState.redCar.y === 2) {
                   alert(`Congratulations! You solved the puzzle in ${this.moveCount} moves!`);
               }
           }

           resetGame() {
               this.gameState = JSON.parse(JSON.stringify(this.initialState));
               this.selectedVehicle = null;
               this.moveCount = 0;
               this.lastTrack = null;
               this.container.querySelector('.moves').textContent = this.moveCount;
               this.createBoard();
           }
       }

       async function loadBoards() {
           try {
               const boardStates = [
                   {
                       redCar: { 
                           x: 1, y: 2, length: 1, horizontal: true, color: 'red',
                           letters: ['R', 'R']
                       },
                       vehicles: [
                           { x: 0, y: 0, length: 2, horizontal: true, letters: ['A', 'A']},
                           { x: 3, y: 0, length: 3, horizontal: false, letters: ['B', 'B', 'B']},
                           { x: 4, y: 1, length: 2, horizontal: true, letters: ['C', 'C']},
                           { x: 5, y: 3, length: 3, horizontal: false, letters: ['D', 'D', 'D']}
                       ]
                   },
                   {
                       redCar: { 
                           x: 1, y: 2, length: 2, horizontal: true, color: 'red',
                           letters: ['R', 'R']
                       },
                       vehicles: [
                           { x: 0, y: 0, length: 2, horizontal: true, letters: ['A', 'A']},
                           { x: 3, y: 0, length: 3, horizontal: false, letters: ['B', 'B', 'B']},
                           { x: 4, y: 1, length: 2, horizontal: true, letters: ['C', 'C']},
                           { x: 5, y: 3, length: 3, horizontal: false, letters: ['D', 'D', 'D']}
                       ]
                   },
                   // Add more board states here
               ];

               boardStates.forEach((state, index) => {
                   createGameInstance(state, index + 1);
               });
           } catch (error) {
               console.error('Error loading boards:', error);
           }
       }

       function createGameInstance(initialState, index) {
           const container = document.createElement('div');
           container.className = 'game-instance';
           
           const gameHTML = `
               <h3>Puzzle ${index}</h3>
               <div class="game-board"></div>
               <div class="controls">
                   <button>Reset</button>
                   <p>Moves: <span class="moves">0</span></p>
               </div>
           `;
           
           container.innerHTML = gameHTML;
           document.getElementById('all-games-container').appendChild(container);
           
           new GameInstance(container, initialState);
       }

       // Load all boards when the page loads
       loadBoards();
   </script>
</body>
</html>