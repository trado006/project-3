import React from "react";
import ReactDOM from "react-dom";
import Routing from "./Routing.js";
import { AuthContextProvider } from "./context/AuthContext";

import "antd/dist/antd.css";
import "./style.css";

ReactDOM.render(
  // <React.StrictMode>
    <AuthContextProvider>
      <Routing />
    </AuthContextProvider>
  // </React.StrictMode>
  ,document.getElementById("app")
);
