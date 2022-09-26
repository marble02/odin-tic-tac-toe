(function() {
    let turn = "X";
    let xMoves = [];
    let oMoves = [];
    let turnText = document.querySelector(".turn-text");
    let winnerName = document.querySelector(".winner-name");

    turnText.textContent = turn;

    // make board state
    let b = []
    b.length = 9;
    b.fill("");

    const Player = (symbol) => {
        const name = `Player ${symbol}`;
        return {name, symbol}
    }

    const players = [Player("X"), Player("O")]

    function toggleTurn() {
        if (turn == "X") {
            turn = "O";
        } else {
            turn = "X";
        }
        turnText.textContent = turn;
    }

    function updateBoard() {
        const all_cells = document.querySelectorAll(".cell");
        all_cells.forEach((c, i) => {
                c.textContent = b[i];
            })
    }

    function updatePlays(playerTurn, cellnum) {
        if (playerTurn == "X") {
            xMoves.push(cellnum);
        } else if (playerTurn == "O") {
            oMoves.push(cellnum);
        }
    }

    function displayWinner(winner) {
        winnerName.textContent = `Winner is ${winner}`;
    }

    function checkWin() {
        const winStates = [
            [0, 1, 2],
            [3, 4, 5], 
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let w of winStates) {
            xcount = 0;
            ocount = 0;
            for (let i of w) {
                let string_i = String(i);
                if (xMoves.includes(string_i)) {
                    xcount += 1;
                }
                if (oMoves.includes(string_i)) {
                    ocount += 1;
                }
                if (xcount == 3) {
                    console.log("X wins");
                    displayWinner("X");
                    return "X"
                }
                if (ocount == 3) {
                    console.log("O wins");
                    displayWinner("O");
                    return "O"
                }
            }
        }
    }

    const gameboard = {
        cacheDOM: function() {
            this.board = document.querySelector(".board");
        },
        init: function() {
            this.cacheDOM();
            for (let i = 0; i < 9; i++ ) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.index = i;
                this.bindEvent(cell, this.b);
                this.board.appendChild(cell);
            }
        },
        bindEvent: function(element) {
            element.addEventListener("click", this.handleClick);
        },
        handleClick: function() {
            console.log(b[this.dataset.index], b[this.dataset.index] == null)
            if (b[this.dataset.index] == "") {
                b[this.dataset.index] = turn;
                updatePlays(turn, this.dataset.index);
                toggleTurn();
            }
            updateBoard();
            checkWin();
        },
    }

    gameboard.init();

})(); 