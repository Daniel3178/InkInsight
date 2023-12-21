import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import FirebaseConnection from "./database/firebase.js";
import LocalStorageConnection from "./database/localStorage.js"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalStorageConnection/>
      <App />
      <FirebaseConnection/>
    </Provider>
  </React.StrictMode>
);
