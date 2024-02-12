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
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));


  //A component returns markup to its caller, it is what gives us the ability to nest components! As all components are simply returning markup that will be rendered by react-dom.

  //Setting up the handleClick function we are passing to the board's children, the squares themselves.
  function handleClick(i) {
    //setting a guard clause to immediately return if the square is already filled!
    if (squares[i]) return;
    //First we create a copy of the current state of squares, storing this array instance into nextSquares.
    const nextSquares = squares.slice();
    //Then we assign the first element to 'X'
    nextSquares[i] = xIsNext ? 'X' : 'O';
    //Then we finally call the setSquares setter function to set the updated state to state variable, squares. When setSquares is called, we must remember that it will re-render the component that first defined it as well as all of its children. So this means even if we are passing this function as a prop to the squares themselves, this state was defined in the parent, therefore the entire board will re-render upon the clicking of any square.
    setSquares(nextSquares);
    //What's interesting about how this handleClick function is able to be passed as a prop and retain access to squares and setSquares is that it is due to closure!!!! This function will create closure over its lexical environment, this closure is stored in the heap, and therefore this function will always be able to access those variables and functions defined in its lexical scope.
    //We are using this boolean to figure out whos turn it is, every time a square on the board is flipped, the boolean will be transformed to the opposite value. true => false, false => true
    setXIsNext(!xIsNext);
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

  return (
    <div className="board">
      <div className="board-row">
               {/* For each Square we pass in a different number. We are passing it in here as a string, although with the curly brace syntax we can pass in the value of evaluating any JavaScript expression*/}
               {/* To be able to call our handleClick function passing in the respective index we can define an anonymous arrow function that will call our handleClick function which we hardcoded the respective index passed as an argument. This is much nicer than defining 9 seperate functions that call handleClick with a specific index! The handleClick function's action targets the changing of the boards state, while the anonymous arrow function's action targets passing in the appropriate argument to the handler function call */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}
