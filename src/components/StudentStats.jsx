import { attendanceRecords, exams, feeRecords } from "../data/mockData";

function StudentStats() {
  const studentName = "Arif Rahman";

  const studentAttendance = attendanceRecords.find(
    (student) => student.name === studentName
  );

  const attendancePercentage = studentAttendance
    ? Math.round(
        (studentAttendance.present / studentAttendance.total) * 100
      )
    : 0;

  const upcomingExams = exams.filter(
    (exam) => exam.status !== "Completed"
  ).length;

  const dueFee = feeRecords.find(
    (fee) =>
      fee.student === studentName &&
      fee.status === "Due"
  );

  return (
    <section className="student-dashboard-stats">

      <div className="student-dashboard-stat">
        <div className="student-stat-icon">
          📊
        </div>

        <div>
          <span>Attendance</span>
          <strong>{attendancePercentage}%</strong>
          <small>Overall attendance</small>
        </div>
      </div>

      <div className="student-dashboard-stat">
        <div className="student-stat-icon">
          📝
        </div>

        <div>
          <span>Upcoming Exams</span>
          <strong>{upcomingExams}</strong>
          <small>Exams scheduled</small>
        </div>
      </div>

      <div className="student-dashboard-stat">
        <div className="student-stat-icon">
          📚
        </div>

        <div>
          <span>Courses</span>
          <strong>4</strong>
          <small>Active courses</small>
        </div>
      </div>

      <div className="student-dashboard-stat">
        <div className="student-stat-icon">
          💳
        </div>

        <div>
          <span>Fee Status</span>
          <strong>
            {dueFee ? "Due" : "Paid"}
          </strong>
          <small>
            {dueFee
              ? `৳${dueFee.amount.toLocaleString()} pending`
              : "All payments clear"}
          </small>
        </div>
      </div>

    </section>
  );
}

export default StudentStats;