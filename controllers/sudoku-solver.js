class SudokuSolver {

  validate(puzzle) {
    if(!puzzle){
      return "Required field missing";
    }
    if(puzzle.length != 81){
      return "Expected puzzle to be 81 characters long";
    }
    if(/[^1-9.]/g.test(puzzle)){
      return "Invalid characters in puzzle";
    }
    return "Valid";
  }

  letterToNumber(row){
    switch(row.toUpperCase()){
      case "A":
        return 1;
      case "B":
        return 2;
      case "C":
        return 3;
      case "D":
        return 4;
      case "E":
        return 5;
      case "F":
        return 6;
      case "G":
        return 7;
      case "H":
        return 8;
      case "I":
        return 9;
      default:
        return "none";
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.stringToBoard(puzzleString);
    row = this.letterToNumber(row);
    /*
    if(grid[row - 1][column - 1] !== 0){
      return false;
    }
    */
    for(let i = 0; i < 9; i++){
      if(grid[row - 1][i] == value){
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let grid = this.stringToBoard(puzzleString);
    row = this.letterToNumber(row);
    /*
    if(grid[row - 1][column - 1] !== 0){
      return false;
    }
    */
    for(let i = 0; i < 9; i++){
      if(grid[i][column - 1] == value){
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, col, value) {
    let grid = this.stringToBoard(puzzleString);
    row = this.letterToNumber(row);
    /*
    if(grid[row - 1][col - 1] !== 0 ){
      return false;
    }
    */
    let startRow = row - (row % 3),
      startCol = col - (col % 3);
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(grid[i + startRow][j + startCol] == value){
          return false;
        }
      }
    }
    return true;
  }

  stringToBoard(sudokuString){
    const SIZE = 9;
    const board = [];

    for(let row = 0; row < SIZE; row++){
      const start = row * SIZE;
      const end = start + SIZE;
      board[row] = sudokuString.substring(start, end).split("");
    }

    return board;
  }

  solveSuduku(board) {
    const SIZE = 9;
    const BOX_SIZE = 3;
    const EMPTY = "."; //empty cells

    //A utility function to check if a number can be placed in a given position
    function canPlace(board, row, col, num){
      for(let x = 0; x < SIZE; x++){
        if(board[row][x] === num || board[x][col] === num)
        {
          return false;
        }
      }

      const startRow = row - (row % BOX_SIZE);
      const startCol = col - (col % BOX_SIZE);

      for(let i = 0; i < BOX_SIZE; i++){
        for(let j = 0; j < BOX_SIZE; j++){
          if(board[i + startRow][j + startCol] === num)
          {
            return false;
          }
        }
      }

      return true;
    }

    //The main solver function using backtracking
    function solve(){
      for(let row = 0; row < SIZE; row++){
        for(let col = 0; col < SIZE; col++){
          if(board[row][col] === EMPTY){
            for(let num = 1; num <= SIZE; num++){
              if(canPlace(board, row, col, num.toString())){
                board[row][col] = num.toString();
                if(solve()){
                  return true;
                }
                board[row][col] = EMPTY;
              }
            }
            return false;
          }
        }
      }
      return true;
    }

    //if the solve function returns true, the board is solved
    //if the solve function returns false, the puzzle is unsolvable
    return solve() ? board : false;
  }

  completeSudoku(puzzleString){
    ///*
    if (this.validate(puzzleString) !== "Valid") {
      return false;
    }
    //*/
    const board = this.stringToBoard(puzzleString);
    const solvedBoard = this.solveSuduku(board);
    if(!solvedBoard) return false;
    return solvedBoard.flat().join("");
  }
}

module.exports = SudokuSolver;

