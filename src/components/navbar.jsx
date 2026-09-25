function Navbar({ title, subtitle, onMenuClick }) {
  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onMenuClick} aria-label="Open menu">
          ☰
        </button>
        <div className="mobile-logo">
          <div className="logo-icon">C</div>
          <div>
            <h2>EduCare</h2>
            <span>Coaching Center</span>
          </div>
        </div>
        <div className="page-heading">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className="navbar-right">
        <button className="notification" aria-label="Notifications">
          🔔
          <span></span>
        </button>

        <div className="profile">
          <div className="profile-avatar">MH</div>

          <div className="profile-info">
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>

          <span className="arrow">⌄</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
