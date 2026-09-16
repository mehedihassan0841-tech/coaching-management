function StudentCourses() {
  return (
    <div className="student-page">
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
  );
}

export default StudentCourses;