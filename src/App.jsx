import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import { useState } from "react"
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
};

const INITIAL_GAME_BOARD = [[null,null,null],[null,null,null],[null,null,null]];

function deriveActivePlayer(gameTurns){

  let currentPlayer = "X";

  if(gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;


}

function deriveWinner(gameBoard,players) {
  let winner = null;

  for(const comination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[comination[0].row][comination[0].column];
    const secondSquareSymbol = gameBoard[comination[1].row][comination[1].column];
    const thirdSquareSymbol = gameBoard[comination[2].row][comination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol===thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  //Initialize game board
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for( const turn of gameTurns){
      const {square,player} = turn;
      const {row,col} = square;

      gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {

  const[ gameTurns , setGameTurns] = useState([]);
  const [ players , setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard,players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex,colIndex) {
    setGameTurns( prevTurns => {
      
      const currentPlayer = deriveActivePlayer(prevTurns);
      
      const updateTurns = [{ square : {row : rowIndex , col : colIndex}, player : currentPlayer},...prevTurns];
      return updateTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName) {
    setPlayers( prevPlayer => {return { ...prevPlayer, [symbol]: newName };});
  }

  return (

    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={ activePlayer==="X" ? true : false } onChangeName={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={ activePlayer==="O" ? true : false} onChangeName={handlePlayerNameChange}/>
        </ol>
        { (winner || hasDraw) && <GameOver winner={winner} restartGame={handleRestart}></GameOver>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>

      <Log turns={gameTurns}/>
    </main>
  
    );

  }

export default App
