import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/teacher-batches.css";

function TeacherBatches() {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  const batches = [
    {
      id: "PHY-A",
      name: "Physics Batch A",
      subject: "Physics",
      className: "HSC 2027",
      students: 24,
      days: "Sat · Mon · Wed",
      time: "10:00 AM - 11:30 AM",
      room: "Room 301",
      status: "Active",
    },
    {
      id: "PHY-B",
      name: "Physics Batch B",
      subject: "Physics",
      className: "HSC 2027",
      students: 18,
      days: "Sun · Tue · Thu",
      time: "12:00 PM - 1:30 PM",
      room: "Room 302",
      status: "Active",
    },
    {
      id: "PHY-C",
      name: "Physics Batch C",
      subject: "Physics",
      className: "HSC 2026",
      students: 16,
      days: "Sat · Mon · Wed",
      time: "3:00 PM - 4:30 PM",
      room: "Room 201",
      status: "Active",
    },
    {
      id: "PHY-D",
      name: "Physics Model Batch",
      subject: "Physics",
      className: "HSC 2026",
      students: 12,
      days: "Fri · Sun",
      time: "5:00 PM - 6:30 PM",
      room: "Room 205",
      status: "Active",
    },
  ];

  const filteredBatches =
    selectedSubject === "All Subjects"
      ? batches
      : batches.filter(
          (batch) => batch.subject === selectedSubject
        );

  const totalStudents = filteredBatches.reduce(
    (total, batch) => total + batch.students,
    0
  );

  return (
    <div className="dashboard-page teacher-batches-page">

      {/* Header */}
      <div className="teacher-batches-header">

        <div>
          <p className="teacher-dashboard-eyebrow">
            Teacher Portal
          </p>

        
        </div>

        <div className="teacher-batches-header-stats">
          <div>
            <span>My Batches</span>
            <strong>{filteredBatches.length}</strong>
          </div>

          <div>
            <span>Total Students</span>
            <strong>{totalStudents}</strong>
          </div>
        </div>

      </div>

      {/* Filter */}
      <div className="dashboard-panel teacher-batches-filter-panel">

        <div className="teacher-batches-filter-left">

          <div>
            <h2>Assigned Batches</h2>

            <p>
              Only batches assigned to you are shown here.
            </p>
          </div>

        </div>

        <div className="teacher-batches-filter-right">

          <label htmlFor="subject-filter">
            Subject
          </label>

          <select
            id="subject-filter"
            value={selectedSubject}
            onChange={(e) =>
              setSelectedSubject(e.target.value)
            }
          >
            <option>All Subjects</option>
            <option>Physics</option>
          </select>

        </div>

      </div>

      {/* Batch Cards */}
      <div className="teacher-batches-grid">

        {filteredBatches.map((batch) => (

          <div
            className="teacher-batch-card"
            key={batch.id}
          >

            {/* Card Top */}
            <div className="teacher-batch-card-top">

              <div className="teacher-batch-icon">
                ⚛
              </div>

              <span className="teacher-batch-status">
                {batch.status}
              </span>

            </div>

            {/* Title */}
            <div className="teacher-batch-title">

              <h2>{batch.name}</h2>

              <p>
                {batch.subject} · {batch.className}
              </p>

            </div>

            {/* Info */}
            <div className="teacher-batch-info">

              <div className="teacher-batch-info-row">

                <span>👥</span>

                <div>
                  <small>Students</small>
                  <strong>
                    {batch.students} Students
                  </strong>
                </div>

              </div>

              <div className="teacher-batch-info-row">

                <span>◷</span>

                <div>
                  <small>Class Time</small>
                  <strong>
                    {batch.time}
                  </strong>
                </div>

              </div>

              <div className="teacher-batch-info-row">

                <span>▣</span>

                <div>
                  <small>Schedule</small>
                  <strong>
                    {batch.days}
                  </strong>
                </div>

              </div>

              <div className="teacher-batch-info-row">

                <span>⌂</span>

                <div>
                  <small>Room</small>
                  <strong>
                    {batch.room}
                  </strong>
                </div>

              </div>

            </div>

            {/* Actions */}
            <div className="teacher-batch-actions">

              <button
                type="button"
                onClick={() =>
                  navigate("/teacher-students")
                }
              >
                View Students
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/teacher-attendance")
                }
              >
                Attendance
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TeacherBatches;