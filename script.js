const cells = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const endMessage = document.getElementById("end-message");
const endBox = document.getElementById("end-div");
const restartButton = document.getElementById("restart-button");
let xTurn = true;
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


const startGame = () => {
  endBox.style.visibility = "hidden";
  board.classList.add("x");
  xTurn = true;
  
  cells.forEach((cell) => {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", clickHandler);
    cell.addEventListener("click", clickHandler, {once: true})
  });

}

const clickHandler = (event) =>{
  const cell = event.target 
  if(xTurn){
    cell.classList.add("x");
  } else{
    cell.classList.add("circle")
  }
  if(checkWin())  
    endGame(win=true);
  else if (checkDraw())
    endGame(win=false);
  else
    changeTurn();
  
}


const endGame = (win) => {
  endBox.style.visibility = "visible";
  let message;
  if (win){
    if(xTurn){
      message = "X WINS";
    } else{
      message = "O WINS";
    }
  } else{
    message = "DRAW"
  }
  endMessage.textContent = message;
};


const checkWin = () => {
  let currentClass;
  let isWin = false;
  if (xTurn) {
    currentClass = "x";
  } else {
    currentClass = "circle";
  }
  WINNING_COMBINATION.forEach((combination) => {
    if (
      combination.every((cell) =>
        board.children[cell].classList.contains(currentClass)
      )
    ) {
      console.log("win");
      isWin = true;
    }
  });
  return isWin;
};

const checkDraw = () => {
  let isDraw;
  if (
    [...cells].every(
      (cell) =>
        cell.classList.contains("x") || cell.classList.contains("circle")
    )
  )
    isDraw = true;
  
  return isDraw;
};

const changeTurn = () => {
    board.classList.remove("x");
    board.classList.remove("circle");
    if (xTurn) {
      board.classList.add("circle");
    } else {
      board.classList.add("x");
    }
    xTurn = !xTurn;
};

const restartGame = restartButton.addEventListener("click", startGame);

startGame();
