import { NavLink, useNavigate } from "react-router-dom";
import "../styles/teacher-sidebar.css";

function TeacherSidebar({ open, onClose }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("educareUser");
    navigate("/login");
  }

  function handleNavClick() {
    if (onClose) {
      onClose();
    }
  }

  return (
    <aside
      className={`teacher-sidebar ${
        open ? "teacher-sidebar-open" : ""
      }`}
    >
      {/* Logo */}
      <div className="teacher-sidebar-logo">
        <div className="teacher-logo-mark">
          EC
        </div>

        <div>
          <h2>EduCare</h2>
          <span>Teacher Portal</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="teacher-sidebar-nav">

        <NavLink
          to="/teacher-dashboard"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? "teacher-nav-link active" : "teacher-nav-link"
          }
        >
          <span className="teacher-nav-icon">⌂</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/teacher-batches"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? "teacher-nav-link active" : "teacher-nav-link"
          }
        >
          <span className="teacher-nav-icon">▦</span>
          <span>My Batches</span>
        </NavLink>

        <NavLink
          to="/teacher-students"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? "teacher-nav-link active" : "teacher-nav-link"
          }
        >
          <span className="teacher-nav-icon">♙</span>
          <span>My Students</span>
        </NavLink>

        <NavLink
          to="/teacher-attendance"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? "teacher-nav-link active" : "teacher-nav-link"
          }
        >
          <span className="teacher-nav-icon">✓</span>
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="/teacher-exams"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? "teacher-nav-link active" : "teacher-nav-link"
          }
        >
          <span className="teacher-nav-icon">✎</span>
          <span>Exams & Results</span>
        </NavLink>

        <NavLink
          to="/teacher-assignments"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? "teacher-nav-link active" : "teacher-nav-link"
          }
        >
          <span className="teacher-nav-icon">▤</span>
          <span>Assignments</span>
        </NavLink>

        <NavLink
          to="/teacher-notices"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? "teacher-nav-link active" : "teacher-nav-link"
          }
        >
          <span className="teacher-nav-icon">!</span>
          <span>Notices</span>
        </NavLink>

        <NavLink
          to="/teacher-profile"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? "teacher-nav-link active" : "teacher-nav-link"
          }
        >
          <span className="teacher-nav-icon">♙</span>
          <span>Profile</span>
        </NavLink>

      </nav>

      {/* Bottom */}
      <div className="teacher-sidebar-bottom">

        <div className="teacher-sidebar-user">
          <div className="teacher-avatar">
            MR
          </div>

          <div>
            <strong>Mr. Rahman</strong>
            <span>Physics Teacher</span>
          </div>
        </div>

        <button
          type="button"
          className="teacher-logout-btn"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </div>
    </aside>
  );
}

export default TeacherSidebar;