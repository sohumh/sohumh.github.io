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

Instructions:
- Click a vehicle to select it
- Use arrow keys to move selected vehicle
- Get the red car to the yellow exit
- Moves count once per track selection

<html>
<head>
   <title>Word Rush Hour</title>
<style>
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

   /* Add right border to last column except for exit row */
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

   /* Add bottom border to last row */
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

   #controls {
       margin-top: 20px;
   }
</style>
</head>
<body>
   <div id="game-container">
       <div class="game-board" id="board"></div>
       <div id="controls">
           <button onclick="resetGame()">Reset Game</button>
           <p>Moves: <span id="moves">0</span></p>
       </div>
   </div>

   <script>
       const BOARD_SIZE = 6;
       let selectedVehicle = null;
       let moveCount = 0;
       let lastTrack = null;
       let moveCountedForTrack = false;

       const initialState = {
           redCar: { 
               x: 1, 
               y: 2, 
               length: 2, 
               horizontal: true, 
               color: 'red',
               letters: ['R', 'R']
           },
           vehicles: [
               { 
                   x: 0, 
                   y: 0, 
                   length: 2, 
                   horizontal: true,
                   letters: ['A', 'A']
               },
               { 
                   x: 3, 
                   y: 0, 
                   length: 3, 
                   horizontal: false,
                   letters: ['B', 'B', 'B']
               },
               { 
                   x: 4, 
                   y: 1, 
                   length: 2, 
                   horizontal: true,
                   letters: ['C', 'C']
               },
               { 
                   x: 5, 
                   y: 3, 
                   length: 3, 
                   horizontal: false,
                   letters: ['D', 'D', 'D']
               }
           ]
       };

       let gameState = JSON.parse(JSON.stringify(initialState));

       function createBoard() {
           const board = document.getElementById('board');
           board.innerHTML = '';

           for (let y = 0; y < BOARD_SIZE; y++) {
               for (let x = 0; x < BOARD_SIZE; x++) {
                   const cell = document.createElement('div');
                   cell.className = 'cell';
                   cell.dataset.x = x;
                   cell.dataset.y = y;
                   cell.addEventListener('click', handleCellClick);
                   board.appendChild(cell);
               }
           }

           board.children[2 * BOARD_SIZE + 5].classList.add('exit');
           placeVehicles();
       }

       function placeVehicles() {
           document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));

           placeVehicle(gameState.redCar);
           gameState.vehicles.forEach(vehicle => placeVehicle(vehicle));

           if (selectedVehicle) {
               highlightVehicle(selectedVehicle);
           }
       }

       function placeVehicle(vehicle) {
           for (let i = 0; i < vehicle.length; i++) {
               const x = vehicle.horizontal ? vehicle.x + i : vehicle.x;
               const y = vehicle.horizontal ? vehicle.y : vehicle.y + i;
               const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
               cell.classList.add(vehicle.length === 3 ? 'truck' : 'car');
               if (vehicle.color === 'red') cell.classList.add('red');
               cell.textContent = vehicle.letters[i];
           }
       }

       function highlightVehicle(vehicle) {
           for (let i = 0; i < vehicle.length; i++) {
               const x = vehicle.horizontal ? vehicle.x + i : vehicle.x;
               const y = vehicle.horizontal ? vehicle.y : vehicle.y + i;
               const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
               cell.classList.add('selected');
           }
       }

        function handleCellClick(event) {
            const cell = event.target;
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);

            if (cell.classList.contains('car') || cell.classList.contains('truck')) {
                const vehicle = findVehicle(x, y);
                if (selectedVehicle === vehicle) {
                    selectedVehicle = null;
                    lastTrack = null;  // Reset lastTrack when deselecting
                } else {
                    selectedVehicle = vehicle;
                    lastTrack = null;  // Reset lastTrack for new selection
                }
                placeVehicles();
            }
        }

       document.addEventListener('keydown', (event) => {
           if (!selectedVehicle) return;

           let dx = 0;
           let dy = 0;

           if (selectedVehicle.horizontal) {
               // check if we are the red car and if we are at the end
               if (selectedVehicle === gameState.redCar && selectedVehicle.x + selectedVehicle.length === BOARD_SIZE && event.key === 'ArrowRight') {
                   alert(`Congratulations! You solved the puzzle in ${moveCount} moves!`);
               }
               if (event.key === 'ArrowLeft') dx = -1;
               if (event.key === 'ArrowRight') dx = 1;
           } else {
               if (event.key === 'ArrowUp') dy = -1;
               if (event.key === 'ArrowDown') dy = 1;
           }

           if (dx !== 0 || dy !== 0) {
               if (canMove(selectedVehicle, dx, dy)) {
                   moveVehicle(selectedVehicle, dx, dy);
               }
           }
       });

       function findVehicle(x, y) {
           if (isPointInVehicle(gameState.redCar, x, y)) return gameState.redCar;
           return gameState.vehicles.find(v => isPointInVehicle(v, x, y));
       }

       function isPointInVehicle(vehicle, x, y) {
           for (let i = 0; i < vehicle.length; i++) {
               const vx = vehicle.horizontal ? vehicle.x + i : vehicle.x;
               const vy = vehicle.horizontal ? vehicle.y : vehicle.y + i;
               if (vx === x && vy === y) return true;
           }
           return false;
       }

       function canMove(vehicle, dx, dy) {
           const newX = vehicle.x + dx;
           const newY = vehicle.y + dy;

           if (newX < 0 || newY < 0) return false;
           if (vehicle.horizontal && newX + vehicle.length > BOARD_SIZE) return false;
           if (!vehicle.horizontal && newY + vehicle.length > BOARD_SIZE) return false;

           for (let i = 0; i < vehicle.length; i++) {
               const x = vehicle.horizontal ? newX + i : newX;
               const y = vehicle.horizontal ? newY : newY + i;
               
               if (gameState.redCar !== vehicle && 
                   isPointInVehicle(gameState.redCar, x, y)) return false;
               
               for (const other of gameState.vehicles) {
                   if (other !== vehicle && isPointInVehicle(other, x, y)) return false;
               }
           }

           return true;
        }

        function moveVehicle(vehicle, dx, dy) {
            const currentTrack = vehicle.horizontal ? vehicle.y : vehicle.x;
            
            // Only increment if this is a new vehicle/track selection
            if (selectedVehicle && (lastTrack === null || lastTrack !== currentTrack)) {
                moveCount++;
                document.getElementById('moves').textContent = moveCount;
                lastTrack = currentTrack;
            }
            
            vehicle.x += dx;
            vehicle.y += dy;
            createBoard();
        }

        function checkWin() {
            if (gameState.redCar.x + gameState.redCar.length === BOARD_SIZE) {
                alert(`Congratulations! You solved the puzzle in ${moveCount} moves!`);
            }
        }

       function resetGame() {
           gameState = JSON.parse(JSON.stringify(initialState));
           selectedVehicle = null;
           moveCount = 0;
           moveCountedForTrack = false;
           lastTrack = null;
           document.getElementById('moves').textContent = moveCount;
           createBoard();
       }

       createBoard();
   </script>
</body>
</html>