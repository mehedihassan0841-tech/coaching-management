import { useState } from "react";
import "../styles/teacher-notices.css";

function TeacherNotices() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetBatch, setTargetBatch] =
    useState("All My Students");

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Physics Monthly Test 02",
      message:
        "The next monthly test will be held on Thursday. Please complete Chapter 04 preparation before the exam.",
      target: "Physics Batch A",
      date: "2026-09-18",
      status: "Published",
    },
    {
      id: 2,
      title: "Assignment Submission Reminder",
      message:
        "Students who have not submitted the numerical problems assignment are requested to submit it before the due date.",
      target: "All My Students",
      date: "2026-09-17",
      status: "Published",
    },
    {
      id: 3,
      title: "Extra Physics Class",
      message:
        "An additional revision class will be arranged before the model test.",
      target: "Physics Batch B",
      date: "2026-09-15",
      status: "Published",
    },
  ]);

  function handlePublish() {
    if (!title.trim()) {
      alert("Please enter a notice title.");
      return;
    }

    if (!message.trim()) {
      alert("Please enter a notice message.");
      return;
    }

    const newNotice = {
      id: Date.now(),
      title,
      message,
      target: targetBatch,
      date: new Date().toISOString().split("T")[0],
      status: "Published",
    };

    setNotices((currentNotices) => [
      newNotice,
      ...currentNotices,
    ]);

    setTitle("");
    setMessage("");

    alert("Notice published successfully!");
  }

  return (
    <div className="dashboard-page teacher-notices-page">

      {/* Header */}
      <div className="teacher-notices-header">
        <div>
          <p className="teacher-dashboard-eyebrow">
            Teacher Portal
          </p>

         
        </div>
      </div>

      {/* Create Notice */}
      <div className="dashboard-panel teacher-create-notice-panel">

        <div className="panel-header">

          <div>
            <h2>Create New Notice</h2>

            <p>
              Share important information with your assigned students.
            </p>
          </div>

          <span className="teacher-notice-create-badge">
            New Notice
          </span>

        </div>

        <div className="teacher-notice-form">

          {/* Title */}
          <div className="teacher-notice-field full">

            <label>Notice Title</label>

            <input
              type="text"
              placeholder="e.g. Monthly Test Announcement"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>

          {/* Target */}
          <div className="teacher-notice-field">

            <label>Target Students</label>

            <select
              value={targetBatch}
              onChange={(e) =>
                setTargetBatch(e.target.value)
              }
            >
              <option>All My Students</option>
              <option>Physics Batch A</option>
              <option>Physics Batch B</option>
              <option>Physics Batch C</option>
            </select>

          </div>

          {/* Message */}
          <div className="teacher-notice-field full">

            <label>Notice Message</label>

            <textarea
              rows="6"
              placeholder="Write your announcement here..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            ></textarea>

          </div>

        </div>

        <div className="teacher-notice-form-footer">

          <span>
            The notice will be visible to the selected students.
          </span>

          <button
            type="button"
            className="teacher-publish-notice-btn"
            onClick={handlePublish}
          >
            + Publish Notice
          </button>

        </div>

      </div>

      {/* Notice List */}
      <div className="dashboard-panel teacher-notice-list-panel">

        <div className="panel-header">

          <div>
            <h2>Published Notices</h2>

            <p>
              Manage announcements shared with your students.
            </p>
          </div>

          <span className="teacher-notice-count">
            {notices.length} Notices
          </span>

        </div>

        <div className="teacher-notice-list">

          {notices.map((notice) => (
            <div
              className="teacher-notice-card"
              key={notice.id}
            >

              <div className="teacher-notice-pin">
                📌
              </div>

              <div className="teacher-notice-card-content">

                <div className="teacher-notice-card-top">

                  <div>
                    <h3>
                      {notice.title}
                    </h3>

                    <div className="teacher-notice-meta">
                      <span>
                        {notice.target}
                      </span>

                      <span>
                        {notice.date}
                      </span>
                    </div>
                  </div>

                  <span className="teacher-notice-status">
                    {notice.status}
                  </span>

                </div>

                <p>
                  {notice.message}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default TeacherNotices;