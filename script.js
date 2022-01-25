const cells = Array.from(document.querySelectorAll(".cell"));
const info = document.getElementById("text");
const restart = document.getElementById("btnRestart");
let turnOfX = true;
let gameFinished = false;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restart.addEventListener("click", handleRestartClick);

function handleCellClick(e) {
    const cell = e.target;
    if (!gameFinished) {
        placeMark(cell);
        checkWin();
        checkDraw();
    }
    handleFinish();
}

function handleRestartClick() {
    gameFinished = false;
    turnOfX = true;
    cells.forEach(cell => cell.innerHTML = "");
    info.innerHTML = "X's Turn";
    restart.setAttribute("hidden", null);
}

function placeMark(cell) {
    if (cell.innerHTML === "") {
        cell.innerHTML = turnOfX ? "X" : "O";
        turnOfX = !turnOfX;
        info.innerHTML = turnOfX ? "X's Turn" : "O's Turn";
    }
}

function checkWin() {
    let index;
    let countX;
    let countO;
    for (let i = 0; i < winningConditions.length; i++) {
        countX = 0;
        countO = 0;
        for (let j = 0; j < 3; j++) {
            index = winningConditions[i][j];
            if (cells[index].innerHTML === "X") {
                countX++;
            } else if (cells[index].innerHTML === "O") {
                countO++;
            }
        }
        if (countX === 3) {
            info.innerHTML = "X Wins!";
            gameFinished = true;
        } else if (countO === 3) {
            info.innerHTML = "O Wins!";
            gameFinished = true;
        }
    }
}

function checkDraw() {
    if (cells.every(cell => cell.innerHTML !== "") && !gameFinished) {
        info.innerHTML = "Draw!";
        gameFinished = true;
    }
}

function handleFinish() {
    if (gameFinished) restart.removeAttribute("hidden");
}