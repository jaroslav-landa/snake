import React, { Component } from "react";
import Snake from "./snake";
import Fruit from "./fruit";
import ScoreBoard from "./scoreboard";

const initialState = {
  fruit: getRandomCoordinates(),
  speed: 80,
  direciton: "RIGHT",
  snakeBlocks: [[0, 0],[2, 0]]
}

function getRandomCoordinates() {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
}

class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      default:
        return;
    }
  };

  moveSnake = () => {
    let blocks = [...this.state.snakeBlocks];
    let head = blocks[blocks.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      default:
        return;
    }
    blocks.push(head);
    blocks.shift();
    this.setState({
      snakeBlocks: blocks,
    });
  };

  checkIfOutOfBorders() {
    let head = this.state.snakeBlocks[this.state.snakeBlocks.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeBlocks];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((block) => {
      if (head[0] === block[0] && head[1] === block[1]) {
        this.onGameOver();
      }
    });
  }

  checkIfEat() {
    let head = this.state.snakeBlocks[this.state.snakeBlocks.length - 1];
    let fruit = this.state.fruit;
    if (head[0] === fruit[0] && head[1] === fruit[1]) {
      this.setState({
        fruit: getRandomCoordinates(),
      });
      this.enlargeSnake();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeBlocks];
    newSnake.unshift([]);
    this.setState({
      snakeBlocks: newSnake,
    });
  }

  onGameOver() {
    console.log("game over");
    this.setState(initialState);
  }

  render() {
    return (
      <div className="container">
        <div className="game-area">
          <Snake snakeBlocks={this.state.snakeBlocks} />
          <Fruit block={this.state.fruit} />
        </div>
        <ScoreBoard score={this.state.snakeBlocks.length} />
      </div>
    );
  }
}

export default App;
