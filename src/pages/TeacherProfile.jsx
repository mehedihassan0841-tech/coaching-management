import { useState } from "react";
import "../styles/teacher-profile.css";

function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [teacher, setTeacher] = useState({
    name: "Mr. Rahman",
    teacherId: "T-001",
    subject: "Physics",
    email: "rahman@educare.com",
    phone: "+880 1712-345678",
    experience: "8 Years",
    qualification: "M.Sc. in Physics",
  });

  const [formData, setFormData] = useState(teacher);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSave() {
    setTeacher(formData);
    setIsEditing(false);

    alert("Profile updated successfully!");
  }

  function handleCancel() {
    setFormData(teacher);
    setIsEditing(false);
  }

  const batches = [
    {
      name: "Physics Batch A",
      className: "HSC 2027",
      students: 24,
    },
    {
      name: "Physics Batch B",
      className: "HSC 2027",
      students: 18,
    },
    {
      name: "Physics Batch C",
      className: "HSC 2026",
      students: 16,
    },
    {
      name: "Physics Model Batch",
      className: "HSC 2026",
      students: 12,
    },
  ];

  return (
    <div className="dashboard-page teacher-profile-page">

      {/* Header */}
      <div className="teacher-profile-header">
        <div>
          <p className="teacher-dashboard-eyebrow">
            Teacher Portal
          </p>

         
        </div>

       <div className="teacher-profile-header-actions">
        {!isEditing ? (
            <button
            type="button"
            className="teacher-edit-profile-btn"
            onClick={() => setIsEditing(true)}
            >
            ✎ Edit Profile
            </button>
        ) : (
            <>
            <button
                type="button"
                className="teacher-profile-header-cancel-btn"
                onClick={handleCancel}
            >
                Cancel
            </button>

            <button
                type="button"
                className="teacher-edit-profile-btn"
                onClick={handleSave}
            >
                ✓ Save Changes
            </button>
            </>
        )}
        </div>
      </div>

      {/* Profile Hero */}
      <div className="teacher-profile-hero">

        <div className="teacher-profile-avatar-large">
          MR
        </div>

        <div className="teacher-profile-hero-info">

          <h2>{teacher.name}</h2>

          <p>
            {teacher.subject} Teacher
          </p>

          <div className="teacher-profile-hero-meta">
            <span>
              Teacher ID: {teacher.teacherId}
            </span>

            <span>
              {teacher.experience} Experience
            </span>
          </div>

        </div>

        <div className="teacher-profile-active-badge">
          <span></span>
          Active Teacher
        </div>

      </div>

      {/* Statistics */}
      <div className="teacher-profile-stats">

        <div className="teacher-profile-stat-card">
          <span className="teacher-profile-stat-icon">
            ▦
          </span>

          <div>
            <strong>4</strong>
            <span>Assigned Batches</span>
          </div>
        </div>

        <div className="teacher-profile-stat-card">
          <span className="teacher-profile-stat-icon">
            ♙
          </span>

          <div>
            <strong>70</strong>
            <span>Total Students</span>
          </div>
        </div>

        <div className="teacher-profile-stat-card">
          <span className="teacher-profile-stat-icon">
            ✎
          </span>

          <div>
            <strong>12</strong>
            <span>Total Exams</span>
          </div>
        </div>

        <div className="teacher-profile-stat-card">
          <span className="teacher-profile-stat-icon">
            ★
          </span>

          <div>
            <strong>94%</strong>
            <span>Attendance Rate</span>
          </div>
        </div>

      </div>

      {/* Personal Information */}
      <div className="dashboard-panel teacher-profile-info-panel">

        <div className="panel-header">

          <div>
            <h2>Personal Information</h2>

            <p>
              Your basic teacher account information.
            </p>
          </div>

        </div>

        {isEditing ? (
          <div className="teacher-profile-form">

            <div className="teacher-profile-field">
              <label>Full Name</label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="teacher-profile-field">
              <label>Teacher ID</label>

              <input
                value={formData.teacherId}
                disabled
              />
            </div>

            <div className="teacher-profile-field">
              <label>Subject</label>

              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="teacher-profile-field">
              <label>Qualification</label>

              <input
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
              />
            </div>

            <div className="teacher-profile-field">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="teacher-profile-field">
              <label>Phone</label>

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="teacher-profile-form-actions">

              <button
                type="button"
                className="teacher-profile-cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="teacher-profile-save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>

            </div>

          </div>
        ) : (
          <div className="teacher-profile-info-grid">

            <div className="teacher-profile-info-item">
              <span>Full Name</span>
              <strong>{teacher.name}</strong>
            </div>

            <div className="teacher-profile-info-item">
              <span>Teacher ID</span>
              <strong>{teacher.teacherId}</strong>
            </div>

            <div className="teacher-profile-info-item">
              <span>Subject</span>
              <strong>{teacher.subject}</strong>
            </div>

            <div className="teacher-profile-info-item">
              <span>Qualification</span>
              <strong>{teacher.qualification}</strong>
            </div>

            <div className="teacher-profile-info-item">
              <span>Email</span>
              <strong>{teacher.email}</strong>
            </div>

            <div className="teacher-profile-info-item">
              <span>Phone</span>
              <strong>{teacher.phone}</strong>
            </div>

          </div>
        )}

      </div>

      {/* Assigned Batches */}
      <div className="dashboard-panel teacher-profile-batches-panel">

        <div className="panel-header">

          <div>
            <h2>Assigned Batches</h2>

            <p>
              Batches currently assigned to you.
            </p>
          </div>

          <span className="teacher-profile-batch-count">
            {batches.length} Batches
          </span>

        </div>

        <div className="teacher-profile-batch-list">

          {batches.map((batch) => (
            <div
              className="teacher-profile-batch-card"
              key={batch.name}
            >

              <div className="teacher-profile-batch-icon">
                ▦
              </div>

              <div className="teacher-profile-batch-info">

                <h3>{batch.name}</h3>

                <span>
                  {batch.className}
                </span>

              </div>

              <div className="teacher-profile-batch-students">

                <strong>
                  {batch.students}
                </strong>

                <span>
                  Students
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default TeacherProfile;