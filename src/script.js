const cells = document.querySelectorAll(".cell");
const gameBoard = document.querySelector(".game-board");
const scoreBoard = document.querySelector(".score-board");
const winnerDiv = document.querySelector(".winner");
const playerOneScore = document.querySelector("#player-one-score span");
const playerTwoScore = document.querySelector("#player-two-score span")
const resetButton = document.querySelector(".reset-button button");

let playerOne = "x";
let playerTwo = "o";

let playerToStart = playerOne;
let playerTurn;
let gameOver;
let clicks = 0;

function gameIsWon (player) {
    if (clicks < 4) {
        return;
    }
    // posible wins (0,1,2) (3,4,5) (6,7,8) (0,3,6) (1,4,7) (2,5,8) (0,4,8) (2,4,6)
    const horOne = [cells[0], cells[1], cells[2]]
    const horTwo = [cells[3], cells[4], cells[5]]
    const horThree = [cells[6], cells[7], cells[8]]

    const verOne = [cells[0], cells[3], cells[6]]
    const verTwo = [cells[1], cells[4], cells[7]]
    const verThree = [cells[2], cells[5], cells[8]]

    const diaOne = [cells[0], cells[4], cells[8]]
    const diaTwo = [cells[2], cells[4], cells[6]]

    if (horOne.every(x => x.textContent === player)) {
        horOne.forEach(x => x.style.backgroundColor = "green")
        return true;
    } else if (horTwo.every(x => x.textContent === player)) {
        horTwo.forEach(x => x.style.backgroundColor = "green")
        return true;
    } else if (horThree.every(x => x.textContent === player)) {
        horThree.forEach(x => x.style.backgroundColor = "green")
        return true;
    } else if (verOne.every(x => x.textContent === player)) {
        verOne.forEach(x => x.style.backgroundColor = "green")
        return true;
    } else if (verTwo.every(x => x.textContent === player)) {
        verTwo.forEach(x => x.style.backgroundColor = "green")
        return true;
    } else if (verThree.every(x => x.textContent === player)) {
        verThree.forEach(x => x.style.backgroundColor = "green")
        return true;
    } else if (diaOne.every(x => x.textContent === player)) {
        diaOne.forEach(x => x.style.backgroundColor = "green")
        return true;
    } else if (diaTwo.every(x => x.textContent === player)) {
        diaTwo.forEach(x => x.style.backgroundColor = "green")
        return true;
    }

    return false;
};

function handleWinEvent (player) {
    gameOver = true
    updateScoreBoard(player)
    cells.forEach(cell => cell.removeEventListener("click", updateGameBoard));
};

function resetGame () {
    cells.forEach(cell => {
        cell.textContent = ""
        cell.style.backgroundColor = "khaki"
        cell.addEventListener("click", updateGameBoard)
    });
    winnerDiv.textContent = ""
    clicks = 0
    gameOver = false
    setPlayerTurn(playerToStart)
}

const setPlayerTurn = player => {
    if (!gameOver) {
        player === "x" ? playerTurn = playerTwo : playerTurn = playerOne
    } else {
        playerToStart === "x" ? playerToStart = "o" : playerToStart = "x"
    }
}

function updateScoreBoard (player) {
    let winnerText;
    if (!player) {
        winnerText = "The game is a draw!!!"
    }
    if (player === 'x') {
        winnerText = 'Player One Wins!!!'
        playerOneScore.textContent = Number(playerOneScore.textContent)+1
    } else if (player === 'o') {
        winnerText = 'Player Two Wins!!!'
        playerTwoScore.textContent = Number(playerTwoScore.textContent)+1
    }
    winnerDiv.textContent = winnerText
}

function updateGameBoard (e) {
    // cells that are not empty don't need to be updated
    if (e.target.textContent !== "") {
        return;
    }
    
    let cell = e.target
    
    // if there are no clicks yet then the game has not started
    if (!clicks){
        cell.textContent = playerToStart
        setPlayerTurn(playerToStart)
    } else {
        cell.textContent = playerTurn
        gameIsWon(playerTurn) ? handleWinEvent(playerTurn) : gameOver = false
        setPlayerTurn(playerTurn)
    }
    
    clicks+=1
    if (clicks === 9 && !gameIsWon(cell.textContent)) {
        handleWinEvent(null)
        setPlayerTurn(playerTurn)
    }
}

resetButton.addEventListener('click', resetGame);
cells.forEach(cell => cell.addEventListener("click", updateGameBoard));