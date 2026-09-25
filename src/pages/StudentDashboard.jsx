import { useEffect, useState } from "react";

import StudentWelcome from "../components/StudentWelcome";
import StudentStats from "../components/StudentStats";
import StudentCourses from "../components/StudentCourses";
import StudentExams from "../components/StudentExams";
import StudentAttendance from "../components/StudentAttendance";
import StudentNotices from "../components/StudentNotices";
import StudentFeeNotice from "../components/StudentFeeNotice";

function StudentDashboard() {
  const [dashboardReady, setDashboardReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDashboardReady(true);
    }, 20);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`student-dashboard ${
        dashboardReady ? "student-dashboard-ready" : ""
      }`}
    >
      {/* Welcome */}
      <div className="student-dashboard-reveal student-reveal-welcome">
        <StudentWelcome />
      </div>

      {/* Statistics */}
      <div className="student-dashboard-reveal student-reveal-stats">
        <StudentStats />
      </div>

      {/* Courses + Exams */}
      <div className="student-dashboard-grid student-dashboard-reveal student-reveal-courses">
        <StudentCourses />
        <StudentExams />
      </div>

      {/* Attendance + Notices */}
      <div className="student-dashboard-bottom student-dashboard-reveal student-reveal-attendance">
        <StudentAttendance />
        <StudentNotices />
      </div>

      {/* Fee Notice */}
      <div className="student-dashboard-reveal student-reveal-fees">
        <StudentFeeNotice />
      </div>
    </div>
  );
}

export default StudentDashboard;