const cells = document.querySelectorAll(".cell")
const gameBoard = document.querySelector(".game-board")

const playerOne = "x"
const playerTwo = "o"

const isEven = x => (x%2 === 0)

let clicks = 0

function gameIsWon (player) {
    if (clicks < 5) {
        return;
    }
    // posible wins (0,1,2) (3,4,5) (6,7,8) (0,3,6) (1,4,7) (2,5,8) (0,4,8) (2,4,6)
    if (cells[0] === cells[1] === cells[2]) {}
}

function cellClicked (e) {
    console.log(e)
    if (e.target.textContent !== "") {
        return;
    }
    let cell = e.target
    // when cell is clicked
    isEven(clicks) ? cell.textContent = playerOne : cell.textContent = playerTwo
    // check if game is a win
    // check the number of empty cells left
    clicks+=1
}

cells.forEach(cell => cell.addEventListener("click", cellClicked))