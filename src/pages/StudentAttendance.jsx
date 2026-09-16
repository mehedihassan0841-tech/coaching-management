import { useEffect, useState } from "react";

function StudentAttendance() {
  const [showIntro, setShowIntro] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* =========================================
          ATTENDANCE CINEMATIC INTRO
      ========================================= */}
      {showIntro && (
        <div className="attendance-cinematic-intro">
          <div className="attendance-intro-scene">

            {/* Digital Calendar */}
            <div className="attendance-calendar">

              {/* Calendar Header */}
              <div className="attendance-calendar-header">
                <div className="attendance-calendar-month">
                  <span>SEPTEMBER</span>
                  <strong>2026</strong>
                </div>

                <div className="attendance-calendar-icon">
                  ✓
                </div>
              </div>

              {/* Calendar Week */}
              <div className="attendance-calendar-week">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>

              {/* Calendar Dates */}
              <div className="attendance-calendar-days">

                <span className="calendar-muted">31</span>

                <span>1</span>
                <span>2</span>

                <span className="attendance-check check-one">
                  3
                  <b>✓</b>
                </span>

                <span>4</span>
                <span>5</span>

                <span className="attendance-check check-two">
                  6
                  <b>✓</b>
                </span>

                <span>7</span>

                <span>8</span>

                <span className="attendance-check check-three">
                  9
                  <b>✓</b>
                </span>

                <span>10</span>
                <span>11</span>
                <span>12</span>

                <span className="attendance-check check-four">
                  13
                  <b>✓</b>
                </span>

                <span>14</span>

                <span className="attendance-today">
                  15
                </span>

                <span>16</span>
                <span>17</span>

                <span className="attendance-check check-five">
                  18
                  <b>✓</b>
                </span>

                <span>19</span>
                <span>20</span>

                <span>21</span>
                <span>22</span>
                <span>23</span>
                <span>24</span>
                <span>25</span>
                <span>26</span>
                <span>27</span>

                <span>28</span>
                <span>29</span>
                <span>30</span>
              </div>
            </div>

            {/* Present Indicator */}
            <div className="attendance-present-indicator">
              <div className="attendance-present-check">
                ✓
              </div>

              <div>
                <span>Attendance</span>
                <strong>Present</strong>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================
          ACTUAL ATTENDANCE PAGE
      ========================================= */}
      <div
        className={`student-page ${
          showIntro
            ? "attendance-page-hidden"
            : "attendance-page-visible"
        }`}
      >
        {/* Page Header */}
        <div className="student-page-header">
          <div>
            <h1>Attendance</h1>
            <p>
              Track your class attendance and attendance percentage.
            </p>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="student-attendance-summary">

          <div className="student-attendance-summary-card">
            <div className="student-attendance-icon">
              📚
            </div>

            <div>
              <span>Total Classes</span>
              <strong>{totalClasses}</strong>
            </div>
          </div>

          <div className="student-attendance-summary-card">
            <div className="student-attendance-icon">
              ✓
            </div>

            <div>
              <span>Present</span>
              <strong>{totalPresent}</strong>
            </div>
          </div>

          <div className="student-attendance-summary-card">
            <div className="student-attendance-icon">
              ✕
            </div>

            <div>
              <span>Absent</span>
              <strong>{totalAbsent}</strong>
            </div>
          </div>

          <div className="student-attendance-summary-card">
            <div className="student-attendance-icon">
              %
            </div>

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
              <p>
                Your attendance performance in each subject
              </p>
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
                        {item.present} present ·{" "}
                        {item.absent} absent
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
                        style={{
                          width: `${percentage}%`,
                        }}
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
    </>
  );
}

export default StudentAttendance;