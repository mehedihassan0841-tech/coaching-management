import { useLocation, useNavigate } from "react-router-dom";

function TeacherNavbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const pageMeta = {
    "/teacher-dashboard": {
      title: "Teacher Dashboard",
      subtitle: "Manage your classes, students and academic activities.",
    },
    "/teacher-batches": {
      title: "My Batches",
      subtitle: "View and manage your assigned batches.",
    },
    "/teacher-students": {
      title: "My Students",
      subtitle: "View students from your assigned batches.",
    },
    "/teacher-attendance": {
      title: "Attendance",
      subtitle: "Track and manage student attendance.",
    },
    "/teacher-exams": {
      title: "Exams & Results",
      subtitle: "Manage exams and student performance.",
    },
    "/teacher-assignments": {
      title: "Assignments",
      subtitle: "Create and manage student assignments.",
    },
    "/teacher-notices": {
      title: "Notices",
      subtitle: "Share important announcements with students.",
    },
    "/teacher-profile": {
      title: "Profile",
      subtitle: "Manage your teacher profile.",
    },
  };

  const meta = pageMeta[location.pathname] || {
    title: "Teacher Portal",
    subtitle: "Welcome to EduCare Teacher Portal.",
  };

  return (
    <header className="teacher-navbar">

      {/* Left */}
      <div className="teacher-navbar-left">

        <button
          type="button"
          className="teacher-menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          ☰
        </button>

        <div className="teacher-page-heading">
          <h1>{meta.title}</h1>
          <p>{meta.subtitle}</p>
        </div>

      </div>

      {/* Right */}
      <div className="teacher-navbar-right">

        <button
          type="button"
          className="teacher-notification-btn"
          aria-label="Notifications"
        >
          🔔
          <span className="teacher-notification-dot"></span>
        </button>

        <button
          type="button"
          className="teacher-profile-btn"
          onClick={() => navigate("/teacher-profile")}
        >
          <div className="teacher-navbar-avatar">
            MR
          </div>

          <div className="teacher-navbar-user">
            <strong>Mr. Rahman</strong>
            <span>Physics Teacher</span>
          </div>

          <span className="teacher-profile-arrow">
            ▾
          </span>
        </button>

      </div>

    </header>
  );
}

export default TeacherNavbar;