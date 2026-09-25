import { notices } from "../data/mockData";

function StudentNotices() {
  return (
    <section className="student-dashboard-panel">

      <div className="student-panel-header">
        <div>
          <h2>Latest Notices</h2>
          <p>Important announcements from your coaching center</p>
        </div>

        <span className="student-panel-count">
          {notices.length} Notices
        </span>
      </div>

      <div className="student-notice-list">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <div className="student-notice-item" key={notice.id}>

              <div className="student-notice-icon">
                📢
              </div>

              <div className="student-notice-content">
                <div className="student-notice-top">
                  <h3>{notice.title}</h3>

                  <span className="pill pill-muted">
                    {notice.tag}
                  </span>
                </div>

                <p>{notice.body}</p>

                <small>{notice.date}</small>
              </div>

            </div>
          ))
        ) : (
          <div className="student-empty-state">
            <span>📭</span>
            <p>No notices available.</p>
          </div>
        )}
      </div>

    </section>
  );
}

export default StudentNotices;