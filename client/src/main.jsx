import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AppContextProvider } from "./context/AppContext.jsx";
createRoot(document.getElementById("root")).render(
  <Router>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </Router>
);
