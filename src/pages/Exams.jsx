import { useState } from "react";
import { exams, examResults } from "../data/mockData";

function Exams() {
  const [tab, setTab] = useState("exams");

  return (
    <div className="page-block">
      <div className="students-container">
        <div className="students-container-header">
          <div>
            <h2>Exams &amp; Results</h2>
            <p>Schedule exams and publish results</p>
          </div>
          <button className="add-student-btn">+ Schedule Exam</button>
        </div>

        <div className="tab-row">
          <button className={`tab-btn ${tab === "exams" ? "tab-btn-active" : ""}`} onClick={() => setTab("exams")}>
            Exam Schedule
          </button>
          <button className={`tab-btn ${tab === "results" ? "tab-btn-active" : ""}`} onClick={() => setTab("results")}>
            Results
          </button>
        </div>

        {tab === "exams" ? (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((ex) => (
                  <tr key={ex.id}>
                    <td className="cell-name">{ex.name}</td>
                    <td>{ex.className}</td>
                    <td>{ex.subject}</td>
                    <td>{ex.date}</td>
                    <td>
                      <span className={`badge ${ex.status === "Completed" ? "badge-active" : "badge-pending"}`}>
                        {ex.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Exam</th>
                  <th>Marks</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {examResults.map((r) => (
                  <tr key={r.id}>
                    <td className="cell-name">{r.student}</td>
                    <td>{r.exam}</td>
                    <td>{r.marks} / {r.outOf}</td>
                    <td>
                      <span className="badge badge-active">{r.grade}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Exams;
