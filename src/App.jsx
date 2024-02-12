// export default identifies this function as the main component we are exporting from this module.

//Defining the individual squares as a component that takes in a prop and uses embeds that prop using the curly brace syntax.
              //we are essentially destructuring the object passed into this component as an argument to only accept its value property.
function Square({ value }) {
                                  //Here we embed it into our actual markup.
  return <button className="square">{value}</button>;
}

                      //A component is identified by having the first character of its identifier capitalized.
export default function Board() {
  //A component returns markup to its caller, it is what gives us the ability to nest components! As all components are simply returning markup that will be rendered by react-dom.
  return (
    <div className="board">
      <div className="board-row">
               {/* For each Square we pass in a different number. We are passing it in here as a string, although with the curly brace syntax we can pass in the value of evaluating any JavaScript expression*/}
        <Square value="1"/>
        <Square value={2}/>
        <Square value="3"/>
      </div>
      <div className="board-row">
        <Square value="4"/>
        <Square value="5"/>
        <Square value="6"/>
      </div>
      <div className="board-row">
        <Square value="7"/>
        <Square value="8"/>
        <Square value="9"/>
      </div>
    </div>
  );
}
