import { useState } from "react";
import StudentCard from "../components/StudentCard";
import { students as initialStudents } from "../data/mockData";

function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", className: "Class 8", subject: "General" });

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleAddStudent(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setStudents([
      ...students,
      {
        id: students.length + 1,
        name: form.name,
        className: form.className,
        subject: form.subject,
        status: "Pending",
        phone: "-",
        fee: "Due",
      },
    ]);
    setForm({ name: "", className: "Class 8", subject: "General" });
    setShowModal(false);
  }

  return (
    <div className="students-page">
      <div className="student-summary">
        <div className="summary-box">
          <span>Total Students</span>
          <strong>{students.length}</strong>
        </div>
        <div className="summary-box">
          <span>Active Students</span>
          <strong>{students.filter((s) => s.status === "Active").length}</strong>
        </div>
        <div className="summary-box">
          <span>Pending</span>
          <strong>{students.filter((s) => s.status === "Pending").length}</strong>
        </div>
      </div>

      <div className="students-container">
        <div className="students-container-header">
          <div>
            <h2>All Students</h2>
            <p>Recently registered students</p>
          </div>

          <div className="header-actions">
            <input
              type="text"
              placeholder="Search students..."
              className="student-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="add-student-btn" onClick={() => setShowModal(true)}>
              + Add Student
            </button>
          </div>
        </div>

        <div className="students-list">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                name={student.name}
                className={student.className}
                subject={student.subject}
                status={student.status}
              />
            ))
          ) : (
            <p className="empty-state">No student found.</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Student</h2>
            <form onSubmit={handleAddStudent}>
              <label>
                Full Name
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rakib Hossain"
                  autoFocus
                />
              </label>
              <label>
                Class
                <select
                  value={form.className}
                  onChange={(e) => setForm({ ...form, className: e.target.value })}
                >
                  <option>Class 8</option>
                  <option>Class 9</option>
                  <option>Class 10</option>
                </select>
              </label>
              <label>
                Subject
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                >
                  <option>Science</option>
                  <option>General</option>
                  <option>English</option>
                </select>
              </label>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
