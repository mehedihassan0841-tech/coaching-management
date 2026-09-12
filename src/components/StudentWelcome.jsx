function StudentWelcome() {
  return (
    <section className="student-welcome">
      <div className="student-welcome-content">
        <span className="student-welcome-label">
          STUDENT DASHBOARD
        </span>

        <h1>Welcome back, Arif! 👋</h1>

        <p>
          Stay on top of your classes, attendance, exams and
          learning progress.
        </p>
      </div>

      <div className="student-welcome-badge">
        <span>Class 10</span>
        <strong>Science</strong>
      </div>
    </section>
  );
}

export default StudentWelcome;