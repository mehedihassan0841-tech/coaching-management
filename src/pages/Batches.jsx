import { batches } from "../data/mockData";

function Batches() {
  return (
    <div className="page-block">
      <div className="students-container">
        <div className="students-container-header">
          <div>
            <h2>All Batches</h2>
            <p>Classes grouped by schedule and teacher</p>
          </div>
          <button className="add-student-btn">+ Create Batch</button>
        </div>

        <div className="batch-grid">
          {batches.map((batch) => (
            <div className="batch-card" key={batch.id}>
              <div className="batch-card-top">
                <h3>{batch.name}</h3>
                <span className="pill">{batch.room}</span>
              </div>
              <p className="batch-teacher">Taught by {batch.teacher}</p>
              <div className="batch-meta">
                <div>
                  <span>Students</span>
                  <strong>{batch.students}</strong>
                </div>
                <div>
                  <span>Schedule</span>
                  <strong>{batch.schedule}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Batches;
