import { Link } from "react-router-dom";
import { students, teachers, feeRecords, notices, batches } from "../data/mockData";

function Dashboard() {
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const dueFees = feeRecords.filter((f) => f.status === "Due").length;
  const paidThisMonth = feeRecords
    .filter((f) => f.status === "Paid")
    .reduce((sum, f) => sum + f.amount, 0);

  const stats = [
    { label: "Total Students", value: totalStudents, hint: "+2 this month", to: "/students" },
    { label: "Total Teachers", value: totalTeachers, hint: "1 on leave", to: "/teachers" },
    { label: "Active Batches", value: batches.length, hint: "All running on schedule", to: "/batches" },
    { label: "Fees Collected", value: `৳${paidThisMonth.toLocaleString()}`, hint: `${dueFees} payments due`, to: "/fees" },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-stats">
        {stats.map((stat) => (
          <Link to={stat.to} key={stat.label} className="dashboard-stat-card">
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.hint}</small>
          </Link>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>Upcoming Batches</h2>
            <Link to="/batches">View all</Link>
          </div>
          <div className="dashboard-list">
            {batches.slice(0, 4).map((batch) => (
              <div className="dashboard-list-row" key={batch.id}>
                <div>
                  <strong>{batch.name}</strong>
                  <p>{batch.teacher} · {batch.room}</p>
                </div>
                <span className="pill">{batch.schedule}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>Latest Notices</h2>
            <Link to="/notices">View all</Link>
          </div>
          <div className="dashboard-list">
            {notices.map((notice) => (
              <div className="dashboard-list-row" key={notice.id}>
                <div>
                  <strong>{notice.title}</strong>
                  <p>{notice.date}</p>
                </div>
                <span className="pill pill-muted">{notice.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
