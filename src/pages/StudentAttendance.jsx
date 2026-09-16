
function StudentAttendance() {
  const attendanceData = [
    {
      subject: "Physics",
      total: 20,
      present: 18,
      absent: 2,
    },
    {
      subject: "Chemistry",
      total: 18,
      present: 16,
      absent: 2,
    },
    {
      subject: "Biology",
      total: 22,
      present: 21,
      absent: 1,
    },
    {
      subject: "Mathematics",
      total: 20,
      present: 17,
      absent: 3,
    },
  ];

  const totalClasses = attendanceData.reduce(
    (total, item) => total + item.total,
    0
  );

  const totalPresent = attendanceData.reduce(
    (total, item) => total + item.present,
    0
  );

  const totalAbsent = attendanceData.reduce(
    (total, item) => total + item.absent,
    0
  );

  const overallPercentage = Math.round(
    (totalPresent / totalClasses) * 100
  );

  return (
    <div className="student-page">
      {/* Page Header */}
      <div className="student-page-header">
        <div>
          <h1>Attendance</h1>
          <p>Track your class attendance and attendance percentage.</p>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="student-attendance-summary">
        <div className="student-attendance-summary-card">
          <div className="student-attendance-icon">📚</div>

          <div>
            <span>Total Classes</span>
            <strong>{totalClasses}</strong>
          </div>
        </div>

        <div className="student-attendance-summary-card">
          <div className="student-attendance-icon">✓</div>

          <div>
            <span>Present</span>
            <strong>{totalPresent}</strong>
          </div>
        </div>

        <div className="student-attendance-summary-card">
          <div className="student-attendance-icon">✕</div>

          <div>
            <span>Absent</span>
            <strong>{totalAbsent}</strong>
          </div>
        </div>

        <div className="student-attendance-summary-card">
          <div className="student-attendance-icon">%</div>

          <div>
            <span>Overall Attendance</span>
            <strong>{overallPercentage}%</strong>
          </div>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="student-attendance-section">
        <div className="student-attendance-section-header">
          <div>
            <h2>Subject-wise Attendance</h2>
            <p>Your attendance performance in each subject</p>
          </div>
        </div>

        <div className="student-attendance-list">
          {attendanceData.map((item, index) => {
            const percentage = Math.round(
              (item.present / item.total) * 100
            );

            return (
              <div
                className="student-attendance-card"
                key={index}
              >
                {/* Subject */}
                <div className="student-attendance-subject">
                  <div className="student-attendance-subject-icon">
                    {item.subject.charAt(0)}
                  </div>

                  <div>
                    <h3>{item.subject}</h3>
                    <p>
                      {item.present} present · {item.absent} absent
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="student-attendance-progress-area">
                  <div className="student-attendance-progress-top">
                    <span>Attendance</span>
                    <strong>{percentage}%</strong>
                  </div>

                  <div className="student-attendance-progress">
                    <div
                      className="student-attendance-progress-bar"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Classes */}
                <div className="student-attendance-classes">
                  <span>{item.total}</span>
                  <small>Total</small>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StudentAttendance;

