import { NavLink } from "react-router-dom";

function BottomNav({ onMoreClick }) {
  return (
    <nav className="bottom-nav">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          "bottom-nav-link" + (isActive ? " bottom-nav-link-active" : "")
        }
      >
        <span className="bottom-nav-icon">▦</span>
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/students"
        className={({ isActive }) =>
          "bottom-nav-link" + (isActive ? " bottom-nav-link-active" : "")
        }
      >
        <span className="bottom-nav-icon">🎓</span>
        <span>Students</span>
      </NavLink>

      <NavLink
        to="/attendance"
        className={({ isActive }) =>
          "bottom-nav-link" + (isActive ? " bottom-nav-link-active" : "")
        }
      >
        <span className="bottom-nav-icon">🗓</span>
        <span>Attend</span>
      </NavLink>

      <NavLink
        to="/fees"
        className={({ isActive }) =>
          "bottom-nav-link" + (isActive ? " bottom-nav-link-active" : "")
        }
      >
        <span className="bottom-nav-icon">৳</span>
        <span>Fees</span>
      </NavLink>

      <button type="button" className="bottom-nav-link" onClick={onMoreClick}>
        <span className="bottom-nav-icon">☰</span>
        <span>More</span>
      </button>
    </nav>
  );
}

export default BottomNav;