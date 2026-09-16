import { useEffect, useState } from "react";

function StudentExams() {
  const [showIntro, setShowIntro] = useState(true);

  const exams = [
    {
      subject: "Physics",
      exam: "Monthly Test",
      date: "20 September 2026",
      time: "10:00 AM",
      marks: 50,
      status: "Upcoming",
    },
    {
      subject: "Chemistry",
      exam: "Class Test",
      date: "24 September 2026",
      time: "11:00 AM",
      marks: 50,
      status: "Upcoming",
    },
    {
      subject: "Biology",
      exam: "Monthly Test",
      date: "28 September 2026",
      time: "10:00 AM",
      marks: 50,
      status: "Upcoming",
    },
    {
      subject: "Mathematics",
      exam: "Model Test",
      date: "02 October 2026",
      time: "9:30 AM",
      marks: 100,
      status: "Upcoming",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* =========================================
          CINEMATIC EXAM INTRO
      ========================================= */}
      {showIntro && (
        <div className="exam-cinematic-intro">
          <div className="exam-cinematic-scene">

            {/* Ceiling / Lamp Wire */}
            <div className="exam-lamp-wire"></div>

            {/* Vintage Lamp */}
            <div className="exam-vintage-lamp">

              {/* Lamp Shade */}
              <div className="exam-lamp-shade">
                <div className="exam-lamp-top"></div>

                {/* Bulb */}
                <div className="exam-lamp-bulb"></div>
              </div>

              {/* Warm Glow */}
              <div className="exam-lamp-glow"></div>
            </div>

            {/* Pull Cord */}
            <div className="exam-pull-cord">
              <div className="exam-cord-string"></div>
              <div className="exam-cord-handle"></div>
            </div>

            {/* Cinematic Heading */}
            <div className="exam-intro-title">
              <span>YOUR</span>
              <h1>Exams</h1>
              <div className="exam-intro-line"></div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          ACTUAL EXAM PAGE
      ========================================= */}
      <div
        className={`student-page ${
          showIntro ? "exam-page-hidden" : "exam-page-visible"
        }`}
      >
        {/* Page Header */}
        <div className="student-page-header">
          <div>
            <h1>Exams</h1>
            <p>View your upcoming and previous examinations.</p>
          </div>
        </div>

        {/* Exam Summary */}
        <div className="student-exam-summary">
          <div className="student-exam-summary-card">
            <div className="student-exam-summary-icon">📝</div>

            <div>
              <span>Total Exams</span>
              <strong>{exams.length}</strong>
            </div>
          </div>

          <div className="student-exam-summary-card">
            <div className="student-exam-summary-icon">⏰</div>

            <div>
              <span>Upcoming</span>

              <strong>
                {
                  exams.filter(
                    (exam) => exam.status === "Upcoming"
                  ).length
                }
              </strong>
            </div>
          </div>

          <div className="student-exam-summary-card">
            <div className="student-exam-summary-icon">🎯</div>

            <div>
              <span>Total Marks</span>

              <strong>
                {exams.reduce(
                  (total, exam) => total + exam.marks,
                  0
                )}
              </strong>
            </div>
          </div>
        </div>

        {/* Exam List */}
        <div className="student-exam-section">
          <div className="student-exam-section-header">
            <div>
              <h2>Exam Schedule</h2>
              <p>Your upcoming examination routine</p>
            </div>
          </div>

          <div className="student-exam-list">
            {exams.map((exam, index) => (
              <div
                className="student-exam-card"
                key={index}
              >
                {/* Subject Icon */}
                <div className="student-exam-subject-icon">
                  {exam.subject.charAt(0)}
                </div>

                {/* Exam Information */}
                <div className="student-exam-info">
                  <div className="student-exam-title-row">
                    <h3>{exam.subject}</h3>

                    <span className="student-exam-status">
                      {exam.status}
                    </span>
                  </div>

                  <p>{exam.exam}</p>

                  <div className="student-exam-details">
                    <span>📅 {exam.date}</span>
                    <span>🕐 {exam.time}</span>
                    <span>🎯 {exam.marks} Marks</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentExams;