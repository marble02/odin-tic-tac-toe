

(function() {
    let turn = "X";

    let gameboard = {
        cacheDOM: function() {
            this.board = document.querySelector(".board");
        },
        init: function() {
            this.cacheDOM();
        },
        bindEvent: function(element) {
            element.addEventListener("click", this.handleClick);
        },
        render: function() {
            for (let i = 0; i < 9; i++ ) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                this.bindEvent(cell);
                this.board.appendChild(cell);
            }
        },
        handleClick: function() {
            if (!this.textContent) {
                this.textContent = turn;
                if (turn == "X") {
                    turn = "O";
                } else {
                    turn = "X";
                }
            }
        },
    }

    gameboard.init();
    gameboard.render();

})(); 