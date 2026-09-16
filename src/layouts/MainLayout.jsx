import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navbar";
import BottomNav from "../components/BottomNav";

const pageMeta = {
  "/": { title: "Dashboard", subtitle: "Overview of your coaching center." },
  "/students": { title: "Students", subtitle: "Manage all students of your coaching center." },
  "/teachers": { title: "Teachers", subtitle: "Manage teaching staff and their assigned subjects." },
  "/batches": { title: "Batches", subtitle: "Organize students into classes and schedules." },
  "/attendance": { title: "Attendance", subtitle: "Track daily attendance for every batch." },
  "/fees": { title: "Fees", subtitle: "Track payments and dues for this month." },
  "/exams": { title: "Exams", subtitle: "Schedule exams and publish results." },
  "/notices": { title: "Notices", subtitle: "Announcements for students and staff." },
};

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const meta = pageMeta[location.pathname] || { title: "EduCare" };

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <Navbar
          title={meta.title}
          subtitle={meta.subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <div className="app-content">
          <Outlet />
        </div>

        <BottomNav onMoreClick={() => setSidebarOpen(true)} />
      </div>
    </div>
  );
}

export default MainLayout;
