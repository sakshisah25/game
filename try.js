// Room state
let room = [
  ["Lamp", "", "Plant"],
  ["Heater", "Shelf", ""],
  ["", "Clock", ""]
];

// Object properties
let plantHeight = 0;
let shelfRotation = 0;
let lampBrightness = 0;

// Target state
const targetState = { plantHeight: 2, shelfRotation: 90, lampBrightness: 1 };

let selectedCell = null;

// Draw the room
function drawRoom() {
  const roomDiv = document.getElementById("room");
  roomDiv.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.textContent = room[i][j];
      if (selectedCell && selectedCell.row == i && selectedCell.col == j) {
        cell.classList.add("selected");
      }
      cell.addEventListener("click", () => selectCell(i, j));
      roomDiv.appendChild(cell);
    }
  }
}

// Handle selection and move
function selectCell(row, col) {
  if (!selectedCell && room[row][col] !== "") {
    selectedCell = { row, col };
  } else if (selectedCell) {
    if (room[row][col] === "") {
      room[row][col] = room[selectedCell.row][selectedCell.col];
      room[selectedCell.row][selectedCell.col] = "";
      selectedCell = null;
      drawRoom();
      checkRules();
      checkTarget();
    } else {
      selectedCell = null;
    }
  }
  drawRoom();
}

// Check rules
function checkRules() {
  plantHeight = 0;
  shelfRotation = 0;
  lampBrightness = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let obj = room[i][j];

      // Lamp next to Plant → Plant grows
      if (obj === "Lamp") {
        if (
          (i > 0 && room[i-1][j] === "Plant") ||
          (i < 2 && room[i+1][j] === "Plant") ||
          (j > 0 && room[i][j-1] === "Plant") ||
          (j < 2 && room[i][j+1] === "Plant")
        ) {
          plantHeight++;
          lampBrightness++;
        }
      }

      // Plant next to Heater → Plant shrinks
      if (obj === "Plant") {
        if (
          (i > 0 && room[i-1][j] === "Heater") ||
          (i < 2 && room[i+1][j] === "Heater") ||
          (j > 0 && room[i][j-1] === "Heater") ||
          (j < 2 && room[i][j+1] === "Heater")
        ) {
          plantHeight = Math.max(0, plantHeight - 1);
        }
      }

      // Clock above Shelf → Shelf rotates
      if (obj === "Clock") {
        if (i < 2 && room[i+1][j] === "Shelf") {
          shelfRotation += 90;
        }
      }
    }
  }

  document.getElementById("status").innerText =
    `Plant Height: ${plantHeight}, Shelf Rotation: ${shelfRotation}°, Lamp Brightness: ${lampBrightness}`;
}

// Check if target state reached
function checkTarget() {
  if (
    plantHeight >= targetState.plantHeight &&
    shelfRotation >= targetState.shelfRotation &&
    lampBrightness >= targetState.lampBrightness
  ) {
    document.getElementById("status").innerText += " ✅ Target Achieved!";
  }
}

// Initial draw
drawRoom();
checkRules();
