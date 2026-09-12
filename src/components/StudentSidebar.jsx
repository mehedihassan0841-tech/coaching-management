import { NavLink, useNavigate } from "react-router-dom";

function StudentSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("educareUser");
    navigate("/login");
  }

  return (
    <aside className="student-sidebar">

      {/* Logo */}
      <div className="student-sidebar-brand">
        <div className="student-logo-icon">
          E
        </div>

        <div>
          <h2>EduCare</h2>
          <span>Student Portal</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="student-sidebar-nav">

        <p className="student-nav-title">
          MAIN MENU
        </p>

        <NavLink
          to="/student-dashboard"
          className={({ isActive }) =>
            `student-nav-link ${
              isActive ? "student-nav-link-active" : ""
            }`
          }
        >
          <span className="student-nav-icon">⌂</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/student-courses"
          className={({ isActive }) =>
            `student-nav-link ${
              isActive ? "student-nav-link-active" : ""
            }`
          }
        >
          <span className="student-nav-icon">▣</span>
          <span>My Courses</span>
        </NavLink>

        <NavLink
          to="/student-exams"
          className={({ isActive }) =>
            `student-nav-link ${
              isActive ? "student-nav-link-active" : ""
            }`
          }
        >
          <span className="student-nav-icon">✎</span>
          <span>Exams</span>
        </NavLink>

        <NavLink
          to="/student-attendance"
          className={({ isActive }) =>
            `student-nav-link ${
              isActive ? "student-nav-link-active" : ""
            }`
          }
        >
          <span className="student-nav-icon">◷</span>
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="/student-notices"
          className={({ isActive }) =>
            `student-nav-link ${
              isActive ? "student-nav-link-active" : ""
            }`
          }
        >
          <span className="student-nav-icon">♢</span>
          <span>Notices</span>
        </NavLink>

        <NavLink
          to="/student-fees"
          className={({ isActive }) =>
            `student-nav-link ${
              isActive ? "student-nav-link-active" : ""
            }`
          }
        >
          <span className="student-nav-icon">৳</span>
          <span>Fees</span>
        </NavLink>

      </nav>

      {/* Student Profile */}
      <div className="student-sidebar-profile">

        <div className="student-sidebar-avatar">
          AR
        </div>

        <div className="student-sidebar-user">
          <strong>Arif Rahman</strong>
          <span>Class 10 · Science</span>
        </div>

      </div>

      {/* Logout */}
      <button
        className="student-logout-btn"
        onClick={handleLogout}
      >
        <span className="student-nav-icon">↪</span>
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default StudentSidebar;