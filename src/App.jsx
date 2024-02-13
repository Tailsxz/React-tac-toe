import { useState } from 'react';

//Defining the individual squares as a component that takes in a prop and uses embeds that prop using the curly brace syntax.
//we are essentially destructuring the object passed into this component as an argument to only accept its value property.
function Square({ value, onSquareClick }) {
  //Since we are now bringing in the useState Hook, we can remove the parameter accepting value as a prop as well as the props we initially passed to the Squares.

  //Setting up a state variable to keep track of the current state of our value. Initializing all squares with a value of null.
  // const [value, setValue] = useState(null);

  // function handleClick() {
  //   //Rather than console logging on click, now we use the setValue() function to set the current value to 'X' when a square is clicked. By calling this set function from an onClick handler, we are telling react to re-render that Square whenever its button is clicked! Not only this but the React Docs state "When you call a set function in a component, React automatically updates the child components inside too." This means that when we call the setter function of useState, not only will the component calling the setter re-render, but all of its children will as well! This ensures the updated state is reflected in the component as well as its child components.
  //   setValue('X');
  // }

  //Since we are declaring a state directly in the Square component, this means each square will have its own state independent from one another!
  
  //Here we embed it into our actual markup.
  return <button className="square" onClick={onSquareClick}>
              {value}
         </button>;
}

// export default identifies this function as the main component we are exporting from this module.

                      //A component is identified by having the first character of its identifier capitalized.
function Board({ xIsNext, squares, onPlay}) {

  const winner = calcWinner(squares);

  let status;

  if (winner) {
    status = `Winner winner chicken dinner! ${winner} has won!`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  //A component returns markup to its caller, it is what gives us the ability to nest components! As all components are simply returning markup that will be rendered by react-dom.

  //Setting up the handleClick function we are passing to the board's children, the squares themselves.
  function handleClick(i) {
    //setting a guard clause to immediately return if the square is already filled! Added the || logical operator to return if the game is over(there is a winner);
    if (squares[i] || calcWinner(squares)) return;
    //First we create a copy of the current state of squares, storing this array instance into nextSquares.
    const nextSquares = squares.slice();
    //Then we assign the first element to 'X'
    nextSquares[i] = xIsNext ? 'X' : 'O';
    //Then we finally call the setSquares setter function to set the updated state to state variable, squares. When setSquares is called, we must remember that it will re-render the component that first defined it as well as all of its children. So this means even if we are passing this function as a prop to the squares themselves, this state was defined in the parent, therefore the entire board will re-render upon the clicking of any square.
    // setSquares(nextSquares);
    // //What's interesting about how this handleClick function is able to be passed as a prop and retain access to squares and setSquares is that it is due to closure!!!! This function will create closure over its lexical environment, this closure is stored in the heap, and therefore this function will always be able to access those variables and functions defined in its lexical scope.
    // //We are using this boolean to figure out whos turn it is, every time a square on the board is flipped, the boolean will be transformed to the opposite value. true => false, false => true
    // setXIsNext(!xIsNext);

    onPlay(nextSquares);
  }

  let Rows = [];
  let Squares = [];
  
  //Dynamically generating the squares with the appropriate value/handler function
  for (let i = 0; i < squares.length; i++) {
    Squares.push(<Square value={squares[i]} onSquareClick={() => handleClick(i)}/>);
  }
  //Creating the rows array which we will embed into our returned markup.
  for (let i = 0; i < 3; i++) {
   Rows.push(Squares.splice(0, 3)); 
  }

  Rows = Rows.map((row) => {
    return (
      <div className="board-row">
        {row}
      </div>
    );
  })
  
  return (
    <div className="board">
      <p className="gameStatus">{status}</p>
      {Rows}
    </div>
  );
}

export default function Game() {
  //We have lifted up the xIsNext use state as well as defined a history state variable, while removing the squares state variable. Now our board component is fully controlled by the props we are passing to it from our main component, Game.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    //Within our handler we creating a new array (immutability!!!!!!) with a spread operator spreading out each state of the current history, appending the current state to the end, which our currentSquares refers to the last element in the histories array! It is the current squares being passed to the board that is allowing us to render the current state of the board. 
    //It is through storing all the previous states in our history is what allows us to traverse "back in time".
    //Since we can now 'go back in time' we will want to update our setHistory to be the current copy of the history state from 0 to the current move,
    //this way when we click a square after traveling back in time, we can ensure we keep only the history until the currentMove, as we are now playing the game from this previous state, so the future state should be deleted.
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    //Here we will update the current move state variable to the move the user clicked on.
    setCurrentMove(nextMove);
    //If the move the user clicked on is even, this means that X will be the next move.
  }
  //Here we define a moves array which is just our history array mapped to an li representing the button that will allow us to jump back to a previous state. 
                        //we know that map takes in the value, which is the squares array, and the index, which we will be used to represent the move #
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move # ${move}`;
    } else {
      description = 'Go to game start';
    }
    return (
      // React requires a key for each list item to be able to identify and manage individual list items. Here we are produced with an error because we haven't specified the key for the list item. By default react will produce the error to warn us and use the array's index as the key by default. This can be problematic when trying to re-order a list's items or inserting/removing items.
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
        <div className="current-move">{`Move#:${currentMove}`}</div>
      </div>
    </>
  )
}

// Creating a helper function to determine the winner, much similar to our vanilla JS logic! Its not React specific!
  
function calcWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]) {
      return squares[a];
    }
  }
  
  return null;
}