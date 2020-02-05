// game constants
const PLAYER_1 = -1;
const PLAYER_2 = 1;

const USED_SPACE = -1;
const FULL = 9;

const FIRST_WIN_CONDITION = 0;
const SECOND_WIN_CONDITION = 1;
const THIRD_WIN_CONDITION = 2;
const FOURTH_WIN_CONDITION = 3;
const FIFTH_WIN_CONDITION = 4;
const SIXTH_WIN_CONDITION = 5;
const SEVENTH_WIN_CONDITION = 6;
const EIGTH_WIN_CONDITION = 7;

// state variables 

let playerId;
let gameOver;

let BOARD = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

let FULL_BOARD = [];

// DOM handles 

let cells = []; 
let currentPlayer;
let outputWinner;
let resetButton;
let button;
let headLine;

// Game Logic

function init() {

    cells = document.getElementsByTagName("div");
    currentPlayer = document.getElementById("playNum");
    outputWinner = document.getElementById("output");
    playerId = -1;
    currentPlayer.textContent = 1;
    gameOver = false;

    for(let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', markCell);
    }

}

function markCell(event) {
    
    if(event.target.textContent !== 'X' && event.target.textContent !== 'O'
        && !gameOver) {

        if(playerId === PLAYER_1) {
            event.target.textContent = 'X';
            event.target.style.color = "green"
            playerId = PLAYER_2;
            currentPlayer.textContent = 2;
            FULL_BOARD.push(USED_SPACE);
            checkWin(event.target, PLAYER_1);
        }
        else {
            event.target.textContent = 'O';
            event.target.style.color = "red";
            playerId = PLAYER_1;
            currentPlayer.textContent = 1;
            FULL_BOARD.push(USED_SPACE);
            checkWin(event.target, PLAYER_2);
        }
    }

}

function checkWin(cell, player) {

    switch(cell.getAttribute("data-id"))
    {
        case '1':
            BOARD[FIRST_WIN_CONDITION].push(player);
            checkForThree(BOARD[FIRST_WIN_CONDITION]);
            BOARD[FOURTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[FOURTH_WIN_CONDITION]);
            BOARD[SEVENTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[SEVENTH_WIN_CONDITION]);
            break;
        case '2':
            BOARD[FIRST_WIN_CONDITION].push(player);
            checkForThree(BOARD[FIRST_WIN_CONDITION]);
            BOARD[FIFTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[FIFTH_WIN_CONDITION]);
            break;
        case '3':
            BOARD[FIRST_WIN_CONDITION].push(player);
            checkForThree(BOARD[FIRST_WIN_CONDITION]);
            BOARD[SIXTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[SIXTH_WIN_CONDITION]);
            BOARD[EIGTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[EIGTH_WIN_CONDITION]);
            break;
        case '4':
            BOARD[SECOND_WIN_CONDITION].push(player);
            checkForThree(BOARD[SECOND_WIN_CONDITION]);
            BOARD[FOURTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[FOURTH_WIN_CONDITION]);
            break;
        case '5':
            BOARD[SECOND_WIN_CONDITION].push(player);
            checkForThree(BOARD[SECOND_WIN_CONDITION]);
            BOARD[FIFTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[FIFTH_WIN_CONDITION]);
            BOARD[SEVENTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[SEVENTH_WIN_CONDITION]);
            BOARD[EIGTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[EIGTH_WIN_CONDITION]);
            break;
        case '6':
            BOARD[SECOND_WIN_CONDITION].push(player);
            checkForThree(BOARD[SECOND_WIN_CONDITION]);
            BOARD[SIXTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[SIXTH_WIN_CONDITION]);
            break;
        case '7':
            BOARD[THIRD_WIN_CONDITION].push(player);
            checkForThree(BOARD[THIRD_WIN_CONDITION]);
            BOARD[FOURTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[FOURTH_WIN_CONDITION]);
            BOARD[EIGTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[EIGTH_WIN_CONDITION]);
            break;
        case '8':
            BOARD[THIRD_WIN_CONDITION].push(player);
            checkForThree(BOARD[THIRD_WIN_CONDITION]);
            BOARD[FIFTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[FIFTH_WIN_CONDITION]);
            break;
        case '9':
            BOARD[THIRD_WIN_CONDITION].push(player);
            checkForThree(BOARD[THIRD_WIN_CONDITION]);
            BOARD[SIXTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[SIXTH_WIN_CONDITION]);
            BOARD[SEVENTH_WIN_CONDITION].push(player);
            checkForThree(BOARD[SEVENTH_WIN_CONDITION]);
    }

}

function checkForThree(boardRow) {

    if(boardRow.length === 3) {

        let total = 0;

        boardRow.forEach( cell => total += cell );

        if(total === -3) {
            outputWinner.textContent = "PLAYER 1 WINS!"
            gameOver = true;
            reset(true);
        }
        else if(total === 3) {
            outputWinner.textContent = "PLAYER 2 WINS!"
            gameOver = true;
            reset(true);
        }else if(FULL_BOARD.length === FULL) {
            outputWinner.textContent = "DRAW...";
            gameOver = true;
            reset(true);
        }


    }

}

function reset() {

    console.log("reset called!")

    button = document.createElement("button");
    headLine = document.getElementById("gameStateBanner");

    button.classList.add('resetButton')
    button.textContent = "RESET"
    button.addEventListener('click', clearBoard);
    headLine.appendChild(button);

}

function clearBoard() {

    for(let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = " ";
    }

    button.remove();

    outputWinner.textContent = "";

    BOARD = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];

    FULL_BOARD = [];

    init();
    
}

init();