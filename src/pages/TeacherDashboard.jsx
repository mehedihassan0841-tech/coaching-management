import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/teacher-dashboard.css";

function TeacherDashboard() {
    const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedBatch, setSelectedBatch] = useState("All Batches");

  const exams = [
    {
      id: 1,
      name: "Physics Monthly Test 01",
      month: "January",
      batch: "Physics Batch A",
    },
    {
      id: 2,
      name: "Physics Monthly Test 02",
      month: "January",
      batch: "Physics Batch A",
    },
    {
      id: 3,
      name: "Physics Model Test",
      month: "January",
      batch: "Physics Batch A",
    },
  ];

  const students = [
    {
      id: "ST-001",
      name: "Rahim",
      scores: [88, 91, 85],
    },
    {
      id: "ST-002",
      name: "Karim",
      scores: [82, 86, 83],
    },
    {
      id: "ST-003",
      name: "Sakib",
      scores: [79, 81, 78],
    },
    {
      id: "ST-004",
      name: "Hasan",
      scores: [74, 77, 75],
    },
    {
      id: "ST-005",
      name: "Nabil",
      scores: [70, 72, 69],
    },
    {
      id: "ST-006",
      name: "Rafi",
      scores: [66, 68, 64],
    },
  ];

  const performanceData = useMemo(() => {
    return students
      .map((student) => {
        const total = student.scores.reduce(
          (sum, score) => sum + score,
          0
        );

        const average = total / student.scores.length;

        return {
          ...student,
          total,
          average: average.toFixed(1),
        };
      })
      .sort((a, b) => b.total - a.total);
  }, []);

  return (
    <div className="dashboard-page teacher-dashboard-page">

      {/* Header */}

      <div className="teacher-dashboard-header">
        <div>
          <p className="teacher-dashboard-eyebrow">
            Teacher Portal
          </p>

          <h1>Good Morning, Mr. Rahman 👋</h1>

          <p className="teacher-dashboard-subtitle">
            Here's what's happening with your classes today.
          </p>
        </div>
      </div>

      {/* Stats */}

      <div className="dashboard-stats">

        <div className="dashboard-stat-card">
          <span>Today's Classes</span>
          <strong>3</strong>
          <small>2 upcoming</small>
        </div>

        <div className="dashboard-stat-card">
          <span>My Batches</span>
          <strong>6</strong>
          <small>All active</small>
        </div>

        <div className="dashboard-stat-card">
          <span>Total Students</span>
          <strong>60</strong>
          <small>Across all batches</small>
        </div>

        <div className="dashboard-stat-card">
          <span>Today's Attendance</span>
          <strong>54 / 60</strong>
          <small>90% present</small>
        </div>

        <div className="dashboard-stat-card">
          <span>Pending Assignments</span>
          <strong>8</strong>
          <small>Need attention</small>
        </div>

        <div className="dashboard-stat-card">
          <span>Total Exams</span>
          <strong>12</strong>
          <small>This academic year</small>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="dashboard-panel teacher-quick-actions">

        <div className="panel-header">
          <div>
            <h2>Quick Actions</h2>
            <p>Manage your classes quickly.</p>
          </div>
        </div>

        <div className="teacher-action-grid">

          <button
  className="teacher-action-card"
  onClick={() => navigate("/teacher-attendance")}
>
            <span className="teacher-action-icon">✓</span>

            <div>
              <strong>Take Attendance</strong>
              <small>Mark today's attendance</small>
            </div>
          </button>

          <button
  className="teacher-action-card"
  onClick={() => navigate("/teacher-exams")}
>
            <span className="teacher-action-icon">✎</span>

            <div>
              <strong>Add Exam Marks</strong>
              <small>Enter student results</small>
            </div>
          </button>

          <button
  className="teacher-action-card"
  onClick={() => navigate("/teacher-assignments")}
>
            <span className="teacher-action-icon">+</span>

            <div>
              <strong>Create Assignment</strong>
              <small>Give students new work</small>
            </div>
          </button>

         <button
  className="teacher-action-card"
  onClick={() => navigate("/teacher-notices")}
>
            <span className="teacher-action-icon">!</span>

            <div>
              <strong>Create Notice</strong>
              <small>Notify your students</small>
            </div>
          </button>

        </div>

      </div>

      {/* Exam Performance */}

      <div className="dashboard-panel teacher-performance-panel">

        <div className="panel-header">

          <div>
            <h2>Exam Performance</h2>

            <p>
              See how your students performed across multiple exams.
            </p>
          </div>

          <div className="teacher-performance-filters">

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
            </select>

            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option>All Batches</option>
              <option>Physics Batch A</option>
              <option>Physics Batch B</option>
              <option>Physics Batch C</option>
            </select>

          </div>

        </div>

        {/* Exam summary */}

        <div className="teacher-exam-summary">

          <div>
            <span>Exams</span>
            <strong>
              {
                exams.filter(
                  (exam) =>
                    exam.month === selectedMonth &&
                    (
                      selectedBatch === "All Batches" ||
                      exam.batch === selectedBatch
                    )
                ).length
              }
            </strong>
          </div>

          <div>
            <span>Top Student</span>
            <strong>
              {performanceData[0]?.name}
            </strong>
          </div>

          <div>
            <span>Highest Total</span>
            <strong>
              {performanceData[0]?.total}
            </strong>
          </div>

          <div>
            <span>Class Average</span>
            <strong>
              {(
                performanceData.reduce(
                  (sum, student) =>
                    sum + Number(student.average),
                  0
                ) / performanceData.length
              ).toFixed(1)}
              %
            </strong>
          </div>

        </div>

        {/* Performance bars */}

        <div className="teacher-performance-chart">

          {performanceData.map((student, index) => {

            const percentage = (student.total / 300) * 100;

            return (
              <div
                className="teacher-performance-row"
                key={student.id}
              >

                <div className="teacher-student-rank">
                  <span>
                    #{index + 1}
                  </span>

                  <div>
                    <strong>{student.name}</strong>
                    <small>{student.id}</small>
                  </div>
                </div>

                <div className="teacher-performance-bar-area">

                  <div className="teacher-performance-bar-track">

                    <div
                      className="teacher-performance-bar"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                  <strong>
                    {student.total}/300
                  </strong>

                </div>

              </div>
            );

          })}

        </div>

      </div>

      {/* Exam Position Table */}

      <div className="dashboard-panel">

        <div className="panel-header">

          <div>
            <h2>Student Position</h2>

            <p>
              January exam performance ranking
            </p>
          </div>

        </div>

        <div className="teacher-position-table-wrapper">

          <table className="teacher-position-table">

            <thead>
              <tr>
                <th>Position</th>
                <th>Student</th>
                <th>Exam 01</th>
                <th>Exam 02</th>
                <th>Exam 03</th>
                <th>Total</th>
                <th>Average</th>
              </tr>
            </thead>

            <tbody>

              {performanceData.map((student, index) => (

                <tr key={student.id}>

                  <td>
                    <span className="teacher-position-badge">
                      {index + 1}
                    </span>
                  </td>

                  <td>
                    <strong>{student.name}</strong>
                    <small>{student.id}</small>
                  </td>

                  <td>{student.scores[0]}</td>

                  <td>{student.scores[1]}</td>

                  <td>{student.scores[2]}</td>

                  <td>
                    <strong>{student.total}</strong>
                  </td>

                  <td>
                    <span className="teacher-average-pill">
                      {student.average}%
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default TeacherDashboard;