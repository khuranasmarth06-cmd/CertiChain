import {BrowserRouter,Routes,Route,} from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import InstituteDashboard from "./pages/InstituteDashboard";
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
        <Route
          path="/verify"
         element={<Verify />}
        />
        <Route
         path="/institute"
         element={<InstituteDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;