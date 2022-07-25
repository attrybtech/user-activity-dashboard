import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardScreen from "./DashboardScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/user-activity-dashboard"
            element={<DashboardScreen />}
          />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
