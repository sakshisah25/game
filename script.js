const objects = ["Lamp", "Plant", "Heater"];
let room = [
  ["Lamp", "", "Plant"],
  ["Heater", "", ""],
  ["", "", ""]
];

function drawRoom() {
  const roomDiv = document.getElementById("room");
  roomDiv.innerHTML = ""; // clear previous cells

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.textContent = room[i][j];
      cell.addEventListener("click", () => selectCell(i, j));
      roomDiv.appendChild(cell);
    }
  }
}

let selectedCell = null;

function selectCell(row, col) {
  if (!selectedCell && room[row][col] !== "") {
    selectedCell = { row, col };
    console.log(`Selected ${room[row][col]} at (${row},${col})`);
  } else if (selectedCell) {
    // Move object to new cell
    if (room[row][col] === "") {
      room[row][col] = room[selectedCell.row][selectedCell.col];
      room[selectedCell.row][selectedCell.col] = "";
      selectedCell = null;
      drawRoom();
      checkRules();
    }
  }
}

function checkRules() {
  // Example rule: Lamp next to Plant → Plant grows
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (room[i][j] === "Lamp") {
        if (i > 0 && room[i-1][j] === "Plant") console.log("Plant grows!");
        if (i < 2 && room[i+1][j] === "Plant") console.log("Plant grows!");
        if (j > 0 && room[i][j-1] === "Plant") console.log("Plant grows!");
        if (j < 2 && room[i][j+1] === "Plant") console.log("Plant grows!");
      }
    }
  }
}

// Draw initial room
drawRoom();
