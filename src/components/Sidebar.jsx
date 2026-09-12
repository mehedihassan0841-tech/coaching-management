import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: "▦", end: true },
  { to: "/students", label: "Students", icon: "🎓" },
  { to: "/teachers", label: "Teachers", icon: "🧑‍🏫" },
  { to: "/batches", label: "Batches", icon: "📚" },
  { to: "/attendance", label: "Attendance", icon: "🗓" },
  { to: "/fees", label: "Fees", icon: "৳" },
  { to: "/exams", label: "Exams", icon: "📝" },
  { to: "/notices", label: "Notices", icon: "📣" },
];

function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="logo-icon">C</div>
          <div>
            <h2>EduCare</h2>
            <span>Coaching Center</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                "sidebar-link" + (isActive ? " sidebar-link-active" : "")
              }
              onClick={onClose}
            >
              <span className="sidebar-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/login" className="sidebar-link" onClick={onClose}>
            <span className="sidebar-icon">⏻</span>
            Log out
          </NavLink>
        </div>
      </aside>

      {open && <div className="sidebar-backdrop" onClick={onClose}></div>}
    </>
  );
}

export default Sidebar;
