// Global Variables
const cards = document.querySelectorAll("li");
const score = document.querySelector("#score");
let board = [ [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
const boardSize = 4;
score_num = 0;
// Functions
const NewValue = () => {
  const value = Math.floor(Math.random() * 8 + 1) === 1? 4 : 2;
  return value;
}

const IsEmpty = () => {
  for(let i=0; i < boardSize; i++){
    for(let j=i; j< boardSize; j++){
      if(board[i][j] === 0){
        return true;
      }
    }
  }
  return false;
}

const AddNewValue = () => {
  if(IsEmpty()){
    let row = Math.floor(Math.random() * boardSize);
    let col = Math.floor(Math.random() * boardSize);

    while(!(board[row][col] === 0)){
      row = Math.floor(Math.random() * boardSize);
      col = Math.floor(Math.random() * boardSize);
    }
    board[row][col] = NewValue();
}
}

const InitBoard = () => {
  AddNewValue();
  AddNewValue();
  UpdateBoard(board);
}

const UpdateBoard = (board) =>{
  score.innerHTML = score_num;
  for(let _ = 0; _< boardSize ; _++){
    board[_].map((number, index) => {
      Reset(_, index);

    })
  }

  for(let _ = 0; _< boardSize ; _++){
    board[_].map((number, index) => {
      cards[4 * _+ index].classList.add(`_${number}_`)
      if(number === 0){
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
  for(let i = 0; i< boardSize ; i++){
    for(let _ = 0; _< boardSize ; _++){
      for(let j = boardSize - 1; j> 0 ; j--){
        if(board[i][j-1] === 0){
          board[i][j-1] = board[i][j];
          board[i][j] = 0;
        }
      }}
    
    for(let j = 0; j< boardSize -1 ; j++){
      if(board[i][j] === board[i][j+1]){
        board[i][j] *= 2;
        score_num += board[i][j] + (board[i][j] % 9);
        board[i][j+1] =0;
      }
    }

    for(let j = boardSize - 1; j> 0 ; j--){
        if(board[i][j-1] === 0){
          board[i][j-1] = board[i][j];
          board[i][j] = 0;
        }
      }
    
  }
  return board;
}

const Reverse= (board) => {
  for(let row = 0; row < boardSize; row++){
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
  for(let i=0; i < boardSize; i++){
    for(let j=i; j< boardSize; j++){
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

const HandleGesture = () => {
    if (touchendX < touchstartX) {
        return 'left';
    }
    
    if (touchendX > touchstartX) {
        return 'right';
    }
    
    if (touchendY < touchstartY) {
        return 'up';
    }
    
    if (touchendY > touchstartY) {
        return 'down';
    }
}

const GetMove = () => {
  // for mobile devices
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;
  this.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  }, false);

  this.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    switch(HandleGesture()) {
      case 'left':
        const temp1 = JSON.parse(JSON.stringify(board));
        IsOver();
        MergeLeft(board);
        if(UselessMove(temp1, board)){
          break;
        } else {
          AddNewValue();
          UpdateBoard(board);
          return board;
        }
      case 'up':
        const temp2 = JSON.parse(JSON.stringify(board));
        IsOver();
        MergeUp(board);
        if(UselessMove(temp2, board)){
          break;
        } else {
          AddNewValue();
          UpdateBoard(board);
          return board;
        }
      case 'right':
        const temp3 = JSON.parse(JSON.stringify(board));
        IsOver();
        MergeRight(board);
        if(UselessMove(temp3, board)){
          break;
        } else {
          AddNewValue();
          UpdateBoard(board);
          return board;
        }
      case 'down':
        const temp4 = JSON.parse(JSON.stringify(board));
        IsOver();
        MergeDown(board);
        if(UselessMove(temp4, board)){
          break;
        } else {
          AddNewValue();
          UpdateBoard(board);
          return board;
        }
      default:
        break;  
    }
  }, false); 

  // for computers
  this.addEventListener("keydown", (event) => {
    switch(event.which) {
      case 37:
        const temp1 = JSON.parse(JSON.stringify(board));
        IsOver();
        MergeLeft(board);
        if(UselessMove(temp1, board)){
          break;
        } else {
          AddNewValue();
          UpdateBoard(board);
          return board;
        }
      case 38:
        const temp2 = JSON.parse(JSON.stringify(board));
        IsOver();
        MergeUp(board);
        if(UselessMove(temp2, board)){
          break;
        } else {
          AddNewValue();
          UpdateBoard(board);
          return board;
        }
      case 39:
        const temp3 = JSON.parse(JSON.stringify(board));
        IsOver();
        MergeRight(board);
        if(UselessMove(temp3, board)){
          break;
        } else {
          AddNewValue();
          UpdateBoard(board);
          return board;
        }
      case 40:
        const temp4 = JSON.parse(JSON.stringify(board));
        IsOver();
        MergeDown(board);
        if(UselessMove(temp4, board)){
          break;
        } else {
          AddNewValue();
          UpdateBoard(board);
          return board;
        }
      default:
        break;  
    }
  });
}

const UselessMove = (temp, board) =>{
  for(let i=0; i<boardSize; i++){
    for(let j=0; j<boardSize; j++){
      if(temp[i][j] != board[i][j]){
        return false;
      }
    }
  }
  return true;
}

const Won = () => {
  for(let row=0; row< boardSize; row++){
    for(let col=0; col< boardSize; col++){
      if(board[row][col] === 2048){
        console.log('You won!');
        return true;
      }
    }
  }
  return false;
}

const NoMoves = () => {
  if(!(IsEmpty())){
    const temp = JSON.parse(JSON.stringify(board));
    MergeLeft(temp);
    MergeRight(temp);
    MergeUp(temp);
    MergeDown(temp);
    for(let i=0; i<boardSize; i++){
      for(let j=0; j<boardSize; j++){
        if(temp[i][j] != board[i][j]){
          return false;
        }
      }
    }
    console.log('You lost!');
    return true;
  } 
  return false;
}

const IsOver = () =>{
  Won();
  NoMoves();
}

const Restart = () => {
  board = [ [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
  InitBoard();
  UpdateBoard(board);
}

const PlayGame = () => {
  InitBoard();
  UpdateBoard(board);
  GetMove();
}

  
PlayGame();

