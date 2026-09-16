import { NavLink, useNavigate } from "react-router-dom";

function StudentSidebar({ open, onClose }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("educareUser");
    navigate("/login");
  }

  return (
    <>
      <aside className={`student-sidebar ${open ? "student-sidebar-open" : ""}`}>

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
            onClick={onClose}
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
            onClick={onClose}
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
            onClick={onClose}
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
            onClick={onClose}
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
            onClick={onClose}
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
            onClick={onClose}
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

      {open && <div className="student-sidebar-backdrop" onClick={onClose}></div>}
    </>
  );
}

export default StudentSidebar;