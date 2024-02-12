// index.jsx is the main module that ties everything together! it serves as an entry point into our application. Here we will be applying the rendering logic as well as any configurations for the app.

//Here we import React itself and the StrictMode helper component that identifies and warns about possible syntax errors in our App.jsx as well as any nested components within App.jsx.
import React, { StrictMode } from "react";

//Bringing in the createRoot function from react-dom client.
import { createRoot } from "react-dom/client";

//Bringing in the stylesheet to which we wish to apply to our component. When bundled, will inject a style tag in the <head> of our document that has all these styles inside of it in our rendered HTML.
import "./styles.css";

//Bringing in the App component to which we will be rendering to the browser. This represents the root of our application's component tree.
import App from "./App";

//Creates a root element to which React components are displayed inside the browser DOM node. We are passing the empty div we created in index.html to be the root of our React app. It is the what is setting up the entry point for our React app.
const root = createRoot(document.getElementById("root"));
//Renders the component passed in, displaying it to the DOM node of our React root. Takes in a reactNode(component) as an argument. Keep in mind this is a method of the object representing our React Root!
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);