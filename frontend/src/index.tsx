import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { DrinkProvider } from "./providers/drinksContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DrinkProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DrinkProvider>
  </React.StrictMode>
);

reportWebVitals();
