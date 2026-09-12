import { useNavigate } from "react-router-dom";

function StudentNavbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("educareUser");
    navigate("/login");
  }

  return (
    <header className="student-navbar">

      <div className="student-navbar-left">
        <div className="student-mobile-logo">
          E
        </div>

        <div>
          <h1>Student Dashboard</h1>
          <p>Welcome back, Arif. Here's your learning overview.</p>
        </div>
      </div>

      <div className="student-navbar-right">

        <button
          className="student-notification-btn"
          type="button"
          aria-label="Notifications"
        >
          🔔
          <span className="student-notification-dot"></span>
        </button>

        <div className="student-navbar-user">
          <div className="student-navbar-avatar">
            AR
          </div>

          <div className="student-navbar-user-info">
            <strong>Arif Rahman</strong>
            <span>Class 10 · Science</span>
          </div>
        </div>

        <button
          className="student-navbar-logout"
          onClick={handleLogout}
          type="button"
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default StudentNavbar;