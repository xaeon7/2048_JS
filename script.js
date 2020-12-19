// Global Variables
const cards = document.querySelectorAll("li");

const board = [ [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]]

const boardSize = 4;

let gameOver = false;


// Functions
const NewValue = () => {
  const value = Math.floor(Math.random() * 8 + 1) === 1? 4 : 2;
  return value;
}

const AddNewValue = () => {
  const row = Math.floor(Math.random() * boardSize);
  const col = Math.floor(Math.random() * boardSize);

  while(!(board[row][col] === 0)){
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);
  }
  board[row][col] = NewValue();
  UpdateBoard(board);
}

const InitBoard = () => {
  i = 2;
  while(i>0){
    AddNewValue();
    i--;
  }
}

const UpdateBoard = (board) =>{
  for(_ = 0; _< boardSize ; _++){
    board[_].map((number, index) => {
      cards[4 * _+ index].classList.add(`_${number}_`)
      if(number == 0){
        Reset(_, index);
        cards[4 * _+ index].innerText = "";
      }else{
        cards[4 * _+ index].innerText = number;
      }
         
    })
  }
}

const Reset = (i, j) => {
  cards[i * 4 + j].className = '';
}

const MergeLeft= (board) => {
  for(i = 0; i< boardSize ; i++){
    for(_ = 0; _< boardSize ; _++){
      for(j = boardSize - 1; j> 0 ; j--){
        if(board[i][j-1] == 0){
          board[i][j-1] = board[i][j];
          board[i][j] = 0;
        }
      }
    }
    
    for(j = boardSize - 1; j> 0 ; j--){
      if(board[i][j] == board[i][j-1]){
        board[i][j-1] *= 2;
        board[i][j] =0;
      }
    }

    for(j = boardSize - 1; j> 0 ; j--){
        if(board[i][j-1] == 0){
          board[i][j-1] = board[i][j];
          board[i][j] = 0;
        }
      }
    
  }
  return board;
}

const Reverse= (board) => {
  for(row = 0; row < boardSize; row++){
    board[row].reverse()
  }
}

const MergeRight = (board) => {
  Reverse(board);
  MergeLeft(board);
  Reverse(board);
  return board;
}

const Transpose = (board) => {
  for(i=0; i < boardSize; i++){
    for(j=i; j< boardSize; j++){
      const temp = board[i][j];
      board[i][j] = board[j][i];
      board[j][i] = temp;
    }
  }
}

const MergeUp = (board) => {
  Transpose(board);
  MergeLeft(board);
  Transpose(board);
  return board;
}

const MergeDown = (board) => {
  Transpose(board);
  MergeRight(board);
  Transpose(board);
  return board;
}

const GetMove = () => {
  this.addEventListener("keydown", (event) => {
    switch(event.which) {
      case 37:
        MergeLeft(board);
        UpdateBoard(board);
        break;
      case 38:
        MergeUp(board);
        UpdateBoard(board);
        break;
      case 39:
        MergeRight(board);
        UpdateBoard(board);
        break;
      case 40:
        MergeDown(board);
        UpdateBoard(board);
        break;
      default:
        break;    
    }
  });
}

const Won = () => {
  for(row=0; row< boardSize; row++){
    for(col=0; col< boardSize; col++){
      if(board[row][col] == 2048){
        return true;
      }
    }
  }
  return false;
}

const NoMoves = () => {
  const temp1 = JSON.parse(JSON.stringify(board));;
  MergeLeft(temp1);
  MergeRight(temp1);
  MergeUp(temp1);
  MergeDown(temp1);
  for(i=0; i<boardSize; i++){
    for(j=0; j<boardSize; j++){
      if(temp1[i][j] != board[i][j]){
        return false;
      }
    }
  }
  return true;
}

InitBoard();


// Still fixing looping issue


// while(!(NoMoves())){
//   UpdateBoard(board);
//   GetMove();
//   AddNewValue();
//   if(Won()){
//     console.log('You won!');
//     gameOver = true;
//   }
//   if(NoMoves()){
//     console.log('You lost!');
//     gameOver = true;
//   }
// }




  