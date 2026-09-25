import { useState } from "react";

import { students as initialStudents } from "../data/mockData";
import "../styles/admin-students.css";

function Students() {
  const preparedStudents = initialStudents.map((student, index) => ({
    ...student,
    studentId:
      student.studentId || `S-${String(index + 1).padStart(3, "0")}`,
    group: student.group || "Science",
    subjects: Array.isArray(student.subjects)
      ? student.subjects
      : student.subject
        ? student.subject.split(",").map((item) => item.trim())
        : ["General"],
  }));

  const [students, setStudents] = useState(preparedStudents);

  const [search, setSearch] = useState({
    id: "",
    name: "",
    group: "",
    subject: "",
  });

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    className: "Class 8",
    group: "Science",
    subjects: [],
  });

  const groupOptions = ["Science", "Commerce", "Arts", "Others"];

  const subjectOptions = {
    Science: [
      "Physics",
      "Chemistry",
      "Biology",
      "Higher Mathematics",
      "General Science",
    ],
    Commerce: [
      "Accounting",
      "Finance & Banking",
      "Economics",
      "Business Entrepreneurship",
    ],
    Arts: [
      "Bangla",
      "English",
      "History",
      "Civics",
      "Geography",
      "Social Science",
    ],
    Others: [
      "ICT",
      "Computer Science",
      "Religion",
      "Physical Education",
      "Drawing",
    ],
  };

  const filteredStudents = students.filter((student) => {
    const studentId = String(student.studentId || "").toLowerCase();

    const studentName = String(student.name || "").toLowerCase();

    const studentGroup = String(student.group || "").toLowerCase();

    const studentSubjects = Array.isArray(student.subjects)
      ? student.subjects.join(" ").toLowerCase()
      : String(student.subjects || "").toLowerCase();

    const idMatch =
      !search.id.trim() ||
      studentId.includes(search.id.trim().toLowerCase());

    const nameMatch =
      !search.name.trim() ||
      studentName.includes(search.name.trim().toLowerCase());

    const groupMatch =
      !search.group.trim() ||
      studentGroup.includes(search.group.trim().toLowerCase());

    const subjectMatch =
      !search.subject.trim() ||
      studentSubjects.includes(search.subject.trim().toLowerCase());

    return idMatch && nameMatch && groupMatch && subjectMatch;
  });

  function handleAddStudent(e) {
    e.preventDefault();

    if (!form.name.trim()) return;

    const nextStudentNumber = students.length + 1;

    const newStudent = {
      id: Date.now(),
      studentId: `S-${String(nextStudentNumber).padStart(3, "0")}`,
      name: form.name.trim(),
      className: form.className,
      group: form.group,
      subjects:
        form.subjects.length > 0 ? form.subjects : ["General"],
      status: "Pending",
      phone: "-",
      fee: "Due",
    };

    setStudents((prev) => [...prev, newStudent]);

    setForm({
      name: "",
      className: "Class 8",
      group: "Science",
      subjects: [],
    });

    setShowModal(false);
  }

  function toggleSubject(subject) {
    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((item) => item !== subject)
        : [...prev.subjects, subject],
    }));
  }

  return (
    <div className="students-page">
      {/* SUMMARY */}
      <div className="student-summary">
        <div className="summary-box">
          <span>Total Students</span>
          <strong>{students.length}</strong>
        </div>

        <div className="summary-box">
          <span>Active Students</span>
          <strong>
            {students.filter((s) => s.status === "Active").length}
          </strong>
        </div>

        <div className="summary-box">
          <span>Pending</span>
          <strong>
            {students.filter((s) => s.status === "Pending").length}
          </strong>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="students-container">
        <div className="students-container-header">
          <div className="students-heading">
            <span className="section-kicker">STUDENT DIRECTORY</span>
            <h2>All Students</h2>
            <p>Manage students, groups and enrolled subjects.</p>
          </div>

          <div className="header-actions">
            <button
              className="add-student-btn"
              onClick={() => setShowModal(true)}
            >
              + Add Student
            </button>

            {/* SEARCH AREA */}
            <div className="student-search-grid">
              <input
                type="text"
                placeholder="Student ID..."
                className="student-search"
                value={search.id}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    id: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Student Name..."
                className="student-search"
                value={search.name}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Group..."
                className="student-search"
                value={search.group}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    group: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Subject..."
                className="student-search"
                value={search.subject}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    subject: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* RESULT INFO */}
        <div className="student-result-info">
          <span>
            Showing <strong>{filteredStudents.length}</strong> of{" "}
            <strong>{students.length}</strong> students
          </span>
        </div>

        {/* TABLE */}
        <div className="table-wrap student-table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Group</th>
                <th>Subject</th>
                <th>Phone</th>
                <th>Fee</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <span className="student-id">
                        {student.studentId}
                      </span>
                    </td>

                    <td className="cell-name">
                      <span className="mini-avatar">
                        {student.name
                          .split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </span>

                      {student.name}
                    </td>

                    <td>{student.className || "—"}</td>

                    <td>
                      <span className="group-badge">
                        {student.group || "—"}
                      </span>
                    </td>

                    <td className="student-subject-cell">
                      {student.subjects?.map((subject, index) => (
                        <span key={`${subject}-${index}`}>
                          {subject}
                          {index < student.subjects.length - 1 && <br />}
                        </span>
                      ))}
                    </td>

                    <td>{student.phone || "—"}</td>

                    <td>{student.fee || "—"}</td>

                    <td>
                      <span
                        className={`badge ${
                          student.status === "Active"
                            ? "badge-active"
                            : "badge-pending"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-state">
                    No student found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD STUDENT MODAL */}
      {showModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal student-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add New Student</h2>

            <p className="modal-subtitle">
              Add student information, group and enrolled subjects.
            </p>

            <form onSubmit={handleAddStudent}>
              <label>
                Full Name

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Rakib Hossain"
                  autoFocus
                />
              </label>

              <label>
                Class

                <select
                  value={form.className}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      className: e.target.value,
                    })
                  }
                >
                  <option>Class 6</option>
                  <option>Class 7</option>
                  <option>Class 8</option>
                  <option>Class 9</option>
                  <option>Class 10</option>
                  <option>Class 11</option>
                  <option>Class 12</option>
                </select>
              </label>

              <label>
                Group

                <select
                  value={form.group}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      group: e.target.value,
                      subjects: [],
                    })
                  }
                >
                  {groupOptions.map((group) => (
                    <option key={group}>{group}</option>
                  ))}
                </select>
              </label>

              <div className="student-subject-selector">
                <span className="subject-selector-label">
                  Subjects
                </span>

                <div className="subject-options">
                  {subjectOptions[form.group].map((subject) => (
                    <label
                      key={subject}
                      className={`subject-option ${
                        form.subjects.includes(subject)
                          ? "selected"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.subjects.includes(subject)}
                        onChange={() => toggleSubject(subject)}
                      />

                      <span>{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
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