import { useState } from "react";
import { feeRecords } from "../data/mockData";

function Fees() {
  const [filter, setFilter] = useState("All");

  const filtered = feeRecords.filter((f) => filter === "All" || f.status === filter);
  const totalCollected = feeRecords.filter((f) => f.status === "Paid").reduce((s, f) => s + f.amount, 0);
  const totalDue = feeRecords.filter((f) => f.status === "Due").reduce((s, f) => s + f.amount, 0);

  return (
    <div className="page-block">
      <div className="student-summary">
        <div className="summary-box">
          <span>Collected (Sept)</span>
          <strong>৳{totalCollected.toLocaleString()}</strong>
        </div>
        <div className="summary-box">
          <span>Due (Sept)</span>
          <strong>৳{totalDue.toLocaleString()}</strong>
        </div>
        <div className="summary-box">
          <span>Payments Due</span>
          <strong>{feeRecords.filter((f) => f.status === "Due").length}</strong>
        </div>
      </div>

      <div className="students-container">
        <div className="students-container-header">
          <div>
            <h2>Fee Records</h2>
            <p>September 2026 collection</p>
          </div>
          <div className="header-actions">
            <select className="student-search" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>All</option>
              <option>Paid</option>
              <option>Due</option>
            </select>
            <button className="add-student-btn">+ Record Payment</button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Paid On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.id}>
                  <td className="cell-name">{f.student}</td>
                  <td>{f.className}</td>
                  <td>{f.month}</td>
                  <td>৳{f.amount.toLocaleString()}</td>
                  <td>{f.date}</td>
                  <td>
                    <span className={`badge ${f.status === "Paid" ? "badge-active" : "badge-pending"}`}>
                      {f.status}
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

export default Fees;
