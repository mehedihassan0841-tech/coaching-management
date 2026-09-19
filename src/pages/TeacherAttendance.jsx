import { useState } from "react";
import "../styles/teacher-attendance.css";

function TeacherAttendance() {
  const [selectedBatch, setSelectedBatch] = useState("Physics Batch A");
  const [selectedDate, setSelectedDate] = useState("2026-09-19");

  const [students, setStudents] = useState([
    {
      id: "ST-001",
      name: "Rahim",
      roll: "01",
      status: "Present",
    },
    {
      id: "ST-002",
      name: "Karim",
      roll: "02",
      status: "Present",
    },
    {
      id: "ST-003",
      name: "Sakib",
      roll: "03",
      status: "Absent",
    },
    {
      id: "ST-004",
      name: "Hasan",
      roll: "04",
      status: "Present",
    },
    {
      id: "ST-005",
      name: "Nabil",
      roll: "05",
      status: "Late",
    },
    {
      id: "ST-006",
      name: "Rafi",
      roll: "06",
      status: "Present",
    },
  ]);

  function updateAttendance(studentId, status) {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              status,
            }
          : student
      )
    );
  }

  function markAllPresent() {
    setStudents((currentStudents) =>
      currentStudents.map((student) => ({
        ...student,
        status: "Present",
      }))
    );
  }

  const presentCount = students.filter(
    (student) => student.status === "Present"
  ).length;

  const absentCount = students.filter(
    (student) => student.status === "Absent"
  ).length;

  const lateCount = students.filter(
    (student) => student.status === "Late"
  ).length;

  const attendancePercentage =
    students.length === 0
      ? 0
      : Math.round((presentCount / students.length) * 100);

  function handleSubmit() {
    const attendanceData = {
      teacherId: "T-001",
      subject: "Physics",
      batchId: selectedBatch,
      date: selectedDate,
      records: students.map((student) => ({
        studentId: student.id,
        status: student.status,
      })),
    };

    console.log("Attendance Submitted:", attendanceData);
    alert("Attendance submitted successfully!");
  }

  return (
    <div className="dashboard-page teacher-attendance-page">
      {/* Header */}
      <div className="teacher-attendance-header">
        <div>
          <p className="teacher-dashboard-eyebrow">
            Attendance Management
          </p>

         
        </div>

        <button
          type="button"
          className="teacher-mark-all-btn"
          onClick={markAllPresent}
        >
          ✓ Mark All Present
        </button>
      </div>

      {/* Filters */}
      <div className="dashboard-panel teacher-attendance-filter-panel">
        <div className="teacher-attendance-filter">
          <div className="teacher-attendance-field">
            <label>Batch</label>

            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option>Physics Batch A</option>
              <option>Physics Batch B</option>
              <option>Physics Batch C</option>
            </select>
          </div>

          <div className="teacher-attendance-field">
            <label>Subject</label>

            <select defaultValue="Physics">
              <option>Physics</option>
            </select>
          </div>

          <div className="teacher-attendance-field">
            <label>Date</label>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="teacher-attendance-summary">
        <div className="teacher-attendance-summary-card">
          <span>Total Students</span>
          <strong>{students.length}</strong>
        </div>

        <div className="teacher-attendance-summary-card">
          <span>Present</span>
          <strong>{presentCount}</strong>
        </div>

        <div className="teacher-attendance-summary-card">
          <span>Absent</span>
          <strong>{absentCount}</strong>
        </div>

        <div className="teacher-attendance-summary-card">
          <span>Late</span>
          <strong>{lateCount}</strong>
        </div>

        <div className="teacher-attendance-summary-card">
          <span>Attendance</span>
          <strong>{attendancePercentage}%</strong>
        </div>
      </div>

      {/* Student List */}
      <div className="dashboard-panel teacher-attendance-panel">
        <div className="panel-header">
          <div>
            <h2>Student Attendance</h2>

            <p>
              {selectedBatch} · {selectedDate}
            </p>
          </div>

          <span className="teacher-attendance-count">
            {students.length} Students
          </span>
        </div>

        <div className="teacher-attendance-table-wrapper">
          <table className="teacher-attendance-table">
            <thead>
              <tr>
                <th>Roll</th>
                <th>Student</th>
                <th>Student ID</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>
                    <span className="teacher-roll-badge">
                      {student.roll}
                    </span>
                  </td>

                  <td>
                    <strong>{student.name}</strong>
                  </td>

                  <td>
                    <span className="teacher-student-id">
                      {student.id}
                    </span>
                  </td>

                  <td>
                    <div className="teacher-attendance-actions">
                      <button
                        type="button"
                        className={
                          student.status === "Present"
                            ? "attendance-status-btn present active"
                            : "attendance-status-btn present"
                        }
                        onClick={() =>
                          updateAttendance(student.id, "Present")
                        }
                      >
                        Present
                      </button>

                      <button
                        type="button"
                        className={
                          student.status === "Absent"
                            ? "attendance-status-btn absent active"
                            : "attendance-status-btn absent"
                        }
                        onClick={() =>
                          updateAttendance(student.id, "Absent")
                        }
                      >
                        Absent
                      </button>

                      <button
                        type="button"
                        className={
                          student.status === "Late"
                            ? "attendance-status-btn late active"
                            : "attendance-status-btn late"
                        }
                        onClick={() =>
                          updateAttendance(student.id, "Late")
                        }
                      >
                        Late
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit */}
        <div className="teacher-attendance-footer">
          <div>
            <strong>
              {presentCount} of {students.length} students present
            </strong>

            <span>
              Attendance will be recorded for {selectedDate}.
            </span>
          </div>

          <button
            type="button"
            className="teacher-submit-attendance-btn"
            onClick={handleSubmit}
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherAttendance;