import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "core-js/stable";

import React from "react";
import App from "./App";
import "./index.scss";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
