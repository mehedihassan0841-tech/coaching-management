
import { useEffect, useState } from "react";

function StudentCourses() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Mobile Intro Animation */}
      {showIntro && (
        <div className="student-course-intro">
          <div className="student-course-intro-content">
            <div className="student-course-intro-icon">
              📚
            </div>

            <h1>My Courses</h1>

            <div className="student-course-intro-line"></div>

            <p>Your learning journey starts here</p>
          </div>
        </div>
      )}

      {/* Main Courses Page */}
      <div
        className={`student-page ${
          showIntro ? "student-course-page-hidden" : ""
        }`}
      >
        <div className="student-page-header">
          <div>
            <h1>My Courses</h1>
            <p>View all your enrolled courses.</p>
          </div>
        </div>

        <div className="student-course-grid">
          <div className="student-course-card">
            <h3>Physics</h3>
            <p>Teacher: Mr. Rahman</p>
            <span>Batch: Morning</span>
          </div>

          <div className="student-course-card">
            <h3>Chemistry</h3>
            <p>Teacher: Ms. Sultana</p>
            <span>Batch: Morning</span>
          </div>

          <div className="student-course-card">
            <h3>Biology</h3>
            <p>Teacher: Mr. Karim</p>
            <span>Batch: Evening</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentCourses;

