import { useState } from "react";
import { teachers as initialTeachers } from "../data/mockData";

function Teachers() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "", classes: "", phone: "" });

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setTeachers([
      ...teachers,
      { id: teachers.length + 1, ...form, status: "Active", joined: "Sep 2026" },
    ]);
    setForm({ name: "", subject: "", classes: "", phone: "" });
    setShowModal(false);
  }

  return (
    <div className="page-block">
      <div className="student-summary">
        <div className="summary-box">
          <span>Total Teachers</span>
          <strong>{teachers.length}</strong>
        </div>
        <div className="summary-box">
          <span>Active</span>
          <strong>{teachers.filter((t) => t.status === "Active").length}</strong>
        </div>
        <div className="summary-box">
          <span>On Leave</span>
          <strong>{teachers.filter((t) => t.status === "On Leave").length}</strong>
        </div>
      </div>

      <div className="students-container">
        <div className="students-container-header">
          <div>
            <h2>All Teachers</h2>
            <p>Teaching staff and their subjects</p>
          </div>
          <div className="header-actions">
            <input
              type="text"
              placeholder="Search teachers..."
              className="student-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="add-student-btn" onClick={() => setShowModal(true)}>
              + Add Teacher
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Classes</th>
                <th>Phone</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td className="cell-name">
                    <span className="mini-avatar">{t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                    {t.name}
                  </td>
                  <td>{t.subject}</td>
                  <td>{t.classes}</td>
                  <td>{t.phone}</td>
                  <td>{t.joined}</td>
                  <td>
                    <span className={`badge ${t.status === "Active" ? "badge-active" : "badge-pending"}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-state">No teacher found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Teacher</h2>
            <form onSubmit={handleAdd}>
              <label>
                Full Name
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Jasim Uddin" autoFocus />
              </label>
              <label>
                Subject
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="e.g. Biology" />
              </label>
              <label>
                Classes
                <input value={form.classes} onChange={(e) => setForm({ ...form, classes: e.target.value })} placeholder="e.g. Class 8-10" />
              </label>
              <label>
                Phone
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="01XXX-XXXXXX" />
              </label>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Teacher</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teachers;
