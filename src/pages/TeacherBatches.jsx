import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/teacher-batches.css";

function TeacherBatches() {
  const navigate = useNavigate();

  // =========================================================
  // SUBJECT FILTER
  // =========================================================
  const [selectedSubject, setSelectedSubject] =
    useState("All Subjects");

    const [searchClass, setSearchClass] = useState("");
      const [searchSection, setSearchSection] = useState("");
      const [searchGroup, setSearchGroup] = useState("");
  // =========================================================
  // CREATE BATCH MODAL
  // =========================================================
  const [showCreateModal, setShowCreateModal] =
    useState(false);

  // =========================================================
  // BATCH DATA
  // =========================================================
  const [batches, setBatches] = useState([
    {
      id: "PHY-A",
      name: "Physics Batch A",

      subject: "Physics",
      className: "HSC 2027",
      group: "Science",
      section: "A",

      students: 24,

      days: ["Sat", "Mon", "Wed"],
      startTime: "10:00",
      endTime: "11:30",

      room: "Room 301",
      shift: "Morning",

      teacherName: "Mr. Rahman",
      teacherId: "T-001",

      isClassTeacher: true,

      status: "Active",
    },

    {
      id: "PHY-B",
      name: "Physics Batch B",

      subject: "Physics",
      className: "HSC 2027",
      group: "Science",
      section: "B",

      students: 18,

      days: ["Sun", "Tue", "Thu"],
      startTime: "12:00",
      endTime: "13:30",

      room: "Room 302",
      shift: "Day",

      teacherName: "Mr. Rahman",
      teacherId: "T-001",

      isClassTeacher: false,

      status: "Active",
    },

    {
      id: "PHY-C",
      name: "Physics Batch C",

      subject: "Physics",
      className: "HSC 2026",
      group: "Science",
      section: "C",

      students: 16,

      days: ["Sat", "Mon", "Wed"],
      startTime: "15:00",
      endTime: "16:30",

      room: "Room 201",
      shift: "Afternoon",

      teacherName: "Mr. Rahman",
      teacherId: "T-001",

      isClassTeacher: false,

      status: "Active",
    },

    {
      id: "PHY-D",
      name: "Physics Model Batch",

      subject: "Physics",
      className: "HSC 2026",
      group: "Science",
      section: "D",

      students: 12,

      days: ["Fri", "Sun"],
      startTime: "17:00",
      endTime: "18:30",

      room: "Room 205",
      shift: "Evening",

      teacherName: "Mr. Rahman",
      teacherId: "T-001",

      isClassTeacher: false,

      status: "Active",
    },
  ]);

  // =========================================================
  // NEW BATCH FORM
  // =========================================================
  const initialForm = {
    className: "",
    group: "",
    section: "",
    subject: "",
    room: "",
    shift: "Morning",
    startTime: "",
    endTime: "",
    days: [],
    isClassTeacher: false,
  };

  const [form, setForm] = useState(initialForm);

  // =========================================================
  // SUBJECTS
  // =========================================================
  const subjectSuggestions = [
    "Physics",
    "Chemistry",
    "Biology",
    "Higher Mathematics",
    "Mathematics",
    "General Science",
    "Accounting",
    "Finance & Banking",
    "Economics",
    "Business Entrepreneurship",
    "Bangla",
    "English",
    "History",
    "Civics",
    "Geography",
    "Social Science",
    "ICT",
    "Computer Science",
    "Religion",
    "Physical Education",
    "Drawing",
  ];

  // =========================================================
  // CLASS SUGGESTIONS
  // =========================================================
  const classSuggestions = [
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
    "SSC 2026",
    "SSC 2027",
    "HSC 2026",
    "HSC 2027",
    "HSC 2028",
  ];

  // =========================================================
  // GROUP SUGGESTIONS
  // =========================================================
  const groupSuggestions = [
    "Science",
    "Commerce",
    "Arts",
    "Humanities",
    "Business Studies",
    "Medical",
    "General",
  ];

  // =========================================================
  // SECTION SUGGESTIONS
  // =========================================================
  const sectionSuggestions = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "Morning",
    "Day",
    "Evening",
    "Red",
    "Blue",
  ];

  // =========================================================
  // ROOM SUGGESTIONS
  // =========================================================
  const roomSuggestions = [
    "Room 101",
    "Room 102",
    "Room 103",
    "Room 201",
    "Room 202",
    "Room 203",
    "Room 301",
    "Room 302",
    "Room 303",
    "Lab 1",
    "Lab 2",
    "Auditorium",
  ];

  // =========================================================
  // DAYS
  // =========================================================
  const dayOptions = [
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ];

  // =========================================================
  // FILTERED BATCHES
  // =========================================================
    const filteredBatches = batches.filter((batch) => {
      const matchesSubject =
        selectedSubject === "All Subjects" ||
        batch.subject
          .toLowerCase()
          .includes(selectedSubject.toLowerCase());

      const matchesClass =
        !searchClass ||
        batch.className
          .toLowerCase()
          .includes(searchClass.toLowerCase());

      const matchesSection =
        !searchSection ||
        batch.section
          .toLowerCase()
          .includes(searchSection.toLowerCase());

      const matchesGroup =
        !searchGroup ||
        batch.group
          .toLowerCase()
          .includes(searchGroup.toLowerCase());

      return (
        matchesSubject &&
        matchesClass &&
        matchesSection &&
        matchesGroup
      );
    });
  // =========================================================
  // TOTAL STUDENTS
  // =========================================================
  const totalStudents = filteredBatches.reduce(
    (total, batch) => total + batch.students,
    0
  );

  // =========================================================
  // CLASS TEACHER COUNT
  // =========================================================
  const classTeacherBatches = batches.filter(
    (batch) => batch.isClassTeacher
  );

  // =========================================================
  // UNIQUE SUBJECTS
  // =========================================================
  const totalSubjects = new Set(
    batches.map((batch) => batch.subject)
  ).size;

  // =========================================================
  // HANDLE INPUT
  // =========================================================
  const handleInputChange = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =========================================================
  // HANDLE DAY
  // =========================================================
  const handleDayToggle = (day) => {
    setForm((previous) => {
      const exists = previous.days.includes(day);

      return {
        ...previous,
        days: exists
          ? previous.days.filter(
              (item) => item !== day
            )
          : [...previous.days, day],
      };
    });
  };

  // =========================================================
  // FORMAT TIME
  // =========================================================
  const formatTime = (time) => {
    if (!time) return "";

    const [hourString, minute] = time.split(":");

    let hour = Number(hourString);

    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${String(hour).padStart(
      2,
      "0"
    )}:${minute} ${period}`;
  };

  // =========================================================
  // CREATE BATCH NAME
  // =========================================================
  const createBatchName = () => {
    const subject = form.subject || "New";

    const section = form.section
      ? ` ${form.section}`
      : "";

    return `${subject} Batch${section}`;
  };

  // =========================================================
  // CREATE BATCH
  // =========================================================
  const handleCreateBatch = (event) => {
    event.preventDefault();

    if (!form.className.trim()) {
      alert("Please enter Class.");
      return;
    }

    if (!form.group.trim()) {
      alert("Please enter Group.");
      return;
    }

    if (!form.section.trim()) {
      alert("Please enter Section.");
      return;
    }

    if (!form.subject.trim()) {
      alert("Please enter Subject.");
      return;
    }

    if (!form.room.trim()) {
      alert("Please enter Room.");
      return;
    }

    if (!form.startTime || !form.endTime) {
      alert("Please select class time.");
      return;
    }

    if (form.days.length === 0) {
      alert("Please select at least one day.");
      return;
    }

    // ---------------------------------------------------------
    // IMPORTANT:
    // Later this ID will be used by backend/database.
    // ---------------------------------------------------------
    const newBatch = {
      id: `BATCH-${Date.now()}`,

      name: createBatchName(),

      subject: form.subject.trim(),

      className: form.className.trim(),

      group: form.group.trim(),

      section: form.section.trim(),

      students: 0,

      days: form.days,

      startTime: form.startTime,

      endTime: form.endTime,

      room: form.room.trim(),

      shift: form.shift,

      teacherName: "Mr. Rahman",

      teacherId: "T-001",

      isClassTeacher: form.isClassTeacher,

      status: "Active",
    };

    setBatches((previous) => [
      ...previous,
      newBatch,
    ]);

    setForm(initialForm);

    setShowCreateModal(false);
  };

  // =========================================================
  // SUBJECT OPTIONS FOR FILTER
  // =========================================================
  const filterSubjects = useMemo(() => {
    const subjects = batches.map(
      (batch) => batch.subject
    );

    return [...new Set(subjects)];
  }, [batches]);

  // =========================================================
  // CLASS TEACHER DESCRIPTION
  // =========================================================
  const getClassTeacherText = (batch) => {
    if (!batch.isClassTeacher) {
      return "Subject Teacher";
    }

    return `Class Teacher · ${batch.className} · ${batch.group} · Section ${batch.section}`;
  };

  return (
    <div className="dashboard-page teacher-batches-page">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="teacher-batches-header">

        <div className="teacher-batches-header-left">

          <p className="teacher-dashboard-eyebrow">
            Teacher Portal
          </p>

          <h1>My Batches</h1>

          <p>
            Manage your assigned classes, students,
            schedules and class-teacher responsibilities.
          </p>

        </div>

        <div className="teacher-batches-header-right">

          <div className="teacher-batches-header-stats">

            <div>
              <span>My Batches</span>
              <strong>
                {filteredBatches.length}
              </strong>
            </div>

            <div>
              <span>Total Students</span>
              <strong>
                {totalStudents}
              </strong>
            </div>

            <div>
              <span>Subjects</span>
              <strong>
                {totalSubjects}
              </strong>
            </div>

            <div>
              <span>Class Teacher</span>
              <strong>
                {classTeacherBatches.length}
              </strong>
            </div>

          </div>

          <button
            type="button"
            className="teacher-create-batch-btn"
            onClick={() =>
              setShowCreateModal(true)
            }
          >
            <span>+</span>
            Create Batch
          </button>

        </div>

      </div>

                {/* =====================================================
              FILTER PANEL
          ===================================================== */}
          <div className="dashboard-panel teacher-batches-filter-panel">

            <div className="teacher-batches-filter-left">

              <div>
                <span className="teacher-section-label">
                  BATCH MANAGEMENT
                </span>

                <h2>
                  Assigned Batches
                </h2>

                <p>
                  Search your batches by class, section or group.
                </p>
              </div>

            </div>

            <div className="teacher-batches-search-area">

              {/* CLASS SEARCH */}
              <div className="teacher-batch-search-field">

                <label htmlFor="batch-class-search">
                  Class
                </label>

                <input
                  id="batch-class-search"
                  type="text"
                  value={searchClass}
                  onChange={(event) =>
                    setSearchClass(event.target.value)
                  }
                  placeholder="Search Class"
                />

              </div>

              {/* SECTION SEARCH */}
              <div className="teacher-batch-search-field">

                <label htmlFor="batch-section-search">
                  Section
                </label>

                <input
                  id="batch-section-search"
                  type="text"
                  value={searchSection}
                  onChange={(event) =>
                    setSearchSection(event.target.value)
                  }
                  placeholder="Search Section"
                />

              </div>

              {/* GROUP SEARCH */}
              <div className="teacher-batch-search-field">

                <label htmlFor="batch-group-search">
                  Group
                </label>

                <input
                  id="batch-group-search"
                  type="text"
                  value={searchGroup}
                  onChange={(event) =>
                    setSearchGroup(event.target.value)
                  }
                  placeholder="Search Group"
                />

              </div>

              {/* SUBJECT */}
              <div className="teacher-batch-search-field">

                <label htmlFor="subject-filter">
                  Subject
                </label>

                <select
                  id="subject-filter"
                  value={selectedSubject}
                  onChange={(event) =>
                    setSelectedSubject(event.target.value)
                  }
                >
                  <option>
                    All Subjects
                  </option>

                  {filterSubjects.map((subject) => (
                    <option
                      key={subject}
                      value={subject}
                    >
                      {subject}
                    </option>
                  ))}
                </select>

              </div>

            </div>

          </div>

      {/* =====================================================
          BATCH CARDS
      ===================================================== */}
      <div className="teacher-batches-grid">

        {filteredBatches.map((batch) => (

          <div
            className="teacher-batch-card"
            key={batch.id}
          >

            {/* CARD TOP */}
            <div className="teacher-batch-card-top">

              <div className="teacher-batch-icon">
                {batch.subject === "Physics"
                  ? "⚛"
                  : "📚"}
              </div>

              <div className="teacher-batch-card-top-right">

                {batch.isClassTeacher && (
                  <span className="teacher-class-teacher-badge">
                    Class Teacher
                  </span>
                )}

                <span className="teacher-batch-status">
                  {batch.status}
                </span>

              </div>

            </div>

            {/* TITLE */}
            <div className="teacher-batch-title">

              <h2>
                {batch.name}
              </h2>

              <p>
                {batch.subject}
                {" · "}
                {batch.className}
                {" · "}
                {batch.group}
                {" · "}
                Section {batch.section}
              </p>

            </div>

            {/* CLASS TEACHER INFORMATION */}
            <div className="teacher-class-teacher-info">

              <div className="teacher-class-teacher-icon">
                👨‍🏫
              </div>

              <div>

                <small>
                  Teaching Role
                </small>

                <strong>
                  {getClassTeacherText(batch)}
                </strong>

              </div>

            </div>

            {/* INFO */}
            <div className="teacher-batch-info">

              <div className="teacher-batch-info-row">

                <span>👥</span>

                <div>

                  <small>
                    Students
                  </small>

                  <strong>
                    {batch.students} Students
                  </strong>

                </div>

              </div>

              <div className="teacher-batch-info-row">

                <span>◷</span>

                <div>

                  <small>
                    Class Time
                  </small>

                  <strong>
                    {formatTime(
                      batch.startTime
                    )}
                    {" - "}
                    {formatTime(
                      batch.endTime
                    )}
                  </strong>

                </div>

              </div>

              <div className="teacher-batch-info-row">

                <span>▣</span>

                <div>

                  <small>
                    Schedule
                  </small>

                  <strong>
                    {batch.days.join(
                      " · "
                    )}
                  </strong>

                </div>

              </div>

              <div className="teacher-batch-info-row">

                <span>⌂</span>

                <div>

                  <small>
                    Room
                  </small>

                  <strong>
                    {batch.room}
                  </strong>

                </div>

              </div>

              <div className="teacher-batch-info-row">

                <span>⇄</span>

                <div>

                  <small>
                    Shift
                  </small>

                  <strong>
                    {batch.shift}
                  </strong>

                </div>

              </div>

            </div>

            {/* ACTIONS */}
            <div className="teacher-batch-actions">

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/teacher-students?batchId=${batch.id}`
                  )
                }
              >
                View Students
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/teacher-attendance?batchId=${batch.id}`
                  )
                }
              >
                Attendance
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}
      {filteredBatches.length === 0 && (

        <div className="teacher-batches-empty">

          <div>
            📚
          </div>

          <h3>
            No batches found
          </h3>

          <p>
            No batch is currently available
            for this subject.
          </p>

        </div>

      )}

      {/* =====================================================
          CREATE BATCH MODAL
      ===================================================== */}
      {showCreateModal && (

        <div
          className="teacher-batch-modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {
              setShowCreateModal(false);
            }

          }}
        >

          <div className="teacher-batch-modal">

            {/* MODAL HEADER */}
            <div className="teacher-batch-modal-header">

              <div>

                <span>
                  TEACHER PORTAL
                </span>

                <h2>
                  Create New Batch
                </h2>

                <p>
                  Add the class, subject and
                  schedule you teach.
                </p>

              </div>

              <button
                type="button"
                className="teacher-modal-close-btn"
                onClick={() =>
                  setShowCreateModal(false)
                }
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleCreateBatch}
              className="teacher-batch-form"
            >

              {/* BASIC INFORMATION */}
              <div className="teacher-form-section">

                <div className="teacher-form-section-title">

                  <span>01</span>

                  <div>
                    <h3>
                      Class Information
                    </h3>

                    <p>
                      Define exactly which
                      class/group/section you teach.
                    </p>
                  </div>

                </div>

                <div className="teacher-form-grid">

                  {/* CLASS */}
                  <div className="teacher-form-field">

                    <label>
                      Class
                    </label>

                    <input
                      list="teacher-class-options"
                      type="text"
                      value={form.className}
                      onChange={(event) =>
                        handleInputChange(
                          "className",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Class 9 / HSC 2027"
                    />

                    <datalist id="teacher-class-options">

                      {classSuggestions.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          />
                        )
                      )}

                    </datalist>

                  </div>

                  {/* GROUP */}
                  <div className="teacher-form-field">

                    <label>
                      Group
                    </label>

                    <input
                      list="teacher-group-options"
                      type="text"
                      value={form.group}
                      onChange={(event) =>
                        handleInputChange(
                          "group",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Science"
                    />

                    <datalist id="teacher-group-options">

                      {groupSuggestions.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          />
                        )
                      )}

                    </datalist>

                  </div>

                  {/* SECTION */}
                  <div className="teacher-form-field">

                    <label>
                      Section
                    </label>

                    <input
                      list="teacher-section-options"
                      type="text"
                      value={form.section}
                      onChange={(event) =>
                        handleInputChange(
                          "section",
                          event.target.value
                        )
                      }
                      placeholder="e.g. A"
                    />

                    <datalist id="teacher-section-options">

                      {sectionSuggestions.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          />
                        )
                      )}

                    </datalist>

                  </div>

                  {/* SUBJECT */}
                  <div className="teacher-form-field">

                    <label>
                      Subject
                    </label>

                    <input
                      list="teacher-subject-options"
                      type="text"
                      value={form.subject}
                      onChange={(event) =>
                        handleInputChange(
                          "subject",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Physics"
                    />

                    <datalist id="teacher-subject-options">

                      {subjectSuggestions.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          />
                        )
                      )}

                    </datalist>

                  </div>

                </div>

              </div>

              {/* SCHEDULE */}
              <div className="teacher-form-section">

                <div className="teacher-form-section-title">

                  <span>02</span>

                  <div>
                    <h3>
                      Class Schedule
                    </h3>

                    <p>
                      Set room, shift, days and
                      class time.
                    </p>
                  </div>

                </div>

                <div className="teacher-form-grid">

                  {/* ROOM */}
                  <div className="teacher-form-field">

                    <label>
                      Room
                    </label>

                    <input
                      list="teacher-room-options"
                      type="text"
                      value={form.room}
                      onChange={(event) =>
                        handleInputChange(
                          "room",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Room 301"
                    />

                    <datalist id="teacher-room-options">

                      {roomSuggestions.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          />
                        )
                      )}

                    </datalist>

                  </div>

                  {/* SHIFT */}
                  <div className="teacher-form-field">

                    <label>
                      Shift
                    </label>

                    <select
                      value={form.shift}
                      onChange={(event) =>
                        handleInputChange(
                          "shift",
                          event.target.value
                        )
                      }
                    >

                      <option>
                        Morning
                      </option>

                      <option>
                        Day
                      </option>

                      <option>
                        Afternoon
                      </option>

                      <option>
                        Evening
                      </option>

                    </select>

                  </div>

                  {/* START TIME */}
                  <div className="teacher-form-field">

                    <label>
                      Start Time
                    </label>

                    <input
                      type="time"
                      value={form.startTime}
                      onChange={(event) =>
                        handleInputChange(
                          "startTime",
                          event.target.value
                        )
                      }
                    />

                  </div>

                  {/* END TIME */}
                  <div className="teacher-form-field">

                    <label>
                      End Time
                    </label>

                    <input
                      type="time"
                      value={form.endTime}
                      onChange={(event) =>
                        handleInputChange(
                          "endTime",
                          event.target.value
                        )
                      }
                    />

                  </div>

                </div>

                {/* DAYS */}
                <div className="teacher-days-field">

                  <label>
                    Class Days
                  </label>

                  <div className="teacher-days-list">

                    {dayOptions.map(
                      (day) => {

                        const selected =
                          form.days.includes(day);

                        return (
                          <label
                            key={day}
                            className={
                              selected
                                ? "teacher-day-option selected"
                                : "teacher-day-option"
                            }
                          >

                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() =>
                                handleDayToggle(
                                  day
                                )
                              }
                            />

                            <span>
                              {day}
                            </span>

                          </label>
                        );
                      }
                    )}

                  </div>

                </div>

              </div>

              {/* CLASS TEACHER */}
              <div className="teacher-form-section">

                <div className="teacher-form-section-title">

                  <span>03</span>

                  <div>
                    <h3>
                      Class Teacher Responsibility
                    </h3>

                    <p>
                      Decide whether you are the
                      class teacher for this class.
                    </p>
                  </div>

                </div>

                <label className="teacher-class-teacher-toggle">

                  <input
                    type="checkbox"
                    checked={form.isClassTeacher}
                    onChange={(event) =>
                      handleInputChange(
                        "isClassTeacher",
                        event.target.checked
                      )
                    }
                  />

                  <span className="teacher-toggle-ui">
                    <span />
                  </span>

                  <div>

                    <strong>
                      I am the Class Teacher
                    </strong>

                    <small>
                      I manage the main student
                      list and class-level
                      responsibilities for this
                      Class + Group + Section.
                    </small>

                  </div>

                </label>

                {/* CLASS TEACHER PREVIEW */}
                {form.isClassTeacher && (
                  <div className="teacher-class-teacher-preview">

                    <span>
                      👨‍🏫
                    </span>

                    <div>

                      <strong>
                        Class Teacher Assignment
                      </strong>

                      <p>
                        {form.className ||
                          "Class"}
                        {" · "}
                        {form.group ||
                          "Group"}
                        {" · Section "}
                        {form.section ||
                          "Section"}
                      </p>

                    </div>

                  </div>
                )}

              </div>

              {/* FOOTER */}
              <div className="teacher-batch-modal-footer">

                <button
                  type="button"
                  className="teacher-modal-cancel-btn"
                  onClick={() => {
                    setForm(initialForm);
                    setShowCreateModal(false);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="teacher-modal-create-btn"
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

export default TeacherBatches;