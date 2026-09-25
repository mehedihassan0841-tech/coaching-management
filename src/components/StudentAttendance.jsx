import { attendanceRecords } from "../data/mockData";

function StudentAttendance() {
  const studentName = "Arif Rahman";

  const attendance = attendanceRecords.find(
    (student) => student.name === studentName
  );

  if (!attendance) {
    return (
      <section className="student-dashboard-panel">
        <div className="student-panel-header">
          <div>
            <h2>My Attendance</h2>
            <p>Track your class attendance</p>
          </div>
        </div>

        <div className="student-empty-state">
          <span>📊</span>
          <p>Attendance data not available.</p>
        </div>
      </section>
    );
  }

  const percentage = Math.round(
    (attendance.present / attendance.total) * 100
  );

  return (
    <section className="student-dashboard-panel">

      <div className="student-panel-header">
        <div>
          <h2>My Attendance</h2>
          <p>Your overall class attendance</p>
        </div>

        <span className="student-attendance-percent">
          {percentage}%
        </span>
      </div>

      <div className="student-attendance-content">

        <div className="student-attendance-circle">
          <strong>{percentage}%</strong>
          <span>Attendance</span>
        </div>

        <div className="student-attendance-details">

          <div className="student-attendance-row">
            <span>
              <i className="attendance-dot present"></i>
              Present
            </span>
            <strong>{attendance.present} Classes</strong>
          </div>

          <div className="student-attendance-row">
            <span>
              <i className="attendance-dot absent"></i>
              Absent
            </span>
            <strong>{attendance.absent} Classes</strong>
          </div>

          <div className="student-attendance-row">
            <span>
              <i className="attendance-dot total"></i>
              Total Classes
            </span>
            <strong>{attendance.total} Classes</strong>
          </div>

        </div>

      </div>

      <div className="student-attendance-message">
        {percentage >= 90
          ? "Excellent attendance! Keep it up. 🎉"
          : percentage >= 75
          ? "Good attendance. Try to attend every class."
          : "Your attendance is low. Try to attend more classes."}
      </div>

    </section>
  );
}

export default StudentAttendance;