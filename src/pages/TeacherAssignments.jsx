import { useState } from "react";
import "../styles/teacher-assignments.css";

function TeacherAssignments() {
  const [selectedBatch, setSelectedBatch] =
    useState("Physics Batch A");

  const [selectedSubject, setSelectedSubject] =
    useState("Physics");

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [dueDate, setDueDate] =
    useState("2026-09-25");

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Chapter 03 Numerical Problems",
      subject: "Physics",
      batch: "Physics Batch A",
      dueDate: "2026-09-22",
      submissions: 18,
      totalStudents: 24,
      status: "Published",
    },
    {
      id: 2,
      title: "Motion & Force Worksheet",
      subject: "Physics",
      batch: "Physics Batch B",
      dueDate: "2026-09-24",
      submissions: 11,
      totalStudents: 18,
      status: "Published",
    },
    {
      id: 3,
      title: "Model Test Preparation",
      subject: "Physics",
      batch: "Physics Batch C",
      dueDate: "2026-09-28",
      submissions: 0,
      totalStudents: 16,
      status: "Draft",
    },
  ]);

  function handlePublish() {
    if (!title.trim()) {
      alert("Please enter an assignment title.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter an assignment description.");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title,
      subject: selectedSubject,
      batch: selectedBatch,
      dueDate,
      submissions: 0,
      totalStudents:
        selectedBatch === "Physics Batch A"
          ? 24
          : selectedBatch === "Physics Batch B"
          ? 18
          : 16,
      status: "Published",
    };

    setAssignments((currentAssignments) => [
      newAssignment,
      ...currentAssignments,
    ]);

    setTitle("");
    setDescription("");

    alert("Assignment published successfully!");
  }

  return (
    <div className="dashboard-page teacher-assignments-page">

      {/* Header */}
      <div className="teacher-assignments-header">

        <div>
          <p className="teacher-dashboard-eyebrow">
            Teacher Portal
          </p>

          
        </div>

      </div>

      {/* Create Assignment */}
      <div className="dashboard-panel teacher-create-assignment-panel">

        <div className="panel-header">

          <div>
            <h2>Create New Assignment</h2>

            <p>
              Publish new work for your assigned students.
            </p>
          </div>

          <span className="teacher-assignment-create-badge">
            New Assignment
          </span>

        </div>

        <div className="teacher-assignment-form">

          {/* Title */}
          <div className="teacher-assignment-field full">

            <label>Assignment Title</label>

            <input
              type="text"
              placeholder="e.g. Chapter 04 Numerical Problems"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>

          {/* Batch */}
          <div className="teacher-assignment-field">

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

          {/* Subject */}
          <div className="teacher-assignment-field">

            <label>Subject</label>

            <select
              value={selectedSubject}
              onChange={(e) =>
                setSelectedSubject(e.target.value)
              }
            >
              <option>Physics</option>
            </select>

          </div>

          {/* Due Date */}
          <div className="teacher-assignment-field">

            <label>Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
            />

          </div>

          {/* Description */}
          <div className="teacher-assignment-field full">

            <label>Description</label>

            <textarea
              rows="5"
              placeholder="Write instructions or details for students..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            ></textarea>

          </div>

        </div>

        <div className="teacher-assignment-form-footer">

          <span>
            Students will receive this assignment after publishing.
          </span>

          <button
            type="button"
            className="teacher-publish-assignment-btn"
            onClick={handlePublish}
          >
            + Publish Assignment
          </button>

        </div>

      </div>

      {/* Assignment List */}
      <div className="dashboard-panel teacher-assignment-list-panel">

        <div className="panel-header">

          <div>
            <h2>My Assignments</h2>

            <p>
              Track published assignments and submissions.
            </p>
          </div>

          <span className="teacher-assignment-count">
            {assignments.length} Assignments
          </span>

        </div>

        <div className="teacher-assignment-list">

          {assignments.map((assignment) => {

            const submissionPercentage =
              assignment.totalStudents === 0
                ? 0
                : Math.round(
                    (assignment.submissions /
                      assignment.totalStudents) *
                      100
                  );

            return (
              <div
                className="teacher-assignment-card"
                key={assignment.id}
              >

                <div className="teacher-assignment-card-icon">
                  ▤
                </div>

                <div className="teacher-assignment-card-main">

                  <div className="teacher-assignment-card-title">

                    <h3>
                      {assignment.title}
                    </h3>

                    <span
                      className={
                        assignment.status === "Published"
                          ? "teacher-assignment-status published"
                          : "teacher-assignment-status draft"
                      }
                    >
                      {assignment.status}
                    </span>

                  </div>

                  <div className="teacher-assignment-meta">

                    <span>
                      {assignment.subject}
                    </span>

                    <span>
                      {assignment.batch}
                    </span>

                    <span>
                      Due {assignment.dueDate}
                    </span>

                  </div>

                </div>

                <div className="teacher-assignment-submissions">

                  <div>
                    <strong>
                      {assignment.submissions}/
                      {assignment.totalStudents}
                    </strong>

                    <span>
                      Submitted
                    </span>
                  </div>

                  <div className="teacher-submission-progress">

                    <span
                      style={{
                        width: `${submissionPercentage}%`,
                      }}
                    ></span>

                  </div>

                  <small>
                    {submissionPercentage}% submitted
                  </small>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default TeacherAssignments;