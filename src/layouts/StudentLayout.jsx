import { useState } from "react";
import StudentSidebar from "../components/StudentSidebar";
import StudentNavbar from "../components/StudentNavbar";
import StudentBottomNav from "../components/StudentBottomNav";
import { Outlet } from "react-router-dom";

function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="student-app-shell">

      <StudentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="student-app-main">

        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="student-app-content">
          <Outlet />
        </main>

        <StudentBottomNav onMoreClick={() => setSidebarOpen(true)} />

      </div>

    </div>
  );
}

export default StudentLayout;