import { useMemo, useState } from "react";
import "../styles/teacher-exams.css";

function TeacherExams() {
  const [selectedExam, setSelectedExam] = useState("Physics Monthly Test 01");
  const [selectedBatch, setSelectedBatch] = useState("Physics Batch A");

  const [students, setStudents] = useState([
    {
      id: "ST-001",
      name: "Rahim",
      roll: "01",
      marks: 88,
    },
    {
      id: "ST-002",
      name: "Karim",
      roll: "02",
      marks: 82,
    },
    {
      id: "ST-003",
      name: "Sakib",
      roll: "03",
      marks: 79,
    },
    {
      id: "ST-004",
      name: "Hasan",
      roll: "04",
      marks: 74,
    },
    {
      id: "ST-005",
      name: "Nabil",
      roll: "05",
      marks: 70,
    },
    {
      id: "ST-006",
      name: "Rafi",
      roll: "06",
      marks: 66,
    },
  ]);

  function updateMarks(studentId, value) {
    let marks = Number(value);

    if (Number.isNaN(marks)) {
      marks = 0;
    }

    if (marks < 0) {
      marks = 0;
    }

    if (marks > 100) {
      marks = 100;
    }

    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              marks,
            }
          : student
      )
    );
  }

  const rankedStudents = useMemo(() => {
    return [...students]
      .sort((a, b) => b.marks - a.marks)
      .map((student, index) => ({
        ...student,
        position: index + 1,
      }));
  }, [students]);

  const highestMarks =
    rankedStudents.length > 0
      ? rankedStudents[0].marks
      : 0;

  const classAverage =
    rankedStudents.length > 0
      ? Math.round(
          rankedStudents.reduce(
            (total, student) => total + student.marks,
            0
          ) / rankedStudents.length
        )
      : 0;

  const passedStudents = rankedStudents.filter(
    (student) => student.marks >= 40
  ).length;

  const failedStudents =
    rankedStudents.length - passedStudents;

  function handleSaveResults() {
    const resultData = {
      teacherId: "T-001",
      subject: "Physics",
      exam: selectedExam,
      batch: selectedBatch,
      results: rankedStudents.map((student) => ({
        studentId: student.id,
        marks: student.marks,
        position: student.position,
      })),
    };

    console.log("Exam Results:", resultData);

    alert("Exam results saved successfully!");
  }

  return (
    <div className="dashboard-page teacher-exams-page">

      {/* Header */}
      <div className="teacher-exams-header">

        <div>
          <p className="teacher-dashboard-eyebrow">
            Teacher Portal
          </p>

         
        </div>

        <button
          type="button"
          className="teacher-save-results-btn"
          onClick={handleSaveResults}
        >
          ✓ Save Results
        </button>

      </div>

      {/* Exam Controls */}
      <div className="dashboard-panel teacher-exam-control-panel">

        <div className="teacher-exam-controls">

          <div className="teacher-exam-field">
            <label>Exam</label>

            <select
              value={selectedExam}
              onChange={(e) =>
                setSelectedExam(e.target.value)
              }
            >
              <option>
                Physics Monthly Test 01
              </option>

              <option>
                Physics Monthly Test 02
              </option>

              <option>
                Physics Model Test
              </option>
            </select>
          </div>

          <div className="teacher-exam-field">
            <label>Batch</label>

            <select
              value={selectedBatch}
              onChange={(e) =>
                setSelectedBatch(e.target.value)
              }
            >
              <option>Physics Batch A</option>
              <option>Physics Batch B</option>
              <option>Physics Batch C</option>
            </select>
          </div>

          <div className="teacher-exam-field">
            <label>Subject</label>

            <select defaultValue="Physics">
              <option>Physics</option>
            </select>
          </div>

          <div className="teacher-exam-field">
            <label>Total Marks</label>

            <div className="teacher-total-marks">
              100
            </div>
          </div>

        </div>

      </div>

      {/* Summary */}
      <div className="teacher-exam-summary">

        <div className="teacher-exam-summary-card">
          <span>Total Students</span>
          <strong>{rankedStudents.length}</strong>
          <small>In selected batch</small>
        </div>

        <div className="teacher-exam-summary-card">
          <span>Highest Marks</span>
          <strong>{highestMarks}</strong>
          <small>Out of 100</small>
        </div>

        <div className="teacher-exam-summary-card">
          <span>Class Average</span>
          <strong>{classAverage}%</strong>
          <small>Current performance</small>
        </div>

        <div className="teacher-exam-summary-card">
          <span>Passed</span>
          <strong>{passedStudents}</strong>
          <small>{failedStudents} failed</small>
        </div>

      </div>

      {/* Results Table */}
      <div className="dashboard-panel teacher-exam-results-panel">

        <div className="panel-header">

          <div>
            <h2>Enter Exam Marks</h2>

            <p>
              {selectedExam} · {selectedBatch}
            </p>
          </div>

          <span className="teacher-exam-student-count">
            {rankedStudents.length} Students
          </span>

        </div>

        <div className="teacher-exam-table-wrapper">

          <table className="teacher-exam-table">

            <thead>
              <tr>
                <th>Position</th>
                <th>Roll</th>
                <th>Student</th>
                <th>Student ID</th>
                <th>Marks</th>
                <th>Percentage</th>
                <th>Result</th>
              </tr>
            </thead>

            <tbody>

              {rankedStudents.map((student) => (

                <tr key={student.id}>

                  <td>
                    <span
                      className={
                        student.position <= 3
                          ? "teacher-position-badge top"
                          : "teacher-position-badge"
                      }
                    >
                      {student.position}
                    </span>
                  </td>

                  <td>
                    <span className="teacher-exam-roll">
                      {student.roll}
                    </span>
                  </td>

                  <td>
                    <strong className="teacher-exam-student-name">
                      {student.name}
                    </strong>
                  </td>

                  <td>
                    <span className="teacher-exam-student-id">
                      {student.id}
                    </span>
                  </td>

                  <td>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={student.marks}
                      onChange={(e) =>
                        updateMarks(
                          student.id,
                          e.target.value
                        )
                      }
                      className="teacher-marks-input"
                    />

                  </td>

                  <td>
                    <strong className="teacher-exam-percentage">
                      {student.marks}%
                    </strong>
                  </td>

                  <td>

                    <span
                      className={
                        student.marks >= 40
                          ? "teacher-result-badge pass"
                          : "teacher-result-badge fail"
                      }
                    >
                      {student.marks >= 40
                        ? "Passed"
                        : "Failed"}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Footer */}
        <div className="teacher-exam-footer">

          <div>
            <strong>
              {selectedExam}
            </strong>

            <span>
              Results will be recorded for{" "}
              {selectedBatch}.
            </span>
          </div>

          <button
            type="button"
            className="teacher-save-results-btn"
            onClick={handleSaveResults}
          >
            Save Exam Results
          </button>

        </div>

      </div>

    </div>
  );
}

export default TeacherExams;