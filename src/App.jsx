import { useState } from 'react';

//Defining the individual squares as a component that takes in a prop and uses embeds that prop using the curly brace syntax.
//we are essentially destructuring the object passed into this component as an argument to only accept its value property.
function Square({ value }) {
  //Since we are now bringing in the useState Hook, we can remove the parameter accepting value as a prop as well as the props we initially passed to the Squares.

  //Setting up a state variable to keep track of the current state of our value. Initializing all squares with a value of null.
  // const [value, setValue] = useState(null);

  // function handleClick() {
  //   //Rather than console logging on click, now we use the setValue() function to set the current value to 'X' when a square is clicked. By calling this set function from an onClick handler, we are telling react to re-render that Square whenever its button is clicked! Not only this but the React Docs state "When you call a set function in a component, React automatically updates the child components inside too." This means that when we call the setter function of useState, not only will the component calling the setter re-render, but all of its children will as well! This ensures the updated state is reflected in the component as well as its child components.
  //   setValue('X');
  // }

  //Since we are declaring a state directly in the Square component, this means each square will have its own state independent from one another!
  
  //Here we embed it into our actual markup.
  return <button className="square">
              {value}
         </button>;
}

// export default identifies this function as the main component we are exporting from this module.

                      //A component is identified by having the first character of its identifier capitalized.
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  //A component returns markup to its caller, it is what gives us the ability to nest components! As all components are simply returning markup that will be rendered by react-dom.
  return (
    <div className="board">
      <div className="board-row">
               {/* For each Square we pass in a different number. We are passing it in here as a string, although with the curly brace syntax we can pass in the value of evaluating any JavaScript expression*/}
        <Square value={squares[0]}/>
        <Square value={squares[1]}/>
        <Square value={squares[2]}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]}/>
        <Square value={squares[4]}/>
        <Square value={squares[5]}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]}/>
        <Square value={squares[7]}/>
        <Square value={squares[8]}/>
      </div>
    </div>
  );
}
