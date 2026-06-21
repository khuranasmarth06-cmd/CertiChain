import {BrowserRouter,Routes,Route,} from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/dashboard"
           element={<StudentDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;