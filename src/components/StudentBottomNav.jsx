import { NavLink } from "react-router-dom";

function StudentBottomNav({ onMoreClick }) {
  return (
    <nav className="student-bottom-nav">
      <NavLink
        to="/student-dashboard"
        end
        className={({ isActive }) =>
          "student-bottom-nav-link" + (isActive ? " student-bottom-nav-link-active" : "")
        }
      >
        <span className="student-bottom-nav-icon">⌂</span>
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/student-courses"
        className={({ isActive }) =>
          "student-bottom-nav-link" + (isActive ? " student-bottom-nav-link-active" : "")
        }
      >
        <span className="student-bottom-nav-icon">▣</span>
        <span>Courses</span>
      </NavLink>

      <NavLink
        to="/student-attendance"
        className={({ isActive }) =>
          "student-bottom-nav-link" + (isActive ? " student-bottom-nav-link-active" : "")
        }
      >
        <span className="student-bottom-nav-icon">◷</span>
        <span>Attend</span>
      </NavLink>

      <NavLink
        to="/student-fees"
        className={({ isActive }) =>
          "student-bottom-nav-link" + (isActive ? " student-bottom-nav-link-active" : "")
        }
      >
        <span className="student-bottom-nav-icon">৳</span>
        <span>Fees</span>
      </NavLink>

      <button type="button" className="student-bottom-nav-link" onClick={onMoreClick}>
        <span className="student-bottom-nav-icon">☰</span>
        <span>More</span>
      </button>
    </nav>
  );
}

export default StudentBottomNav;