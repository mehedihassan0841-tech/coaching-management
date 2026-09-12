import StudentSidebar from "../components/StudentSidebar";
import StudentNavbar from "../components/StudentNavbar";
import { Outlet } from "react-router-dom";

function StudentLayout() {
  return (
    <div className="student-app-shell">

      <StudentSidebar />

      <div className="student-app-main">

        <StudentNavbar />

        <main className="student-app-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default StudentLayout;