import { useState } from "react";

import TeacherSidebar from "../components/TeacherSidebar";

import TeacherNavbar from "../components/TeacherNavbar";

import TeacherBottomNav from "../components/TeacherBottomNav";

import { Outlet } from "react-router-dom";

function TeacherLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="teacher-app-shell">

      <TeacherSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="teacher-app-main">

        <TeacherNavbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="teacher-app-content">
          <Outlet />
        </main>

        <TeacherBottomNav
          onMoreClick={() => setSidebarOpen(true)}
        />

      </div>

    </div>
  );
}

export default TeacherLayout;