import { useMemo, useState } from "react";
import "../styles/teacher-attendance.css";

function TeacherAttendance() {
  // ================================
  // FILTER STATE
  // ================================
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedShift, setSelectedShift] = useState("");

  // ================================
  // CALENDAR STATE
  // ================================
  const [currentMonth, setCurrentMonth] = useState(
    new Date("2026-09-19")
  );

  const [selectedDates, setSelectedDates] = useState([
    "2026-09-19",
  ]);

  const [holidayDates, setHolidayDates] = useState([]);

  const [attendanceStarted, setAttendanceStarted] = useState(false);

  // ================================
  // STUDENTS
  // ================================
  const [students, setStudents] = useState([
    {
      id: "ST-001",
      name: "Rahim",
      roll: "01",
      className: "HSC 2027",
      group: "Science",
      section: "A",
      subject: "Physics",
      shift: "Morning",
      status: "Present",
    },
    {
      id: "ST-002",
      name: "Karim",
      roll: "02",
      className: "HSC 2027",
      group: "Science",
      section: "A",
      subject: "Physics",
      shift: "Morning",
      status: "Present",
    },
    {
      id: "ST-003",
      name: "Sakib",
      roll: "03",
      className: "HSC 2027",
      group: "Science",
      section: "A",
      subject: "Physics",
      shift: "Morning",
      status: "Present",
    },
    {
      id: "ST-004",
      name: "Hasan",
      roll: "04",
      className: "HSC 2027",
      group: "Science",
      section: "A",
      subject: "Physics",
      shift: "Morning",
      status: "Present",
    },
    {
      id: "ST-005",
      name: "Nabil",
      roll: "05",
      className: "HSC 2027",
      group: "Science",
      section: "A",
      subject: "Physics",
      shift: "Morning",
      status: "Present",
    },
    {
      id: "ST-006",
      name: "Rafi",
      roll: "06",
      className: "HSC 2027",
      group: "Science",
      section: "A",
      subject: "Physics",
      shift: "Morning",
      status: "Present",
    },
  ]);

  // ================================
  // SUGGESTIONS
  // ================================
  const classSuggestions = [
    "HSC 2026",
    "HSC 2027",
    "HSC 2028",
    "SSC 2027",
    "SSC 2028",
  ];

  const sectionSuggestions = [
    "A",
    "B",
    "C",
    "D",
  ];

  const groupSuggestions = [
    "Science",
    "Commerce",
    "Arts",
  ];

  const shiftSuggestions = [
    "Morning",
    "Day",
    "Afternoon",
    "Evening",
  ];

  // ================================
  // DATE HELPERS
  // ================================
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getMonthName(date) {
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  function getCalendarDays() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const previousMonthDays = new Date(
      year,
      month,
      0
    ).getDate();

    const days = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = previousMonthDays - i;

      days.push({
        day,
        date: new Date(year, month - 1, day),
        currentMonth: false,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        date: new Date(year, month, day),
        currentMonth: true,
      });
    }

    // Next month days
    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        day: nextDay,
        date: new Date(year, month + 1, nextDay),
        currentMonth: false,
      });

      nextDay++;
    }

    return days;
  }

  const calendarDays = getCalendarDays();

  function changeMonth(direction) {
    setCurrentMonth((current) => {
      const newDate = new Date(current);

      newDate.setMonth(
        current.getMonth() + direction
      );

      return newDate;
    });
  }

  // ================================
  // DATE SELECTION
  // ================================
  function toggleDate(date) {
    const dateString = formatDate(date);

    setSelectedDates((currentDates) => {
      if (currentDates.includes(dateString)) {
        return currentDates.filter(
          (item) => item !== dateString
        );
      }

      return [...currentDates, dateString].sort();
    });
  }

  function isSelectedDate(date) {
    return selectedDates.includes(
      formatDate(date)
    );
  }

  function isHolidayDate(date) {
    return holidayDates.includes(
      formatDate(date)
    );
  }

  // ================================
  // SINGLE DATE
  // ================================
  const singleSelectedDate =
    selectedDates.length === 1
      ? selectedDates[0]
      : null;

  // ================================
  // FILTER STUDENTS
  // ================================
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesClass =
        !selectedClass ||
        student.className === selectedClass;

      const matchesSection =
        !selectedSection ||
        student.section === selectedSection;

      const matchesGroup =
        !selectedGroup ||
        student.group === selectedGroup;

      const matchesShift =
        !selectedShift ||
        student.shift === selectedShift;

      return (
        matchesClass &&
        matchesSection &&
        matchesGroup &&
        matchesShift
      );
    });
  }, [
    students,
    selectedClass,
    selectedSection,
    selectedGroup,
    selectedShift,
  ]);

  // ================================
  // ATTENDANCE UPDATE
  // ================================
  function updateAttendance(studentId, status) {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              status,
            }
          : student
      )
    );
  }

  // ================================
  // MARK REMAINING PRESENT
  // ================================
  function markRemainingPresent() {
    setStudents((currentStudents) =>
      currentStudents.map((student) => {
        if (
          selectedClass &&
          student.className !== selectedClass
        ) {
          return student;
        }

        if (
          selectedSection &&
          student.section !== selectedSection
        ) {
          return student;
        }

        if (
          selectedGroup &&
          student.group !== selectedGroup
        ) {
          return student;
        }

        if (
          selectedShift &&
          student.shift !== selectedShift
        ) {
          return student;
        }

        if (student.status !== "Absent") {
          return {
            ...student,
            status: "Present",
          };
        }

        return student;
      })
    );
  }

  // ================================
  // START ATTENDANCE
  // ================================
  function startAttendance() {
    if (!singleSelectedDate) {
      alert(
        "Please select exactly one date for taking attendance."
      );
      return;
    }

    if (
      !selectedClass ||
      !selectedSection ||
      !selectedGroup ||
      !selectedShift
    ) {
      alert(
        "Please select Class, Section, Group and Shift first."
      );
      return;
    }

    if (holidayDates.includes(singleSelectedDate)) {
      alert(
        "This date is marked as Holiday."
      );
      return;
    }

    setAttendanceStarted(true);
  }

  // ================================
  // HOLIDAY
  // ================================
  function markSelectedDatesHoliday() {
    if (selectedDates.length === 0) {
      alert("Please select date(s) first.");
      return;
    }

    setHolidayDates((currentDates) => [
      ...new Set([
        ...currentDates,
        ...selectedDates,
      ]),
    ]);

    setAttendanceStarted(false);
  }

  // ================================
  // EDIT OLD ATTENDANCE
  // ================================
  function editAttendance() {
    if (!singleSelectedDate) {
      alert(
        "Please select one date to edit attendance."
      );
      return;
    }

    setAttendanceStarted(true);
  }

  // ================================
  // COUNTS
  // ================================
  const presentCount = filteredStudents.filter(
    (student) => student.status === "Present"
  ).length;

  const absentCount = filteredStudents.filter(
    (student) => student.status === "Absent"
  ).length;

  const lateCount = filteredStudents.filter(
    (student) => student.status === "Late"
  ).length;

  const attendancePercentage =
    filteredStudents.length === 0
      ? 0
      : Math.round(
          (presentCount /
            filteredStudents.length) *
            100
        );

  // ================================
  // SUBMIT
  // ================================
  function handleSubmit() {
    if (!singleSelectedDate) {
      alert(
        "Please select one attendance date."
      );
      return;
    }

    const attendanceData = {
      teacherId: "T-001",
      subject: "Physics",
      date: singleSelectedDate,
      className: selectedClass,
      section: selectedSection,
      group: selectedGroup,
      shift: selectedShift,

      records: filteredStudents.map(
        (student) => ({
          studentId: student.id,
          roll: student.roll,
          status: student.status,
        })
      ),
    };

    console.log(
      "Attendance Submitted:",
      attendanceData
    );

    alert(
      "Attendance submitted successfully!"
    );
  }

  return (
    <div className="dashboard-page teacher-attendance-page">

      {/* =================================
          HEADER
      ================================= */}
      <div className="teacher-attendance-header">

        <div>
          <p className="teacher-dashboard-eyebrow">
            Attendance Management
          </p>

          <h1>
            Take & Manage Attendance
          </h1>

          <p>
            Select date, class, section, group
            and shift before taking attendance.
          </p>
        </div>

      </div>

      {/* =================================
          MAIN SELECTION AREA
      ================================= */}
      <div className="teacher-attendance-selection">

        {/* ===============================
            CALENDAR
        =============================== */}
        <div className="dashboard-panel teacher-calendar-panel">

          <div className="teacher-calendar-header">

            <button
              type="button"
              className="teacher-calendar-nav"
              onClick={() =>
                changeMonth(-1)
              }
            >
              ‹
            </button>

            <h2>
              {getMonthName(currentMonth)}
            </h2>

            <button
              type="button"
              className="teacher-calendar-nav"
              onClick={() =>
                changeMonth(1)
              }
            >
              ›
            </button>

          </div>

          <div className="teacher-calendar-weekdays">
            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <span key={day}>
                {day}
              </span>
            ))}
          </div>

          <div className="teacher-calendar-grid">

            {calendarDays.map(
              ({
                day,
                date,
                currentMonth: isCurrentMonth,
              }) => {

                const dateString =
                  formatDate(date);

                const selected =
                  isSelectedDate(date);

                const holiday =
                  isHolidayDate(date);

                return (
                  <button
                    type="button"
                    key={dateString}
                    className={`
                      teacher-calendar-day
                      ${
                        !isCurrentMonth
                          ? "outside-month"
                          : ""
                      }
                      ${
                        selected
                          ? "selected"
                          : ""
                      }
                      ${
                        holiday
                          ? "holiday"
                          : ""
                      }
                    `}
                    onClick={() =>
                      toggleDate(date)
                    }
                  >
                    <span>
                      {day}
                    </span>

                    {holiday && (
                      <small>
                        Holiday
                      </small>
                    )}
                  </button>
                );
              }
            )}

          </div>

          <div className="teacher-calendar-info">

            <span>
              {selectedDates.length} date
              {selectedDates.length !== 1
                ? "s"
                : ""}{" "}
              selected
            </span>

            {selectedDates.length === 1 && (
              <span>
                Attendance date fixed
              </span>
            )}

          </div>

        </div>

        {/* ===============================
            FILTERS
        =============================== */}
        <div className="dashboard-panel teacher-attendance-filter-panel">

          <div className="teacher-attendance-filter-title">
            <h2>
              Select Class
            </h2>

            <p>
              All fields are required before
              taking attendance.
            </p>
          </div>

          <div className="teacher-attendance-filter">

            {/* CLASS */}
            <div className="teacher-attendance-field">
              <label>
                Class
              </label>

              <input
                list="attendance-class-list"
                value={selectedClass}
                placeholder="Select class"
                onChange={(e) =>
                  setSelectedClass(
                    e.target.value
                  )
                }
              />

              <datalist id="attendance-class-list">
                {classSuggestions.map(
                  (item) => (
                    <option
                      value={item}
                      key={item}
                    />
                  )
                )}
              </datalist>
            </div>

            {/* SECTION */}
            <div className="teacher-attendance-field">
              <label>
                Section
              </label>

              <input
                list="attendance-section-list"
                value={selectedSection}
                placeholder="Select section"
                onChange={(e) =>
                  setSelectedSection(
                    e.target.value
                  )
                }
              />

              <datalist id="attendance-section-list">
                {sectionSuggestions.map(
                  (item) => (
                    <option
                      value={item}
                      key={item}
                    />
                  )
                )}
              </datalist>
            </div>

            {/* GROUP */}
            <div className="teacher-attendance-field">
              <label>
                Group
              </label>

              <input
                list="attendance-group-list"
                value={selectedGroup}
                placeholder="Select group"
                onChange={(e) =>
                  setSelectedGroup(
                    e.target.value
                  )
                }
              />

              <datalist id="attendance-group-list">
                {groupSuggestions.map(
                  (item) => (
                    <option
                      value={item}
                      key={item}
                    />
                  )
                )}
              </datalist>
            </div>

            {/* SHIFT */}
            <div className="teacher-attendance-field">
              <label>
                Shift
              </label>

              <input
                list="attendance-shift-list"
                value={selectedShift}
                placeholder="Select shift"
                onChange={(e) =>
                  setSelectedShift(
                    e.target.value
                  )
                }
              />

              <datalist id="attendance-shift-list">
                {shiftSuggestions.map(
                  (item) => (
                    <option
                      value={item}
                      key={item}
                    />
                  )
                )}
              </datalist>
            </div>

          </div>

          {/* ===========================
              ACTION BUTTONS
          =========================== */}
          <div className="teacher-attendance-selection-actions">

            {selectedDates.length > 1 ? (
              <button
                type="button"
                className="teacher-holiday-btn"
                onClick={
                  markSelectedDatesHoliday
                }
              >
                🗓 Mark Holiday
              </button>
            ) : (
              <button
                type="button"
                className="teacher-take-present-btn"
                onClick={
                  startAttendance
                }
              >
                ✓ Take Present
              </button>
            )}

            {singleSelectedDate &&
              !holidayDates.includes(
                singleSelectedDate
              ) && (
                <button
                  type="button"
                  className="teacher-edit-attendance-btn"
                  onClick={
                    editAttendance
                  }
                >
                  ✎ Edit Attendance
                </button>
              )}

          </div>

        </div>

      </div>

      {/* =================================
          SUMMARY
      ================================= */}
      {attendanceStarted && (
        <div className="teacher-attendance-summary">

          <div className="teacher-attendance-summary-card">
            <span>
              Total Students
            </span>

            <strong>
              {filteredStudents.length}
            </strong>
          </div>

          <div className="teacher-attendance-summary-card present-summary">
            <span>
              Present
            </span>

            <strong>
              {presentCount}
            </strong>
          </div>

          <div className="teacher-attendance-summary-card absent-summary">
            <span>
              Absent
            </span>

            <strong>
              {absentCount}
            </strong>
          </div>

          <div className="teacher-attendance-summary-card late-summary">
            <span>
              Late
            </span>

            <strong>
              {lateCount}
            </strong>
          </div>

          <div className="teacher-attendance-summary-card">
            <span>
              Attendance
            </span>

            <strong>
              {attendancePercentage}%
            </strong>
          </div>

        </div>
      )}

      {/* =================================
          STUDENT ATTENDANCE TABLE
      ================================= */}
      {attendanceStarted && (
        <div className="dashboard-panel teacher-attendance-panel">

          <div className="panel-header">

            <div>
              <h2>
                Student Attendance
              </h2>

              <p>
                {selectedClass} ·{" "}
                {selectedSection} ·{" "}
                {selectedGroup} ·{" "}
                {selectedShift} ·{" "}
                {singleSelectedDate}
              </p>
            </div>

            <span className="teacher-attendance-count">
              {filteredStudents.length} Students
            </span>

          </div>

          {/* ===========================
              QUICK ACTION
          =========================== */}
          <div className="teacher-attendance-quick-actions">

            <div>
              <strong>
                Mark students who did not
                attend as Absent.
              </strong>

              <span>
                Remaining students can be
                marked Present automatically.
              </span>
            </div>

            <button
              type="button"
              className="teacher-mark-remaining-btn"
              onClick={
                markRemainingPresent
              }
            >
              ✓ Mark Remaining Present
            </button>

          </div>

          {/* ===========================
              TABLE
          =========================== */}
          <div className="teacher-attendance-table-wrapper">

            <table className="teacher-attendance-table">

              <thead>
                <tr>
                  <th>
                    Roll
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Student
                  </th>

                  <th>
                    Student ID
                  </th>

                  <th>
                    Class
                  </th>

                  <th>
                    Group
                  </th>

                  <th>
                    Section
                  </th>

                  <th>
                    Subject
                  </th>

                  <th>
                    Shift
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredStudents.length ===
                0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="teacher-attendance-empty"
                    >
                      No students found for
                      this Class, Section,
                      Group and Shift.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map(
                    (student) => (
                      <tr
                        key={student.id}
                      >

                        {/* ROLL + EYE */}
                        <td>
                          <div className="teacher-roll-eye">

                            <span className="teacher-roll-badge">
                              {student.roll}
                            </span>

                            <button
                              type="button"
                              className="teacher-student-eye-btn"
                              title="Open student portal"
                              onClick={() =>
                                console.log(
                                  "Open student portal:",
                                  student.id
                                )
                              }
                            >
                              👁
                            </button>

                          </div>
                        </td>

                        {/* STATUS */}
                        <td>
                          <div className="teacher-attendance-actions">

                            <button
                              type="button"
                              className={
                                student.status ===
                                "Present"
                                  ? "attendance-status-btn present active"
                                  : "attendance-status-btn present"
                              }
                              onClick={() =>
                                updateAttendance(
                                  student.id,
                                  "Present"
                                )
                              }
                            >
                              Present
                            </button>

                            <button
                              type="button"
                              className={
                                student.status ===
                                "Absent"
                                  ? "attendance-status-btn absent active"
                                  : "attendance-status-btn absent"
                              }
                              onClick={() =>
                                updateAttendance(
                                  student.id,
                                  "Absent"
                                )
                              }
                            >
                              Absent
                            </button>

                            <button
                              type="button"
                              className={
                                student.status ===
                                "Late"
                                  ? "attendance-status-btn late active"
                                  : "attendance-status-btn late"
                              }
                              onClick={() =>
                                updateAttendance(
                                  student.id,
                                  "Late"
                                )
                              }
                            >
                              Late
                            </button>

                          </div>
                        </td>

                        {/* NAME */}
                        <td>
                          <strong>
                            {student.name}
                          </strong>
                        </td>

                        {/* ID */}
                        <td>
                          <span className="teacher-student-id">
                            {student.id}
                          </span>
                        </td>

                        {/* CLASS */}
                        <td>
                          {student.className}
                        </td>

                        {/* GROUP */}
                        <td>
                          {student.group}
                        </td>

                        {/* SECTION */}
                        <td>
                          {student.section}
                        </td>

                        {/* SUBJECT */}
                        <td>
                          {student.subject}
                        </td>

                        {/* SHIFT */}
                        <td>
                          {student.shift}
                        </td>

                      </tr>
                    )
                  )
                )}

              </tbody>

            </table>

          </div>

          {/* =================================
              FOOTER
          ================================= */}
          <div className="teacher-attendance-footer">

            <div>

              <strong>
                {presentCount} of{" "}
                {filteredStudents.length}{" "}
                students present
              </strong>

              <span>
                Attendance will be recorded
                for {singleSelectedDate}.
              </span>

            </div>

            <button
              type="button"
              className="teacher-submit-attendance-btn"
              onClick={
                handleSubmit
              }
            >
              Submit Attendance
            </button>

          </div>

        </div>
      )}

      {/* =================================
          HOLIDAY NOTICE
      ================================= */}
      {holidayDates.length > 0 && (
        <div className="teacher-holiday-list">

          <strong>
            Holiday Dates
          </strong>

          <div>
            {holidayDates.map(
              (date) => (
                <span key={date}>
                  {date}
                </span>
              )
            )}
          </div>

        </div>
      )}

    </div>
  );
}

export default TeacherAttendance;