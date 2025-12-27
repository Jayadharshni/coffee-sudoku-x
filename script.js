const symbols = ["E","L","C","M","A","F","R","I","D"];

const puzzle = [
 ["E","","","M","","","R","",""],
 ["","M","","","A","","","F",""],
 ["","","A","","","","","I","D"],

 ["","L","","","","I","","",""],
 ["","","","A","","M","","",""],
 ["","","","I","","","", "L",""],

 ["R","I","","","","","A","",""],
 ["","F","","","L","","","M",""],
 ["","","D","","","R","","","C"]
];

const solution = [
 ["E","L","C","M","F","D","R","A","I"],
 ["D","M","I","R","A","C","L","F","E"],
 ["F","R","A","L","I","E","M","I","D"], // logical solution assumed
];

const grid = document.getElementById("grid");
let cells = [];
let time = 0;
let hintsLeft = 3;

/* TIMER */
setInterval(() => {
  time++;
  document.getElementById("timer").innerText = "Time: " + time + "s";
}, 1000);

/* GRID CREATION */
for (let r = 0; r < 9; r++) {
  for (let c = 0; c < 9; c++) {
    let cell = document.createElement("input");
    cell.maxLength = 1;

    if (puzzle[r][c] !== "") {
      cell.value = puzzle[r][c];
      cell.disabled = true;
    }

    grid.appendChild(cell);
    cells.push(cell);
  }
}

/* CHECK LOGIC */
function check() {
  let board = [];
  let k = 0;

  for (let r = 0; r < 9; r++) {
    board[r] = [];
    for (let c = 0; c < 9; c++) {
      let v = cells[k++].value.toUpperCase();
      if (!symbols.includes(v)) {
        show("❌ Invalid symbol detected");
        return;
      }
      board[r][c] = v;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (!unique(board[i]) || !unique(board.map(r => r[i]))) {
      show("❌ Row / Column violation");
      return;
    }
  }

  for (let r = 0; r < 9; r += 3)
    for (let c = 0; c < 9; c += 3) {
      let box = [];
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
          box.push(board[r+i][c+j]);
      if (!unique(box)) {
        show("❌ 3×3 block violation");
        return;
      }
    }

  let d1=[], d2=[];
  for (let i=0;i<9;i++){
    d1.push(board[i][i]);
    d2.push(board[i][8-i]);
  }
  if (!unique(d1) || !unique(d2)) {
    show("❌ Diagonal violation");
    return;
  }

  grade();
}

/* HINT SYSTEM */
function hint() {
  if (hintsLeft <= 0) return;
  hintsLeft--;
  time += 30;
  document.getElementById("hints").innerText =
    "Hints Left: " + hintsLeft;

  for (let cell of cells) {
    if (!cell.disabled && cell.value === "") {
      cell.value = symbols[Math.floor(Math.random()*9)];
      break;
    }
  }
}

/* UTILITIES */
function unique(arr) {
  return new Set(arr).size === 9;
}

function show(msg) {
  document.getElementById("result").innerText = msg;
}

/* PERFORMANCE GRADE */
function grade() {
  let level =
    time < 300 ? "EXCELLENT" :
    time < 600 ? "GOOD" : "NEEDS PRACTICE";

  show(
    "🏆 COFFEE SUDOKU ENGINEER 🏆\n\n" +
    "Time: " + time + "s\n" +
    "Grade: " + level + "\n" +
    "Logic: VERIFIED ☕🧠"
  );
}
