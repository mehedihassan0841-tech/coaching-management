import { NavLink } from "react-router-dom";

function TeacherBottomNav({ onMoreClick }) {
  return (
    <nav className="teacher-bottom-nav">

      <NavLink
        to="/teacher-dashboard"
        className={({ isActive }) =>
          isActive
            ? "teacher-bottom-link active"
            : "teacher-bottom-link"
        }
      >
        <span>⌂</span>
        <small>Home</small>
      </NavLink>

      <NavLink
        to="/teacher-batches"
        className={({ isActive }) =>
          isActive
            ? "teacher-bottom-link active"
            : "teacher-bottom-link"
        }
      >
        <span>▦</span>
        <small>Batches</small>
      </NavLink>

      <NavLink
        to="/teacher-attendance"
        className={({ isActive }) =>
          isActive
            ? "teacher-bottom-link active"
            : "teacher-bottom-link"
        }
      >
        <span>✓</span>
        <small>Attendance</small>
      </NavLink>

      <NavLink
        to="/teacher-exams"
        className={({ isActive }) =>
          isActive
            ? "teacher-bottom-link active"
            : "teacher-bottom-link"
        }
      >
        <span>✎</span>
        <small>Exams</small>
      </NavLink>

      <button
        type="button"
        className="teacher-bottom-link teacher-bottom-more"
        onClick={onMoreClick}
      >
        <span>☰</span>
        <small>More</small>
      </button>

    </nav>
  );
}

export default TeacherBottomNav;