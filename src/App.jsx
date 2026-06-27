import {BrowserRouter,Routes,Route,} from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import InstituteDashboard from "./pages/InstituteDashboard";
import InstituteLogin from "./pages/InstituteLogin";
import InstituteSignup from "./pages/InstituteSignup";
import CompanyLogin from "./pages/CompanyLogin";
import CompanySignup from "./pages/CompanySignup";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import NotFound from "./pages/NotFound";
import Developer from "./pages/Developer";
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
        <Route
         path="/institute/login"
         element={<InstituteLogin />}
        />
        <Route
         path="/institute/signup"
         element={<InstituteSignup />}
        />
        <Route
         path="/company/login"
         element={<CompanyLogin />}
        />
        <Route
         path="/company/signup"
         element={<CompanySignup />}
        />
        <Route
         path="/student/login"
         element={<StudentLogin />}
        />
        <Route
         path="/student/signup"
         element={<StudentSignup />}
        />
        <Route
         path="/developer"
         element={<Developer />}
         />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;