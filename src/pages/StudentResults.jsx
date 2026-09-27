
import { useEffect, useMemo, useState } from "react";
import "../styles/student-results.css";

const resultData = [
  {
    exam: "Annual Examination 2026",
    date: "March 15, 2026",
    subjects: [
      { name: "Physics", full: 100, obtained: 86 },
      { name: "Chemistry", full: 100, obtained: 82 },
      { name: "Biology", full: 100, obtained: 91 },
      { name: "Mathematics", full: 100, obtained: 88 },
      { name: "English", full: 100, obtained: 79 },
      { name: "ICT", full: 50, obtained: 44 },
    ],
    position: 7,
    totalStudents: 48,
  },
  {
    exam: "Mid Term Examination 2026",
    date: "January 25, 2026",
    subjects: [
      { name: "Physics", full: 100, obtained: 81 },
      { name: "Chemistry", full: 100, obtained: 78 },
      { name: "Biology", full: 100, obtained: 87 },
      { name: "Mathematics", full: 100, obtained: 84 },
      { name: "English", full: 100, obtained: 76 },
      { name: "ICT", full: 50, obtained: 41 },
    ],
    position: 9,
    totalStudents: 48,
  },
  {
    exam: "Monthly Test - January 2026",
    date: "January 12, 2026",
    subjects: [
      { name: "Physics", full: 50, obtained: 43 },
      { name: "Chemistry", full: 50, obtained: 40 },
      { name: "Biology", full: 50, obtained: 45 },
      { name: "Mathematics", full: 50, obtained: 42 },
      { name: "English", full: 50, obtained: 38 },
    ],
    position: 6,
    totalStudents: 48,
  },
];

function getGrade(percentage) {
  if (percentage >= 80) return "A+";
  if (percentage >= 70) return "A";
  if (percentage >= 60) return "A-";
  if (percentage >= 50) return "B";
  if (percentage >= 40) return "C";
  if (percentage >= 33) return "D";
  return "F";
}

function getGradeClass(grade) {
  return `grade-${grade.replace("+", "plus").replace("-", "minus").toLowerCase()}`;
}

