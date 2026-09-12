import { useState } from "react";
import { attendanceRecords } from "../data/mockData";

function Attendance() {
  const [selectedDate, setSelectedDate] = useState("2026-09-12");

  return (
    <div className="page-block">
      <div className="students-container">
        <div className="students-container-header">
          <div>
            <h2>Attendance Overview</h2>
            <p>Monthly attendance summary for all students</p>
          </div>
          <div className="header-actions">
            <input
              type="date"
              className="student-search"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button className="add-student-btn">Mark Today</button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((rec) => {
                const pct = Math.round((rec.present / rec.total) * 100);
                return (
                  <tr key={rec.id}>
                    <td className="cell-name">
                      <span className="mini-avatar">{rec.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                      {rec.name}
                    </td>
                    <td>{rec.className}</td>
                    <td>{rec.present}</td>
                    <td>{rec.absent}</td>
                    <td>
                      <div className="progress-cell">
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{ width: `${pct}%`, background: pct >= 90 ? "#22c55e" : pct >= 75 ? "#6c63ff" : "#f59e0b" }}
                          ></div>
                        </div>
                        <span>{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
