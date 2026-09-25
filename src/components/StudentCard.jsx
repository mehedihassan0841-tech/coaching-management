function StudentCard({ name, className, subject, status }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="student-card">

      <div className="student-avatar">
        {initials}
      </div>

      <div className="student-info">
        <h3>{name}</h3>
        <p>
          {className} · {subject}
        </p>
      </div>

      <span
        className={
          status === "Active"
            ? "student-status active"
            : "student-status pending"
        }
      >
        {status}
      </span>

    </div>
  );
}

export default StudentCard;