import { useEffect, useState } from "react";

function StudentNotices() {
  const [showIntro, setShowIntro] = useState(true);

  const notices = [
    {
      title: "Monthly Test Schedule Published",
      description:
        "The monthly test schedule for September has been published. Please check the exam routine carefully.",
      date: "16 September 2026",
      type: "Exam",
    },
    {
      title: "Class Time Changed",
      description:
        "Physics class will start at 10:30 AM instead of 10:00 AM from next Sunday.",
      date: "14 September 2026",
      type: "Class",
    },
    {
      title: "Monthly Fee Payment Reminder",
      description:
        "Students are requested to complete their monthly fee payment within the due date.",
      date: "12 September 2026",
      type: "Fees",
    },
    {
      title: "Holiday Notice",
      description:
        "The coaching center will remain closed on Friday due to the scheduled holiday.",
      date: "10 September 2026",
      type: "General",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* =========================================
          NOTICE PIN BOARD INTRO
      ========================================= */}
      {showIntro && (
        <div className="notice-cinematic-intro">
          <div className="notice-intro-scene">

            {/* Notice Board */}
            <div className="notice-pin-board">

              <div className="notice-board-texture"></div>

              <div className="notice-board-inner">

                {/* Notice Paper */}
                <div className="notice-paper">

                  <div className="notice-paper-heading">
                    NOTICE
                  </div>

                  <div className="notice-paper-line line-one"></div>
                  <div className="notice-paper-line line-two"></div>
                  <div className="notice-paper-line line-three"></div>

                  <div className="notice-paper-date">
                    16 SEP 2026
                  </div>
                </div>

                {/* Push Pin */}
                <div className="notice-push-pin">
                  <div className="notice-pin-head"></div>
                  <div className="notice-pin-point"></div>
                </div>

              </div>
            </div>

            {/* Intro Text */}
            <div className="notice-intro-label">
              <span>IMPORTANT</span>
              <strong>NOTICE</strong>
            </div>

          </div>
        </div>
      )}

      {/* =========================================
          ACTUAL NOTICE PAGE
      ========================================= */}
      <div
        className={`student-page ${
          showIntro
            ? "notice-page-hidden"
            : "notice-page-visible"
        }`}
      >
        {/* Header */}
        <div className="student-page-header">
          <div>
            <h1>Notices</h1>
            <p>Stay updated with the latest announcements.</p>
          </div>
        </div>

        {/* Notice List */}
        <div className="student-notices-section">

          <div className="student-notices-header">
            <div>
              <h2>Latest Notices</h2>
              <p>
                Important announcements from your coaching center
              </p>
            </div>

            <span className="student-notice-count">
              {notices.length} Notices
            </span>
          </div>

          <div className="student-notices-list">

            {notices.map((notice, index) => (
              <div
                className="student-notice-card"
                key={index}
              >
                {/* Notice Icon */}
                <div className="student-notice-icon">
                  !
                </div>

                {/* Notice Content */}
                <div className="student-notice-content">

                  <div className="student-notice-title-row">

                    <h3>{notice.title}</h3>

                    <span className="student-notice-type">
                      {notice.type}
                    </span>

                  </div>

                  <p>{notice.description}</p>

                  <div className="student-notice-date">
                    📅 {notice.date}
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

export default StudentNotices;