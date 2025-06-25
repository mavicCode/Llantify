import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const path = window.location.pathname;
const indexContent = document.getElementById("indexContent");

// Solo muestra la landing si estás en "/"
if (indexContent && path !== "/") {
  indexContent.style.display = "none";
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
); 
