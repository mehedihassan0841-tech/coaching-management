import StudentWelcome from "../components/StudentWelcome";
import StudentStats from "../components/StudentStats";
import StudentCourses from "../components/StudentCourses";
import StudentExams from "../components/StudentExams";
import StudentAttendance from "../components/StudentAttendance";
import StudentNotices from "../components/StudentNotices";
import StudentFeeNotice from "../components/StudentFeeNotice";

function StudentDashboard() {
  return (
    <div className="student-dashboard">

      <StudentWelcome />

      <StudentStats />

      <div className="student-dashboard-grid">
        <StudentCourses />
        <StudentExams />
      </div>

      <div className="student-dashboard-bottom">
        <StudentAttendance />
        <StudentNotices />
      </div>

      <StudentFeeNotice />

    </div>
  );
}

export default StudentDashboard;