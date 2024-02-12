// export default identifies this function as the main component we are exporting from this module.

                      //A component is identified by having the first character of its identifier capitalized.
export default function Square() {
  //A component returns markup to its caller, it is what gives us the ability to nest components! As all components are simply returning markup that will be rendered by react-dom.
  return <button className="square">X</button>;
}
