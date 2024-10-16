import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage/HomePage";
import { GamePageBrowser } from "./GamePageBrowser/GamePageBrowser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/browse/:storeName/:storeID"
          element={<GamePageBrowser />}
        />
      </Routes>
    </Router>
  );
}

export default App;
