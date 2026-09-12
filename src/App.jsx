import "./App.css";

import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import StudentLayout from "./layouts/StudentLayout";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Batches from "./pages/Batches";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
import Exams from "./pages/Exams";
import Notices from "./pages/Notices";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/login" element={<Login />} />


      {/* Admin Layout */}
      <Route element={<MainLayout />}>

        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/batches" element={<Batches />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/notices" element={<Notices />} />

      </Route>


      {/* Student Layout */}
      <Route element={<StudentLayout />}>

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

      </Route>

    </Routes>
  );
}

export default App;