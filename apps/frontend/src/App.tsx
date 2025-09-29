import { BrowserRouter as Router } from "react-router-dom";
import { QueryProvider } from "./providers";
import AppRoutes from "./router";
import "./App.css";

function App() {
  return (
    <QueryProvider>
      <Router>
        <AppRoutes />
      </Router>
    </QueryProvider>
  );
}

export default App;
