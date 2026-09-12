function StudentCourses() {
  const courses = [
    {
      id: 1,
      name: "Physics",
      teacher: "Mr. Rahman",
      schedule: "Sat · 10:00 AM",
      progress: 78,
    },
    {
      id: 2,
      name: "Chemistry",
      teacher: "Ms. Nusrat",
      schedule: "Sun · 11:30 AM",
      progress: 65,
    },
    {
      id: 3,
      name: "Higher Mathematics",
      teacher: "Mr. Karim",
      schedule: "Mon · 10:00 AM",
      progress: 82,
    },
    {
      id: 4,
      name: "Biology",
      teacher: "Dr. Farhan",
      schedule: "Tue · 11:30 AM",
      progress: 70,
    },
  ];

  return (
    <section className="student-dashboard-panel">

      <div className="student-panel-header">
        <div>
          <h2>My Courses</h2>
          <p>Your active courses and learning progress</p>
        </div>

        <span className="student-panel-count">
          {courses.length} Courses
        </span>
      </div>

      <div className="student-course-list">
        {courses.map((course) => (
          <div className="student-course-item" key={course.id}>

            <div className="student-course-info">
              <div className="student-course-icon">
                {course.name.charAt(0)}
              </div>

              <div>
                <h3>{course.name}</h3>
                <p>{course.teacher}</p>
                <small>{course.schedule}</small>
              </div>
            </div>

            <div className="student-course-progress">
              <div className="student-progress-top">
                <span>Progress</span>
                <strong>{course.progress}%</strong>
              </div>

              <div className="student-progress-track">
                <div
                  className="student-progress-fill"
                  style={{
                    width: `${course.progress}%`,
                  }}
                ></div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default StudentCourses;