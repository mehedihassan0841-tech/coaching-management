import { useState } from "react";
import { notices as initialNotices } from "../data/mockData";
import "../styles/admin-notices.css";

const noticeTypeSuggestions = [
  "Exam Result",
  "Exam",
  "Holiday",
  "Class Routine",
  "Fee",
  "Assignment",
  "Class Test",
  "Special Announcement",
  "General",
];

const monthOptions = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Notices() {
  const [notices, setNotices] = useState(initialNotices);

  const [showModal, setShowModal] = useState(false);

  const [activeTypeSuggestion, setActiveTypeSuggestion] =
    useState(false);

  const [selectedMonth, setSelectedMonth] =
    useState("All Months");

  const [search, setSearch] = useState({
    className: "",
    section: "",
    group: "",
    teacher: "",
    type: "",
  });

  const [form, setForm] = useState({
    title: "",
    body: "",
    type: "",
    className: "",
    section: "",
    group: "",
    teacher: "",
    examName: "",
  });

  const filteredNotices = notices.filter((notice) => {
    const dateText = String(notice.date || "");

    const noticeMonth =
      dateText
        ? new Date(dateText).toLocaleString("en-US", {
            month: "long",
          })
        : "";

    const monthMatch =
      selectedMonth === "All Months" ||
      noticeMonth.toLowerCase() === selectedMonth.toLowerCase();

    const classMatch =
      !search.className.trim() ||
      String(notice.className || "")
        .toLowerCase()
        .includes(search.className.trim().toLowerCase());

    const sectionMatch =
      !search.section.trim() ||
      String(notice.section || "")
        .toLowerCase()
        .includes(search.section.trim().toLowerCase());

    const groupMatch =
      !search.group.trim() ||
      String(notice.group || "")
        .toLowerCase()
        .includes(search.group.trim().toLowerCase());

    const teacherMatch =
      !search.teacher.trim() ||
      String(notice.teacher || "")
        .toLowerCase()
        .includes(search.teacher.trim().toLowerCase());

    const typeMatch =
      !search.type.trim() ||
      `${notice.type || ""} ${notice.tag || ""} ${notice.title || ""}`
        .toLowerCase()
        .includes(search.type.trim().toLowerCase());

    return (
      monthMatch &&
      classMatch &&
      sectionMatch &&
      groupMatch &&
      teacherMatch &&
      typeMatch
    );
  });

  const totalNotices = notices.length;

  const examNotices = notices.filter((notice) =>
    `${notice.type || ""} ${notice.tag || ""} ${notice.title || ""}`
      .toLowerCase()
      .includes("exam")
  ).length;

  const holidayNotices = notices.filter((notice) =>
    `${notice.type || ""} ${notice.tag || ""} ${notice.title || ""}`
      .toLowerCase()
      .includes("holiday")
  ).length;

  const teacherNotices = notices.filter(
    (notice) => notice.teacher
  ).length;

  function handleAdd(e) {
    e.preventDefault();

    if (!form.title.trim() || !form.body.trim()) {
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    const newNotice = {
      id: Date.now(),
      title: form.title.trim(),
      body: form.body.trim(),

      type: form.type.trim() || "General",

      tag: form.type.trim() || "General",

      className: form.className.trim(),
      section: form.section.trim(),
      group: form.group.trim(),

      teacher: form.teacher.trim(),

      examName: form.examName.trim(),

      date: today,
    };

    setNotices((prev) => [newNotice, ...prev]);

    setForm({
      title: "",
      body: "",
      type: "",
      className: "",
      section: "",
      group: "",
      teacher: "",
      examName: "",
    });

    setShowModal(false);
  }

  return (
    <div className="page-block">
      <div className="students-container notices-page">

        {/* HEADER */}
        <div className="students-container-header notices-header">
          <div>
            <span className="notices-kicker">
              COMMUNICATION CENTER
            </span>

            <h2>Notices & Announcements</h2>

            <p>
              Monitor class, exam, result, holiday and teacher
              announcements from one place.
            </p>
          </div>

          <button
            className="add-student-btn"
            onClick={() => setShowModal(true)}
          >
            + New Notice
          </button>
        </div>

        {/* STAT CARDS */}
        <div className="notice-stat-grid">

          <div className="notice-stat-card">
            <div className="notice-stat-icon">📣</div>
            <span>Total Notices</span>
            <strong>{totalNotices}</strong>
            <small>All announcements</small>
          </div>

          <div className="notice-stat-card exam">
            <div className="notice-stat-icon">📝</div>
            <span>Exam Notices</span>
            <strong>{examNotices}</strong>
            <small>Exam & result updates</small>
          </div>

          <div className="notice-stat-card holiday">
            <div className="notice-stat-icon">🌴</div>
            <span>Holiday Notices</span>
            <strong>{holidayNotices}</strong>
            <small>Holiday announcements</small>
          </div>

          <div className="notice-stat-card teacher">
            <div className="notice-stat-icon">🧑‍🏫</div>
            <span>Teacher Notices</span>
            <strong>{teacherNotices}</strong>
            <small>Published by teachers</small>
          </div>

        </div>

        {/* FILTER PANEL */}
        <section className="notice-filter-panel">

          <div className="notice-filter-heading">
            <div>
              <span>NOTICE EXPLORER</span>
              <h3>Find any announcement</h3>
            </div>

            <select
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(e.target.value)
              }
            >
              {monthOptions.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select>
          </div>

          <div className="notice-search-grid">

            {/* NOTICE TYPE */}
            <div className="notice-search-field suggestion-field">
              <input
                type="text"
                placeholder="Notice Type..."
                value={search.type}
                onFocus={() => setActiveTypeSuggestion(true)}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    type: e.target.value,
                  })
                }
              />

              {activeTypeSuggestion &&
                search.type.trim() && (
                  <div className="notice-suggestions">
                    {noticeTypeSuggestions
                      .filter((item) =>
                        item
                          .toLowerCase()
                          .includes(search.type.toLowerCase())
                      )
                      .map((item) => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => {
                            setSearch({
                              ...search,
                              type: item,
                            });

                            setActiveTypeSuggestion(false);
                          }}
                        >
                          {item}
                        </button>
                      ))}
                  </div>
                )}
            </div>

            <div className="notice-search-field">
              <input
                type="text"
                placeholder="Class..."
                value={search.className}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    className: e.target.value,
                  })
                }
              />
            </div>

            <div className="notice-search-field">
              <input
                type="text"
                placeholder="Section..."
                value={search.section}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    section: e.target.value,
                  })
                }
              />
            </div>

            <div className="notice-search-field">
              <input
                type="text"
                placeholder="Group..."
                value={search.group}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    group: e.target.value,
                  })
                }
              />
            </div>

            <div className="notice-search-field">
              <input
                type="text"
                placeholder="Teacher..."
                value={search.teacher}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    teacher: e.target.value,
                  })
                }
              />
            </div>

          </div>
        </section>

        {/* NOTICE LIST */}
        <section className="notice-feed">

          <div className="notice-feed-header">
            <div>
              <span>NOTICE FEED</span>
              <h3>Published Announcements</h3>
            </div>

            <div className="notice-result-count">
              {filteredNotices.length} Results
            </div>
          </div>

          <div className="notice-list">

            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <article
                  className="notice-card"
                  key={notice.id}
                >

                  <div className="notice-card-accent"></div>

                  <div className="notice-card-main">

                    <div className="notice-card-top">

                      <div className="notice-title-area">

                        <div className="notice-pin">
                          📌
                        </div>

                        <div>
                          <h3>{notice.title}</h3>

                          <div className="notice-meta-line">

                            <span>
                              {notice.date}
                            </span>

                            {notice.teacher && (
                              <>
                                <i>•</i>

                                <span>
                                  By {notice.teacher}
                                </span>
                              </>
                            )}

                          </div>
                        </div>

                      </div>

                      <span className="notice-type-badge">
                        {notice.type ||
                          notice.tag ||
                          "General"}
                      </span>

                    </div>

                    <p className="notice-body">
                      {notice.body}
                    </p>

                    <div className="notice-context">

                      {notice.className && (
                        <span>
                          <b>Class</b>
                          {notice.className}
                        </span>
                      )}

                      {notice.section && (
                        <span>
                          <b>Section</b>
                          {notice.section}
                        </span>
                      )}

                      {notice.group && (
                        <span>
                          <b>Group</b>
                          {notice.group}
                        </span>
                      )}

                      {notice.examName && (
                        <span>
                          <b>Exam</b>
                          {notice.examName}
                        </span>
                      )}

                    </div>

                  </div>

                </article>
              ))
            ) : (
              <div className="notice-empty">
                <div>📭</div>

                <h3>No notices found</h3>

                <p>
                  Try changing your month or search filters.
                </p>
              </div>
            )}

          </div>

        </section>

      </div>

      {/* CREATE NOTICE MODAL */}
      {showModal && (
        <div
          className="modal-backdrop notice-modal-backdrop"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal notice-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="notice-modal-header">
              <div>
                <span>COMMUNICATION</span>
                <h2>Create Notice</h2>
                <p>
                  Publish an announcement for a specific
                  class, section or group.
                </p>
              </div>

              <button
                type="button"
                className="notice-modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAdd}>

              <div className="notice-form-grid">

                <label>
                  Notice Title

                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g. Physics CT-03 Result Published"
                    autoFocus
                  />
                </label>

                <label>
                  Notice Type

                  <input
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value,
                      })
                    }
                    placeholder="e.g. Exam Result, Holiday..."
                  />
                </label>

                <label>
                  Class

                  <input
                    value={form.className}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        className: e.target.value,
                      })
                    }
                    placeholder="e.g. Class 10"
                  />
                </label>

                <label>
                  Section

                  <input
                    value={form.section}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        section: e.target.value,
                      })
                    }
                    placeholder="e.g. A / Morning / Red"
                  />
                </label>

                <label>
                  Group

                  <input
                    value={form.group}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        group: e.target.value,
                      })
                    }
                    placeholder="e.g. Science / Humanities"
                  />
                </label>

                <label>
                  Teacher

                  <input
                    value={form.teacher}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        teacher: e.target.value,
                      })
                    }
                    placeholder="Teacher name"
                  />
                </label>

                <label className="notice-form-full">
                  Related Exam

                  <input
                    value={form.examName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        examName: e.target.value,
                      })
                    }
                    placeholder="Optional — e.g. Physics CT-03"
                  />
                </label>

                <label className="notice-form-full">
                  Details

                  <textarea
                    rows="5"
                    value={form.body}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        body: e.target.value,
                      })
                    }
                    placeholder="Write the notice details..."
                  />
                </label>

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                >
                  Publish Notice
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
    </div>
  );
}

export default Notices;