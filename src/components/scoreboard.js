import React from "react";

function ScoreBoard(props) {
  return (
    <div className="score-area">
      <h1>Score: {props.score}</h1>
      <p>
        Use arrow keys to move your snake!
      </p>
      <p>
        Navigate the snake to eat fruit and gain length. Don't crash into the wall or your tail.
      </p>
    </div>
  );
}

export default ScoreBoard;
