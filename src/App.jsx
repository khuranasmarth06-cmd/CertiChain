import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Verify from "./pages/Verify";
import Developer from "./pages/Developer";
import StudentDashboard from "./pages/StudentDashboard";
import InstituteDashboard from "./pages/InstituteDashboard";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import InstituteLogin from "./pages/InstituteLogin";
import InstituteSignup from "./pages/InstituteSignup";
import CompanyLogin from "./pages/CompanyLogin";
import CompanySignup from "./pages/CompanySignup";
import NotFound from "./pages/NotFound";
import StudentProtectedRoute from "./components/StudentProtectedRoute";
import InstituteProtectedRoute from "./components/InstituteProtectedRoute";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
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
          path="/institute/login"
          element={<InstituteLogin />}
        />
        <Route
          path="/institute/signup"
          element={<InstituteSignup />}
        />
        <Route
          path="/student/dashboard"
          element={
            <StudentProtectedRoute>
              <StudentDashboard />
            </StudentProtectedRoute>
          }
        />
        <Route
          path="/institute/dashboard"
          element={
            <InstituteProtectedRoute>
              <InstituteDashboard />
            </InstituteProtectedRoute>
          }
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
          path="/platform"
          element={<Platform />}
        />
        <Route
          path="/developer"
          element={<Developer />}
        />
        <Route
          path="/verify"
          element={<Verify />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;