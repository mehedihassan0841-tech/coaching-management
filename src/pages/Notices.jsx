import { useState } from "react";
import { notices as initialNotices } from "../data/mockData";

function Notices() {
  const [notices, setNotices] = useState(initialNotices);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", tag: "General" });

  function handleAdd(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setNotices([
      { id: notices.length + 1, ...form, date: "2026-09-12" },
      ...notices,
    ]);
    setForm({ title: "", body: "", tag: "General" });
    setShowModal(false);
  }

  return (
    <div className="page-block">
      <div className="students-container">
        <div className="students-container-header">
          <div>
            <h2>Notices</h2>
            <p>Announcements for students and staff</p>
          </div>
          <button className="add-student-btn" onClick={() => setShowModal(true)}>+ New Notice</button>
        </div>

        <div className="notice-list">
          {notices.map((n) => (
            <div className="notice-card" key={n.id}>
              <div className="notice-card-top">
                <h3>{n.title}</h3>
                <span className="pill pill-muted">{n.tag}</span>
              </div>
              <p>{n.body}</p>
              <small>{n.date}</small>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Post a Notice</h2>
            <form onSubmit={handleAdd}>
              <label>
                Title
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Notice title" autoFocus />
              </label>
              <label>
                Details
                <textarea rows="3" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Write the notice details..."></textarea>
              </label>
              <label>
                Tag
                <select value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}>
                  <option>General</option>
                  <option>Exam</option>
                  <option>Fees</option>
                  <option>Holiday</option>
                </select>
              </label>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notices;
