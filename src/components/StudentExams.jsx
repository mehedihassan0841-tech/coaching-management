import { exams } from "../data/mockData";

function StudentExams() {
  const upcomingExams = exams.filter(
    (exam) => exam.status !== "Completed"
  );

  return (
    <section className="student-dashboard-panel">

      <div className="student-panel-header">
        <div>
          <h2>Upcoming Exams</h2>
          <p>Keep track of your upcoming exams</p>
        </div>

        <span className="student-panel-count">
          {upcomingExams.length} Upcoming
        </span>
      </div>

      <div className="student-exam-list">
        {upcomingExams.length > 0 ? (
          upcomingExams.map((exam) => (
            <div className="student-exam-item" key={exam.id}>

              <div className="student-exam-date">
                <span>
                  {new Date(exam.date).toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </span>

                <strong>
                  {new Date(exam.date).getDate()}
                </strong>
              </div>

              <div className="student-exam-info">
                <h3>{exam.name}</h3>

                <p>
                  {exam.subject} · {exam.className}
                </p>

                <small>{exam.date}</small>
              </div>

              <span className="badge badge-pending">
                Upcoming
              </span>

            </div>
          ))
        ) : (
          <div className="student-empty-state">
            <span>🎉</span>
            <p>No upcoming exams.</p>
          </div>
        )}
      </div>

    </section>
  );
}

export default StudentExams;