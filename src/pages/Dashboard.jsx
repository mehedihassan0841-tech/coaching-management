import { Link } from "react-router-dom";
import {
  students,
  teachers,
  feeRecords,
  notices,
  batches,
} from "../data/mockData";

function Dashboard() {
  /* =========================================================
     BASIC COUNTS
  ========================================================= */

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalBatches = batches.length;

  const paidRecords = feeRecords.filter(
    (fee) => fee.status === "Paid"
  );

  const dueRecords = feeRecords.filter(
    (fee) => fee.status === "Due"
  );

  const paidAmount = paidRecords.reduce(
    (sum, fee) => sum + Number(fee.amount || 0),
    0
  );

  const dueAmount = dueRecords.reduce(
    (sum, fee) => sum + Number(fee.amount || 0),
    0
  );

  const totalFeeAmount = paidAmount + dueAmount;

  const collectionPercentage =
    totalFeeAmount > 0
      ? Math.round((paidAmount / totalFeeAmount) * 100)
      : 0;

  /* =========================================================
     TEACHER SUBJECT DATA
  ========================================================= */

  const subjectMap = {};

  teachers.forEach((teacher) => {
    (teacher.subjects || []).forEach((subject) => {
      subjectMap[subject] = (subjectMap[subject] || 0) + 1;
    });
  });

  const teacherSubjects = Object.entries(subjectMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  /* =========================================================
     STUDENT GROUP DATA
  ========================================================= */

  const groupMap = {};

  students.forEach((student) => {
    const group = student.group || "General";
    groupMap[group] = (groupMap[group] || 0) + 1;
  });

  const studentGroups = Object.entries(groupMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  /* =========================================================
     QUICK ACTIONS
  ========================================================= */

  const quickActions = [
    {
      title: "Add Student",
      text: "Register a new student",
      icon: "👤",
      to: "/students",
    },
    {
      title: "Add Teacher",
      text: "Create teacher profile",
      icon: "🎓",
      to: "/teachers",
    },
    {
      title: "Create Batch",
      text: "Set class & schedule",
      icon: "📚",
      to: "/batches",
    },
    {
      title: "Post Notice",
      text: "Send an announcement",
      icon: "📢",
      to: "/notices",
    },
  ];

  return (
    <div className="dashboard-page">

      {/* =====================================================
          WELCOME
      ===================================================== */}

      <section className="dashboard-welcome">
        <div>
          <span className="dashboard-eyebrow">
            ADMIN OVERVIEW
          </span>

          <h1>Good morning, Admin 👋</h1>

          <p>
            Here is what is happening across your coaching center today.
          </p>
        </div>

        <div className="dashboard-date">
          <span>Today</span>
          <strong>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </strong>
        </div>
      </section>

      {/* =====================================================
          MAIN STATS
      ===================================================== */}

      <section className="dashboard-stats">

        <Link to="/students" className="dashboard-stat-card">
          <div className="stat-card-top">
            <span className="stat-icon">👨‍🎓</span>
            <span className="stat-link">View →</span>
          </div>

          <span className="stat-label">
            Total Students
          </span>

          <strong className="stat-value">
            {totalStudents}
          </strong>

          <small>
            Currently registered
          </small>
        </Link>

        <Link to="/teachers" className="dashboard-stat-card">
          <div className="stat-card-top">
            <span className="stat-icon">👨‍🏫</span>
            <span className="stat-link">View →</span>
          </div>

          <span className="stat-label">
            Total Teachers
          </span>

          <strong className="stat-value">
            {totalTeachers}
          </strong>

          <small>
            Teaching staff
          </small>
        </Link>

        <Link to="/batches" className="dashboard-stat-card">
          <div className="stat-card-top">
            <span className="stat-icon">📚</span>
            <span className="stat-link">View →</span>
          </div>

          <span className="stat-label">
            Active Batches
          </span>

          <strong className="stat-value">
            {totalBatches}
          </strong>

          <small>
            Running schedules
          </small>
        </Link>

        <Link to="/fees" className="dashboard-stat-card">
          <div className="stat-card-top">
            <span className="stat-icon">৳</span>
            <span className="stat-link">View →</span>
          </div>

          <span className="stat-label">
            Fees Collected
          </span>

          <strong className="stat-value stat-money">
            ৳{paidAmount.toLocaleString()}
          </strong>

          <small>
            {paidRecords.length} paid payment
            {paidRecords.length !== 1 ? "s" : ""}
          </small>
        </Link>

      </section>

      {/* =====================================================
          MIDDLE GRID
      ===================================================== */}

      <section className="dashboard-main-grid">

        {/* ---------------------------------------------------
            FEE OVERVIEW
        --------------------------------------------------- */}

        <div className="dashboard-panel dashboard-fee-panel">

          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                FINANCE
              </span>

              <h2>Fee Overview</h2>
            </div>

            <Link to="/fees">
              Manage fees →
            </Link>
          </div>

          <div className="fee-overview-content">

            <div className="fee-total">
              <span>Collected</span>

              <strong>
                ৳{paidAmount.toLocaleString()}
              </strong>

              <small>
                of ৳{totalFeeAmount.toLocaleString()} total
              </small>
            </div>

            <div className="fee-progress-area">

              <div className="fee-progress-label">
                <span>Collection rate</span>
                <strong>{collectionPercentage}%</strong>
              </div>

              <div className="fee-progress">
                <span
                  style={{
                    width: `${collectionPercentage}%`,
                  }}
                />
              </div>

              <div className="fee-mini-stats">

                <div>
                  <span>Paid</span>
                  <strong>
                    {paidRecords.length}
                  </strong>
                </div>

                <div>
                  <span>Due</span>
                  <strong>
                    {dueRecords.length}
                  </strong>
                </div>

                <div>
                  <span>Due amount</span>
                  <strong>
                    ৳{dueAmount.toLocaleString()}
                  </strong>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ---------------------------------------------------
            STUDENT GROUP OVERVIEW
        --------------------------------------------------- */}

        <div className="dashboard-panel">

          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                STUDENTS
              </span>

              <h2>Student Distribution</h2>
            </div>

            <Link to="/students">
              View all →
            </Link>
          </div>

          <div className="distribution-list">

            {studentGroups.length > 0 ? (
              studentGroups.map(([group, count]) => {
                const percentage =
                  totalStudents > 0
                    ? Math.round((count / totalStudents) * 100)
                    : 0;

                return (
                  <div
                    className="distribution-row"
                    key={group}
                  >
                    <div className="distribution-info">
                      <strong>{group}</strong>
                      <span>
                        {count} students
                      </span>
                    </div>

                    <div className="distribution-track">
                      <span
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                    <strong className="distribution-percent">
                      {percentage}%
                    </strong>
                  </div>
                );
              })
            ) : (
              <div className="dashboard-empty">
                No student group data available.
              </div>
            )}

          </div>
        </div>

      </section>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className="dashboard-quick-section">

        <div className="dashboard-section-heading">
          <div>
            <span className="panel-kicker">
              SHORTCUTS
            </span>

            <h2>Quick Actions</h2>
          </div>
        </div>

        <div className="quick-actions">

          {quickActions.map((action) => (
            <Link
              to={action.to}
              className="quick-action-card"
              key={action.title}
            >
              <span className="quick-action-icon">
                {action.icon}
              </span>

              <div>
                <strong>{action.title}</strong>
                <span>{action.text}</span>
              </div>

              <b>→</b>
            </Link>
          ))}

        </div>
      </section>

      {/* =====================================================
          LOWER GRID
      ===================================================== */}

      <section className="dashboard-lower-grid">

        {/* ---------------------------------------------------
            UPCOMING BATCHES
        --------------------------------------------------- */}

        <div className="dashboard-panel">

          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                SCHEDULE
              </span>

              <h2>Upcoming Batches</h2>
            </div>

            <Link to="/batches">
              View all →
            </Link>
          </div>

          <div className="dashboard-list">

            {batches.slice(0, 5).map((batch) => (
              <div
                className="dashboard-list-row"
                key={batch.id}
              >
                <div className="list-leading">

                  <span className="list-icon">
                    📚
                  </span>

                  <div>
                    <strong>
                      {batch.name}
                    </strong>

                    <p>
                      {batch.teacher || "Teacher not assigned"}
                      {" · "}
                      {batch.room || "Room not set"}
                    </p>
                  </div>

                </div>

                <span className="dashboard-pill">
                  {batch.schedule || "Schedule pending"}
                </span>
              </div>
            ))}

            {batches.length === 0 && (
              <div className="dashboard-empty">
                No batches available.
              </div>
            )}

          </div>
        </div>

        {/* ---------------------------------------------------
            RECENT NOTICES
        --------------------------------------------------- */}

        <div className="dashboard-panel">

          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                COMMUNICATION
              </span>

              <h2>Latest Notices</h2>
            </div>

            <Link to="/notices">
              View all →
            </Link>
          </div>

          <div className="dashboard-list">

            {notices.slice(0, 5).map((notice) => (
              <div
                className="dashboard-list-row"
                key={notice.id}
              >
                <div className="list-leading">

                  <span className="notice-dot">
                    ●
                  </span>

                  <div>
                    <strong>
                      {notice.title}
                    </strong>

                    <p>
                      {notice.date}
                    </p>
                  </div>

                </div>

                <span className="dashboard-pill muted">
                  {notice.tag || "Notice"}
                </span>
              </div>
            ))}

            {notices.length === 0 && (
              <div className="dashboard-empty">
                No notices available.
              </div>
            )}

          </div>
        </div>

      </section>

      {/* =====================================================
          TEACHER & SYSTEM OVERVIEW
      ===================================================== */}

      <section className="dashboard-overview-grid">

        {/* Teacher workload */}

        <div className="dashboard-panel">

          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                TEACHING STAFF
              </span>

              <h2>Teacher Subject Overview</h2>
            </div>

            <Link to="/teachers">
              Manage →
            </Link>
          </div>

          <div className="subject-overview">

            {teacherSubjects.length > 0 ? (
              teacherSubjects.map(
                ([subject, count], index) => (
                  <div
                    className="subject-overview-row"
                    key={subject}
                  >
                    <div className="subject-rank">
                      0{index + 1}
                    </div>

                    <div className="subject-info">
                      <strong>{subject}</strong>
                      <span>
                        {count} teacher
                        {count !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="subject-bar">
                      <span
                        style={{
                          width: `${
                            totalTeachers > 0
                              ? Math.min(
                                  100,
                                  (count /
                                    totalTeachers) *
                                    100
                                )
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="dashboard-empty">
                No teacher subject data available.
              </div>
            )}

          </div>
        </div>

        {/* System overview */}

        <div className="dashboard-panel dashboard-system-panel">

          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                SYSTEM
              </span>

              <h2>Center Overview</h2>
            </div>
          </div>

          <div className="system-overview">

            <Link to="/students">
              <span className="system-icon">👨‍🎓</span>
              <div>
                <strong>{totalStudents}</strong>
                <small>Students</small>
              </div>
              <b>→</b>
            </Link>

            <Link to="/teachers">
              <span className="system-icon">👨‍🏫</span>
              <div>
                <strong>{totalTeachers}</strong>
                <small>Teachers</small>
              </div>
              <b>→</b>
            </Link>

            <Link to="/batches">
              <span className="system-icon">📚</span>
              <div>
                <strong>{totalBatches}</strong>
                <small>Active batches</small>
              </div>
              <b>→</b>
            </Link>

            <Link to="/notices">
              <span className="system-icon">📢</span>
              <div>
                <strong>{notices.length}</strong>
                <small>Notices</small>
              </div>
              <b>→</b>
            </Link>

          </div>
        </div>

      </section>

      {/* =====================================================
          BOTTOM INFO
      ===================================================== */}

      <section className="dashboard-footer-note">
        <div>
          <span className="footer-note-icon">
            ✓
          </span>

          <div>
            <strong>
              EduCare Admin Control Center
            </strong>

            <p>
              Manage students, teachers, batches,
              attendance, fees, exams and notices
              from one place.
            </p>
          </div>
        </div>

        <Link to="/attendance">
          Open Attendance →
        </Link>
      </section>

    </div>
  );
}

export default Dashboard;