function StudentResults() {
  const [selectedExam, setSelectedExam] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const currentResult = resultData[selectedExam];

  const summary = useMemo(() => {
    const totalFull = currentResult.subjects.reduce(
      (sum, subject) => sum + subject.full,
      0
    );

    const totalObtained = currentResult.subjects.reduce(
      (sum, subject) => sum + subject.obtained,
      0
    );

    const percentage = (totalObtained / totalFull) * 100;

    return {
      totalFull,
      totalObtained,
      percentage,
      grade: getGrade(percentage),
    };
  }, [currentResult]);

  return (
    <>
      {showIntro && (
        <div className="student-result-intro">
          <div className="result-intro-content">
            <div className="result-intro-icon">✓</div>

            <div className="result-intro-line"></div>

            <span>ACADEMIC RECORD</span>

            <h2>Preparing Your Result</h2>

            <p>Reviewing your academic performance...</p>

            <div className="result-loading">
              <div></div>
            </div>
          </div>
        </div>
      )}

      <div className="student-results-page">
        {/* Header */}
        

        {/* Exam Selector */}
        <section className="result-exam-selector">
          <div className="selector-heading">
            <span>SELECT EXAMINATION</span>
            <h2>Academic Results</h2>
          </div>

          <div className="exam-selector-buttons">
            {resultData.map((result, index) => (
              <button
                key={result.exam}
                type="button"
                className={
                  selectedExam === index
                    ? "exam-selector-btn active"
                    : "exam-selector-btn"
                }
                onClick={() => setSelectedExam(index)}
              >
                <span>{result.exam}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Result Sheet */}
        <section className="result-sheet">
          <div className="result-sheet-top">
            <div>
              <span className="sheet-label">OFFICIAL RESULT</span>

              <h2>{currentResult.exam}</h2>

              <p>Published on {currentResult.date}</p>
            </div>

            <div className="result-status">
              <span className="status-dot"></span>
              Result Published
            </div>
          </div>

          {/* Summary Cards */}
          <div className="result-summary-grid">
            <div className="result-summary-card">
              <span>Total Marks</span>

              <strong>
                {summary.totalObtained}
                <small> / {summary.totalFull}</small>
              </strong>

              <p>Overall obtained marks</p>
            </div>

            <div className="result-summary-card">
              <span>Percentage</span>

              <strong>{summary.percentage.toFixed(1)}%</strong>

              <p>Overall academic score</p>
            </div>

            <div className="result-summary-card">
              <span>Overall Grade</span>

              <strong
                className={`summary-grade ${getGradeClass(summary.grade)}`}
              >
                {summary.grade}
              </strong>

              <p>Based on total performance</p>
            </div>

            <div className="result-summary-card">
              <span>Class Position</span>

              <strong>
                #{currentResult.position}
              </strong>

              <p>Out of {currentResult.totalStudents} students</p>
            </div>
          </div>

          {/* Subject Results */}
          <div className="subject-result-section">
            <div className="section-title-row">
              <div>
                <span>SUBJECT PERFORMANCE</span>
                <h3>Detailed Result</h3>
              </div>

              <span className="subject-count">
                {currentResult.subjects.length} Subjects
              </span>
            </div>

            <div className="result-table-wrapper">
              <table className="student-result-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Full Marks</th>
                    <th>Obtained</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                    <th>Performance</th>
                  </tr>
                </thead>

                <tbody>
                  {currentResult.subjects.map((subject) => {
                    const percentage =
                      (subject.obtained / subject.full) * 100;

                    const grade = getGrade(percentage);

                    return (
                      <tr key={subject.name}>
                        <td>
                          <strong>{subject.name}</strong>
                        </td>

                        <td>{subject.full}</td>

                        <td>
                          <strong>{subject.obtained}</strong>
                        </td>

                        <td>
                          <div className="percentage-cell">
                            <span>{percentage.toFixed(0)}%</span>

                            <div className="result-progress">
                              <div
                                style={{
                                  width: `${percentage}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`result-grade ${getGradeClass(grade)}`}
                          >
                            {grade}
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              percentage >= 80
                                ? "performance-text excellent"
                                : percentage >= 70
                                ? "performance-text good"
                                : percentage >= 50
                                ? "performance-text average"
                                : "performance-text needs-improvement"
                            }
                          >
                            {percentage >= 80
                              ? "Excellent"
                              : percentage >= 70
                              ? "Very Good"
                              : percentage >= 50
                              ? "Good"
                              : "Needs Improvement"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="result-bottom-grid">
            <div className="performance-overview-card">
              <div className="section-title-row">
                <div>
                  <span>PERFORMANCE</span>
                  <h3>Performance Overview</h3>
                </div>
              </div>

              <div className="performance-list">
                {currentResult.subjects.map((subject) => {
                  const percentage =
                    (subject.obtained / subject.full) * 100;

                  return (
                    <div
                      className="performance-item"
                      key={subject.name}
                    >
                      <div className="performance-item-top">
                        <span>{subject.name}</span>
                        <strong>{percentage.toFixed(0)}%</strong>
                      </div>

                      <div className="performance-bar">
                        <div
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Position Card */}
            <div className="class-position-card">
              <span className="position-eyebrow">CLASS RANKING</span>

              <div className="position-number">
                #{currentResult.position}
              </div>

              <h3>Class Position</h3>

              <p>
                You are currently positioned at{" "}
                <strong>
                  #{currentResult.position}
                </strong>{" "}
                among {currentResult.totalStudents} students.
              </p>

              <div className="position-progress">
                <div
                  style={{
                    width: `${
                      100 -
                      ((currentResult.position - 1) /
                        currentResult.totalStudents) *
                        100
                    }%`,
                  }}
                ></div>
              </div>

              <span className="position-note">
                Keep improving your performance!
              </span>
            </div>
          </div>

          {/* Footer Note */}
          <div className="result-footer-note">
            <span>✓</span>

            <p>
              This result is generated from the academic records maintained
              by EduCare. For any discrepancy, please contact your class
              teacher or administration.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default StudentResults;
