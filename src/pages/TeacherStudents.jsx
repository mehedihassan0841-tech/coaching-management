import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/teacher-students.css";

function TeacherStudents() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("All Batches");

  const students = [
    {
      id: "ST-001",
      name: "Rahim",
      roll: "01",
      batch: "Physics Batch A",
      className: "HSC 2027",
      attendance: 96,
      average: 88,
      status: "Excellent",
    },
    {
      id: "ST-002",
      name: "Karim",
      roll: "02",
      batch: "Physics Batch A",
      className: "HSC 2027",
      attendance: 91,
      average: 82,
      status: "Good",
    },
    {
      id: "ST-003",
      name: "Sakib",
      roll: "03",
      batch: "Physics Batch A",
      className: "HSC 2027",
      attendance: 84,
      average: 79,
      status: "Good",
    },
    {
      id: "ST-004",
      name: "Hasan",
      roll: "04",
      batch: "Physics Batch B",
      className: "HSC 2027",
      attendance: 89,
      average: 74,
      status: "Average",
    },
    {
      id: "ST-005",
      name: "Nabil",
      roll: "05",
      batch: "Physics Batch B",
      className: "HSC 2027",
      attendance: 78,
      average: 70,
      status: "Average",
    },
    {
      id: "ST-006",
      name: "Rafi",
      roll: "06",
      batch: "Physics Batch B",
      className: "HSC 2027",
      attendance: 72,
      average: 66,
      status: "Needs Attention",
    },
    {
      id: "ST-007",
      name: "Tanvir",
      roll: "07",
      batch: "Physics Batch C",
      className: "HSC 2026",
      attendance: 94,
      average: 91,
      status: "Excellent",
    },
    {
      id: "ST-008",
      name: "Fahim",
      roll: "08",
      batch: "Physics Batch C",
      className: "HSC 2026",
      attendance: 87,
      average: 83,
      status: "Good",
    },
  ];

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.id
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesBatch =
        selectedBatch === "All Batches" ||
        student.batch === selectedBatch;

      return matchesSearch && matchesBatch;
    });
  }, [searchTerm, selectedBatch]);

  const excellentCount = students.filter(
    (student) => student.status === "Excellent"
  ).length;

  const attentionCount = students.filter(
    (student) => student.status === "Needs Attention"
  ).length;

  const averageAttendance = Math.round(
    students.reduce(
      (total, student) => total + student.attendance,
      0
    ) / students.length
  );

  return (
    <div className="dashboard-page teacher-students-page">

      {/* Header */}
      <div className="teacher-students-header">

        <div>
          <p className="teacher-dashboard-eyebrow">
            Teacher Portal
          </p>

          
        </div>

        <button
          type="button"
          className="teacher-students-attendance-btn"
          onClick={() => navigate("/teacher-attendance")}
        >
          ✓ Take Attendance
        </button>

      </div>

      {/* Summary */}
      <div className="teacher-students-summary">

        <div className="teacher-student-summary-card">
          <span>Total Students</span>
          <strong>{students.length}</strong>
          <small>Across all batches</small>
        </div>

        <div className="teacher-student-summary-card">
          <span>Excellent</span>
          <strong>{excellentCount}</strong>
          <small>Top performers</small>
        </div>

        <div className="teacher-student-summary-card">
          <span>Average Attendance</span>
          <strong>{averageAttendance}%</strong>
          <small>All assigned students</small>
        </div>

        <div className="teacher-student-summary-card">
          <span>Needs Attention</span>
          <strong>{attentionCount}</strong>
          <small>Require follow-up</small>
        </div>

      </div>

      {/* Filters */}
      <div className="dashboard-panel teacher-students-filter-panel">

        <div className="teacher-students-filter">

          <div className="teacher-students-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search by student name or ID..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

          </div>

          <select
            value={selectedBatch}
            onChange={(e) =>
              setSelectedBatch(e.target.value)
            }
          >
            <option>All Batches</option>
            <option>Physics Batch A</option>
            <option>Physics Batch B</option>
            <option>Physics Batch C</option>
          </select>

        </div>

      </div>

      {/* Student Table */}
      <div className="dashboard-panel teacher-students-panel">

        <div className="panel-header">

          <div>
            <h2>Student Directory</h2>

            <p>
              Showing {filteredStudents.length} of{" "}
              {students.length} students
            </p>
          </div>

          <span className="teacher-students-count">
            {filteredStudents.length} Students
          </span>

        </div>

        <div className="teacher-students-table-wrapper">

          <table className="teacher-students-table">

            <thead>
              <tr>
                <th>Roll</th>
                <th>Student</th>
                <th>Student ID</th>
                <th>Batch</th>
                <th>Attendance</th>
                <th>Average</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.map((student) => (

                <tr key={student.id}>

                  <td>
                    <span className="teacher-student-roll">
                      {student.roll}
                    </span>
                  </td>

                  <td>
                    <div className="teacher-student-name">

                      <div className="teacher-student-avatar">
                        {student.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{student.name}</strong>

                        <small>
                          {student.className}
                        </small>
                      </div>

                    </div>
                  </td>

                  <td>
                    <span className="teacher-student-id">
                      {student.id}
                    </span>
                  </td>

                  <td>
                    <span className="teacher-student-batch">
                      {student.batch}
                    </span>
                  </td>

                  <td>

                    <div className="teacher-student-progress">

                      <div className="teacher-student-progress-top">
                        <strong>
                          {student.attendance}%
                        </strong>
                      </div>

                      <div className="teacher-student-progress-bar">
                        <span
                          style={{
                            width: `${student.attendance}%`,
                          }}
                        ></span>
                      </div>

                    </div>

                  </td>

                  <td>
                    <strong className="teacher-student-average">
                      {student.average}%
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`teacher-student-status ${student.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {student.status}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredStudents.length === 0 && (
            <div className="teacher-students-empty">
              <strong>No students found</strong>
              <span>
                Try a different student name, ID or batch.
              </span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default TeacherStudents;