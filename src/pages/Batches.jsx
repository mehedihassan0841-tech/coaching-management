import { useState } from "react";
import { batches as initialBatches } from "../data/mockData";
import "../styles/admin-batches.css";

const classOptions = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const batchOptions = [
  "Batch A",
  "Batch B",
  "Batch C",
  "Batch D",
];

const sectionOptions = [
  "Science",
  "Commerce",
  "Arts",
  "Others",
];

function Batches() {
  const [batchList, setBatchList] = useState(initialBatches);

  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState({
    className: "",
    section: "",
    subject: "",
    shift: "",
  });

const [form, setForm] = useState({
  className: "Class 8",
  batch: "Batch A",
  section: "Science",
  teacher: "",
  room: "",
  shift: "Morning",
  schedule: [],
  subject: "",
});

  const filteredBatches = batchList.filter((batch) => {
  const classText = (
    batch.className ||
    batch.class ||
    batch.name ||
    ""
  ).toLowerCase();

  const sectionText = (
    batch.section ||
    ""
  ).toLowerCase();

  const subjectText = (
    batch.subject ||
    batch.section ||
    ""
  ).toLowerCase();

  const shiftText = (
    batch.shift ||
    ""
  ).toLowerCase();

  const classMatch =
    !search.className.trim() ||
    classText.includes(search.className.trim().toLowerCase());

  const sectionMatch =
    !search.section.trim() ||
    sectionText.includes(search.section.trim().toLowerCase());

  const subjectMatch =
    !search.subject.trim() ||
    subjectText.includes(search.subject.trim().toLowerCase());

  const shiftMatch =
    !search.shift.trim() ||
    shiftText.includes(search.shift.trim().toLowerCase());

  return (
    classMatch &&
    sectionMatch &&
    subjectMatch &&
    shiftMatch
  );
});

  function handleCreateBatch(e) {
    e.preventDefault();

    if (
      !form.className ||
      !form.batch ||
      !form.section ||
      !form.teacher.trim() ||
      !form.room.trim() ||
      form.schedule.length === 0
    ) {
      return;
    }

    const newBatch = {
      id: Date.now(),
      name: `${form.className} ${form.batch}`,
      className: form.className,
      batch: form.batch,
      section: form.section,
      subject: form.subject || form.section,
      teacher: form.teacher.trim(),
      room: form.room.trim(),
      shift: form.shift,
      schedule: form.schedule.join(", "),
      students: 0,
    };

    setBatchList((prev) => [...prev, newBatch]);

    setForm({
      className: "Class 8",
      batch: "Batch A",
      section: "Science",
      teacher: "",
      room: "",
      schedule: [],
      subject: "",
    });

    setShowModal(false);
  }

  return (
    <div className="page-block">

      <div className="students-container">

        {/* HEADER */}
        <div className="students-container-header">

          <div>
            <h2>All Batches</h2>
            <p>Classes grouped by schedule and teacher</p>
          </div>

          <div className="batch-header-actions">

            <button
              className="add-student-btn"
              onClick={() => setShowModal(true)}
            >
              + Create Batch
            </button>

            <div className="batch-searches">

              <input
                type="text"
                placeholder="Search Class..."
                className="student-search"
                value={search.className}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    className: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Search Section..."
                className="student-search"
                value={search.section}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    section: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Search Subject..."
                className="student-search"
                value={search.subject}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    subject: e.target.value,
                  })
                }
              />
              <input
                  type="text"
                  placeholder="Search Shift..."
                  className="student-search"
                  value={search.shift}
                  onChange={(e) =>
                    setSearch({
                      ...search,
                      shift: e.target.value,
                    })
                  }
                />

            </div>

          </div>
        </div>


        {/* BATCH LIST */}
        <div className="batch-grid">

          {filteredBatches.length > 0 ? (

            filteredBatches.map((batch) => (

              <div
                className="batch-card"
                key={batch.id}
              >

                <div className="batch-card-top">

                  <h3>{batch.name}</h3>

                  <span className="pill">
                    {batch.room}
                  </span>

                </div>

                <p className="batch-teacher">
                  Taught by {batch.teacher}
                </p>

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

            ))

          ) : (

            <p className="empty-state">
              No batch found.
            </p>

          )}

        </div>

      </div>


      {/* CREATE BATCH MODAL */}
      {showModal && (

        <div
          className="modal-backdrop"
          onClick={() => setShowModal(false)}
        >

          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <h2>Create New Batch</h2>

            <form onSubmit={handleCreateBatch}>

              {/* CLASS */}
              <label>
                Class

                <select
                  value={form.className}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      className: e.target.value,
                    })
                  }
                >

                  {classOptions.map((item) => (
                    <option key={item}>
                      {item}
                    </option>
                  ))}

                </select>
              </label>


              {/* BATCH */}
              <label>
                Batch

                <select
                  value={form.batch}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      batch: e.target.value,
                    })
                  }
                >

                  {batchOptions.map((item) => (
                    <option key={item}>
                      {item}
                    </option>
                  ))}

                </select>
              </label>


              {/* SECTION */}
              <label>
                Section

                <select
                  value={form.section}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      section: e.target.value,
                    })
                  }
                >

                  {sectionOptions.map((item) => (
                    <option key={item}>
                      {item}
                    </option>
                  ))}

                </select>
              </label>


              {/* TEACHER */}
              <label>
                Class Teacher Name

                <input
                  type="text"
                  placeholder="e.g. Mr. Rahman"
                  value={form.teacher}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      teacher: e.target.value,
                    })
                  }
                />

              </label>


              {/* ROOM */}
              <label>
                Room Number

                <input
                  type="text"
                  placeholder="e.g. Room 204"
                  value={form.room}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      room: e.target.value,
                    })
                  }
                />

              </label>
              <label>
                    Shift

                    <select
                      value={form.shift}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          shift: e.target.value,
                        })
                      }
                    >
                      <option>Morning</option>
                      <option>Day</option>
                      <option>Evening</option>
                    </select>
                  </label>


              {/* SCHEDULE */}
              <label>
                Schedule

<div className="schedule-section">

  <label>Schedule Days</label>

  <div className="day-options">

    {[
      "Everyday",
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ].map((day) => (
      <label key={day} className="day-option">
        <input
          type="checkbox"
          checked={form.schedule.includes(day)}
          onChange={(e) => {
            if (e.target.checked) {
              setForm({
                ...form,
                schedule: [...form.schedule, day],
              });
            } else {
              setForm({
                ...form,
                schedule: form.schedule.filter(
                  (item) => item !== day
                ),
              });
            }
          }}
        />

        <span>{day}</span>
      </label>
    ))}

  </div>

</div>

              </label>


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
                  Create Batch
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Batches;