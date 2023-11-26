
export default function GameOver({winner,restartGame}) {

    let label = winner !== null ? <p>{winner} won!</p> : <p>It's a draw</p>;
   
    return(
        <div id="game-over">
           <h2>Game Over!</h2>
           {label}
           <p><button onClick={restartGame}>Rematch!</button></p>
        </div>
    );
}