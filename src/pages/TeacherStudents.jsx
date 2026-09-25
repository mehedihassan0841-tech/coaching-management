import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/teacher-students.css";

function TeacherStudents() {
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================================================
     BATCH DATA
     ========================================================= */

  const batches = [
    {
      id: "PHY-A",
      name: "Physics Batch A",
      subject: "Physics",
      className: "HSC 2027",
      group: "Science",
      section: "A",
      shift: "Morning",
    },
    {
      id: "PHY-B",
      name: "Physics Batch B",
      subject: "Physics",
      className: "HSC 2027",
      group: "Science",
      section: "B",
      shift: "Day",
    },
    {
      id: "PHY-C",
      name: "Physics Batch C",
      subject: "Physics",
      className: "HSC 2026",
      group: "Science",
      section: "C",
      shift: "Afternoon",
    },
    {
      id: "PHY-D",
      name: "Physics Model Batch",
      subject: "Physics",
      className: "HSC 2026",
      group: "Science",
      section: "D",
      shift: "Evening",
    },
  ];


  /* =========================================================
     URL BATCH
     ========================================================= */

  const params = new URLSearchParams(location.search);
  const batchIdFromUrl = params.get("batchId");


  /* =========================================================
     SEARCH
     ========================================================= */

  const [searchClass, setSearchClass] = useState("");
  const [searchSection, setSearchSection] = useState("");
  const [searchGroup, setSearchGroup] = useState("");
  const [searchShift, setSearchShift] = useState("");


  /* =========================================================
     BATCH
     ========================================================= */

  const [selectedBatch, setSelectedBatch] = useState(
    batchIdFromUrl || "All Batches"
  );


  /* =========================================================
     MODALS
     ========================================================= */

  const [showAddModal, setShowAddModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);


  /* =========================================================
     STUDENTS
     ========================================================= */

  const [students, setStudents] = useState([
    {
      id: "ST-001",
      name: "Rahim",
      roll: "01",
      batch: "Physics Batch A",
      batchId: "PHY-A",
      className: "HSC 2027",
      section: "A",
      group: "Science",
      subject: "Physics",
      shift: "Morning",
      attendance: 96,
      average: 88,
      status: "Excellent",
    },

    {
      id: "ST-002",
      name: "Karim",
      roll: "02",
      batch: "Physics Batch A",
      batchId: "PHY-A",
      className: "HSC 2027",
      section: "A",
      group: "Science",
      subject: "Physics",
      shift: "Morning",
      attendance: 91,
      average: 82,
      status: "Good",
    },

    {
      id: "ST-003",
      name: "Sakib",
      roll: "03",
      batch: "Physics Batch A",
      batchId: "PHY-A",
      className: "HSC 2027",
      section: "A",
      group: "Science",
      subject: "Physics",
      shift: "Morning",
      attendance: 84,
      average: 79,
      status: "Good",
    },

    {
      id: "ST-004",
      name: "Hasan",
      roll: "04",
      batch: "Physics Batch B",
      batchId: "PHY-B",
      className: "HSC 2027",
      section: "B",
      group: "Science",
      subject: "Physics",
      shift: "Day",
      attendance: 89,
      average: 74,
      status: "Average",
    },

    {
      id: "ST-005",
      name: "Nabil",
      roll: "05",
      batch: "Physics Batch B",
      batchId: "PHY-B",
      className: "HSC 2027",
      section: "B",
      group: "Science",
      subject: "Physics",
      shift: "Day",
      attendance: 78,
      average: 70,
      status: "Average",
    },

    {
      id: "ST-006",
      name: "Rafi",
      roll: "06",
      batch: "Physics Batch B",
      batchId: "PHY-B",
      className: "HSC 2027",
      section: "B",
      group: "Science",
      subject: "Physics",
      shift: "Day",
      attendance: 72,
      average: 66,
      status: "Needs Attention",
    },

    {
      id: "ST-007",
      name: "Tanvir",
      roll: "07",
      batch: "Physics Batch C",
      batchId: "PHY-C",
      className: "HSC 2026",
      section: "C",
      group: "Science",
      subject: "Physics",
      shift: "Afternoon",
      attendance: 94,
      average: 91,
      status: "Excellent",
    },

    {
      id: "ST-008",
      name: "Fahim",
      roll: "08",
      batch: "Physics Batch C",
      batchId: "PHY-C",
      className: "HSC 2026",
      section: "C",
      group: "Science",
      subject: "Physics",
      shift: "Afternoon",
      attendance: 87,
      average: 83,
      status: "Good",
    },
  ]);


  /* =========================================================
     START BATCH
     ========================================================= */

  const [studentCount, setStudentCount] = useState("");


  /* =========================================================
     AUTO SELECT BATCH FROM URL
     ========================================================= */

  useEffect(() => {
    if (batchIdFromUrl) {
      setSelectedBatch(batchIdFromUrl);
    }
  }, [batchIdFromUrl]);


  /* =========================================================
     CURRENT BATCH
     ========================================================= */

  const currentBatch = batches.find(
    (batch) => batch.id === selectedBatch
  );


  /* =========================================================
     FILTER STUDENTS
     ========================================================= */

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {

      const matchesClass =
        !searchClass ||
        student.className
          .toLowerCase()
          .includes(searchClass.toLowerCase());

      const matchesSection =
        !searchSection ||
        student.section
          .toLowerCase()
          .includes(searchSection.toLowerCase());

      const matchesGroup =
        !searchGroup ||
        student.group
          .toLowerCase()
          .includes(searchGroup.toLowerCase());

      const matchesShift =
        !searchShift ||
        student.shift
          .toLowerCase()
          .includes(searchShift.toLowerCase());

      const matchesBatch =
        selectedBatch === "All Batches" ||
        student.batchId === selectedBatch;

      return (
        matchesClass &&
        matchesSection &&
        matchesGroup &&
        matchesShift &&
        matchesBatch
      );
    });
  }, [
    students,
    searchClass,
    searchSection,
    searchGroup,
    searchShift,
    selectedBatch,
  ]);


  /* =========================================================
     STATISTICS
     ========================================================= */

  const excellentCount = filteredStudents.filter(
    (student) => student.status === "Excellent"
  ).length;

  const attentionCount = filteredStudents.filter(
    (student) => student.status === "Needs Attention"
  ).length;

  const averageAttendance =
    filteredStudents.length > 0
      ? Math.round(
          filteredStudents.reduce(
            (total, student) => total + Number(student.attendance || 0),
            0
          ) / filteredStudents.length
        )
      : 0;


  /* =========================================================
     ADD STUDENT
     ========================================================= */

  const handleAddStudent = () => {
    if (!currentBatch) {
      alert("Please select a batch first.");
      return;
    }

    setShowAddModal(false);
    setShowStartModal(true);
  };


  /* =========================================================
     START BATCH
     ========================================================= */

  const handleStartBatch = () => {
    const count = Number(studentCount);

    if (!count || count < 1) {
      alert("Please enter a valid student number.");
      return;
    }

    if (!currentBatch) {
      alert("Please select a batch first.");
      return;
    }

    const newStudents = Array.from(
      { length: count },
      (_, index) => ({
        id: "",
        name: "",
        roll: String(index + 1).padStart(2, "0"),
        batch: currentBatch.name,
        batchId: currentBatch.id,
        className: currentBatch.className,
        section: currentBatch.section,
        group: currentBatch.group,
        subject: currentBatch.subject,
        shift: currentBatch.shift,
        attendance: 0,
        average: 0,
        status: "Pending",
        isNew: true,
      })
    );

    setStudents((prev) => [
      ...newStudents,
      ...prev,
    ]);

    setStudentCount("");
    setShowStartModal(false);
  };


  /* =========================================================
     UPDATE STUDENT
     ========================================================= */

  const updateStudent = (index, field, value) => {
    setStudents((prev) => {

      const targetStudent =
        filteredStudents[index];

      if (!targetStudent) {
        return prev;
      }

      return prev.map((student) => {

        if (student === targetStudent) {
          return {
            ...student,
            [field]: value,
          };
        }

        return student;
      });
    });
  };


  /* =========================================================
     STUDENT DETAILS
     ========================================================= */

  const openStudentDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };


  /* =========================================================
     SUGGESTIONS
     ========================================================= */

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

  const sectionSuggestions = [
    "A",
    "B",
    "C",
    "D",
    "E",
  ];

  const groupSuggestions = [
    "Science",
    "Commerce",
    "Arts",
    "Humanities",
    "Business Studies",
    "Medical",
    "General",
  ];

  const shiftSuggestions = [
    "Morning",
    "Day",
    "Afternoon",
    "Evening",
  ];


  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className="dashboard-page teacher-students-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="teacher-students-header">

        <div>
          <p className="teacher-dashboard-eyebrow">
            Teacher Portal
          </p>

          <h1>My Students</h1>

          <p>
            Manage students assigned to your batches.
          </p>
        </div>


        <div className="teacher-students-header-actions">

          <button
            type="button"
            className="teacher-students-add-btn"
            onClick={() => setShowAddModal(true)}
          >
            + Add Students
          </button>

          <button
            type="button"
            className="teacher-students-start-btn"
            onClick={() => setShowStartModal(true)}
          >
            ▶ Start Batch
          </button>

          <button
            type="button"
            className="teacher-students-attendance-btn"
            onClick={() =>
              navigate("/teacher-attendance")
            }
          >
            ✓ Take Attendance
          </button>

        </div>

      </div>


      {/* =====================================================
          SUMMARY
          ===================================================== */}

      <div className="teacher-students-summary">

        <div className="teacher-student-summary-card">
          <span>Total Students</span>
          <strong>{filteredStudents.length}</strong>
          <small>Current view</small>
        </div>

        <div className="teacher-student-summary-card">
          <span>Excellent</span>
          <strong>{excellentCount}</strong>
          <small>Top performers</small>
        </div>

        <div className="teacher-student-summary-card">
          <span>Average Attendance</span>
          <strong>{averageAttendance}%</strong>
          <small>Current view</small>
        </div>

        <div className="teacher-student-summary-card">
          <span>Needs Attention</span>
          <strong>{attentionCount}</strong>
          <small>Require follow-up</small>
        </div>

      </div>


      {/* =====================================================
          SEARCH FILTER
          ===================================================== */}

      <div className="dashboard-panel teacher-students-filter-panel">

        <div className="teacher-students-filter">

          {/* CLASS */}

          <div className="teacher-student-filter-field">

            <label>Class</label>

            <input
              list="teacher-student-classes"
              type="text"
              placeholder="Search class..."
              value={searchClass}
              onChange={(e) =>
                setSearchClass(e.target.value)
              }
            />

            <datalist id="teacher-student-classes">
              {classSuggestions.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>

          </div>


          {/* SECTION */}

          <div className="teacher-student-filter-field">

            <label>Section</label>

            <input
              list="teacher-student-sections"
              type="text"
              placeholder="Search section..."
              value={searchSection}
              onChange={(e) =>
                setSearchSection(e.target.value)
              }
            />

            <datalist id="teacher-student-sections">
              {sectionSuggestions.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>

          </div>


          {/* GROUP */}

          <div className="teacher-student-filter-field">

            <label>Group</label>

            <input
              list="teacher-student-groups"
              type="text"
              placeholder="Search group..."
              value={searchGroup}
              onChange={(e) =>
                setSearchGroup(e.target.value)
              }
            />

            <datalist id="teacher-student-groups">
              {groupSuggestions.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>

          </div>


          {/* SHIFT */}

          <div className="teacher-student-filter-field">

            <label>Shift</label>

            <input
              list="teacher-student-shifts"
              type="text"
              placeholder="Search shift..."
              value={searchShift}
              onChange={(e) =>
                setSearchShift(e.target.value)
              }
            />

            <datalist id="teacher-student-shifts">
              {shiftSuggestions.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>

          </div>


          {/* BATCH */}

          <div className="teacher-student-filter-field">

            <label>Batch</label>

            <select
              value={selectedBatch}
              onChange={(e) => {

                const value = e.target.value;

                setSelectedBatch(value);

                if (value === "All Batches") {
                  navigate("/teacher-students");
                } else {
                  navigate(
                    `/teacher-students?batchId=${value}`
                  );
                }

              }}
            >

              <option value="All Batches">
                All Batches
              </option>

              {batches.map((batch) => (
                <option
                  key={batch.id}
                  value={batch.id}
                >
                  {batch.name}
                </option>
              ))}

            </select>

          </div>

        </div>

      </div>


      {/* =====================================================
          STUDENT TABLE
          ===================================================== */}

      <div className="dashboard-panel teacher-students-panel">

        <div className="panel-header">

          <div>

            <h2>
              {currentBatch
                ? `${currentBatch.name} Students`
                : "Student Directory"}
            </h2>

            <p>
              Showing {filteredStudents.length} of{" "}
              {students.length} students
            </p>

          </div>

          <span className="teacher-students-count">
            {filteredStudents.length} Students
          </span>

        </div>


        <div className="teacher-students-table-wrapper">

          <table className="teacher-students-table">

            <thead>

              <tr>
                <th>Roll</th>
                <th>Student</th>
                <th>Student ID</th>
                <th>Class</th>
                <th>Section</th>
                <th>Group</th>
                <th>Subject</th>
                <th>Shift</th>
                <th>Attendance</th>
                <th>Average</th>
                <th>Status</th>
              </tr>

            </thead>


            <tbody>

              {filteredStudents.map(
                (student, index) => (

                  <tr key={`${student.id}-${index}`}>

                    {/* ROLL */}

                    <td>

                      {student.isNew ? (
                        <input
                          className="teacher-inline-input"
                          value={student.roll}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "roll",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <span className="teacher-student-roll">
                          {student.roll}
                        </span>
                      )}

                    </td>


                    {/* STUDENT */}

                    <td>

                      <div className="teacher-student-name">

                        <div className="teacher-student-avatar">
                          {student.name
                            ? student.name
                                .charAt(0)
                                .toUpperCase()
                            : "?"}
                        </div>

                        <div>

                          {student.isNew ? (
                            <input
                              className="teacher-inline-input teacher-name-input"
                              placeholder="Student name"
                              value={student.name}
                              onChange={(e) =>
                                updateStudent(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            <strong>
                              {student.name}
                            </strong>
                          )}

                        </div>

                      </div>

                    </td>


                    {/* ID + EYE */}

                    <td>

                      <div className="teacher-student-id-action">

                        {student.isNew ? (
                          <input
                            className="teacher-inline-input"
                            placeholder="Student ID"
                            value={student.id}
                            onChange={(e) =>
                              updateStudent(
                                index,
                                "id",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <span className="teacher-student-id">
                            {student.id}
                          </span>
                        )}

                        <button
                          type="button"
                          className="teacher-student-eye-btn"
                          title="View student details"
                          onClick={() =>
                            openStudentDetails(student)
                          }
                        >
                          👁
                        </button>

                      </div>

                    </td>


                    {/* CLASS */}

                    <td>

                      {student.isNew ? (
                        <input
                          list="teacher-student-classes"
                          className="teacher-inline-input"
                          value={student.className}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "className",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        student.className
                      )}

                    </td>


                    {/* SECTION */}

                    <td>

                      {student.isNew ? (
                        <input
                          list="teacher-student-sections"
                          className="teacher-inline-input"
                          value={student.section}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "section",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        student.section
                      )}

                    </td>


                    {/* GROUP */}

                    <td>

                      {student.isNew ? (
                        <input
                          list="teacher-student-groups"
                          className="teacher-inline-input"
                          value={student.group}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "group",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        student.group
                      )}

                    </td>


                    {/* SUBJECT */}

                    <td>

                      {student.isNew ? (
                        <input
                          className="teacher-inline-input"
                          value={student.subject}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "subject",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        student.subject
                      )}

                    </td>


                    {/* SHIFT */}

                    <td>

                      {student.isNew ? (
                        <input
                          list="teacher-student-shifts"
                          className="teacher-inline-input"
                          value={student.shift}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "shift",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        student.shift
                      )}

                    </td>


                    {/* ATTENDANCE */}

<td>

  {student.isNew ? (
    <input
      type="number"
      min="0"
      max="100"
      className="teacher-inline-input teacher-number-input"
      value={student.attendance}
      onChange={(e) =>
        updateStudent(
          index,
          "attendance",
          e.target.value
        )
      }
    />
  ) : (

    <div
      className={`teacher-student-progress ${
        Number(student.attendance) >= 80
          ? "attendance-high"
          : Number(student.attendance) >= 70
          ? "attendance-good"
          : Number(student.attendance) >= 60
          ? "attendance-warning"
          : "attendance-low"
      }`}
    >

      <div className="teacher-student-progress-top">

        <strong>
          {student.attendance}%
        </strong>

      </div>

      <div className="teacher-student-progress-bar">

        <span
          style={{
            width: `${student.attendance}%`,
          }}
        ></span>

      </div>

    </div>

  )}

</td>


                    {/* AVERAGE */}

                    <td>

                      {student.isNew ? (
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className="teacher-inline-input teacher-number-input"
                          value={student.average}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "average",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <strong className="teacher-student-average">
                          {student.average}%
                        </strong>
                      )}

                    </td>


                    {/* STATUS */}

                    <td>

                      {student.isNew ? (
                        <input
                          className="teacher-inline-input"
                          value={student.status}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "status",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <span
                          className={`teacher-student-status ${student.status
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                        >
                          {student.status}
                        </span>
                      )}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>


          {filteredStudents.length === 0 && (

            <div className="teacher-students-empty">

              <strong>
                No students found
              </strong>

              <span>
                Try a different class, section,
                group, shift or batch.
              </span>

            </div>

          )}

        </div>

      </div>


      {/* =====================================================
          ADD STUDENTS MODAL
          ===================================================== */}

      {showAddModal && (

        <div
          className="teacher-student-modal-overlay"
          onClick={() => setShowAddModal(false)}
        >

          <div
            className="teacher-student-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="teacher-student-modal-header">

              <div>
                <span>Add Students</span>
                <h2>
                  Add students to batch
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>

            </div>


            <div className="teacher-student-modal-body">

              <p>
                First select a batch. Students
                will be connected to that batch.
              </p>

              <select
                value={selectedBatch}
                onChange={(e) =>
                  setSelectedBatch(e.target.value)
                }
              >

                <option value="All Batches">
                  Select Batch
                </option>

                {batches.map((batch) => (
                  <option
                    key={batch.id}
                    value={batch.id}
                  >
                    {batch.name}
                  </option>
                ))}

              </select>

            </div>


            <div className="teacher-student-modal-footer">

              <button
                type="button"
                className="teacher-modal-cancel-btn"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="teacher-modal-create-btn"
                onClick={handleAddStudent}
              >
                Continue
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          START BATCH MODAL
          ===================================================== */}

      {showStartModal && (

        <div
          className="teacher-student-modal-overlay"
          onClick={() => setShowStartModal(false)}
        >

          <div
            className="teacher-student-modal start-batch-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="teacher-student-modal-header">

              <div>

                <span>Start Batch</span>

                <h2>
                  How many students?
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowStartModal(false)
                }
              >
                ×
              </button>

            </div>


            <div className="teacher-student-modal-body">

              <label>
                Total Students
              </label>

              <input
                type="number"
                min="1"
                max="200"
                placeholder="Example: 40"
                value={studentCount}
                onChange={(e) =>
                  setStudentCount(e.target.value)
                }
              />

              {currentBatch && (

                <div className="teacher-start-batch-preview">

                  <strong>
                    {currentBatch.name}
                  </strong>

                  <span>
                    {currentBatch.className}
                    {" · "}
                    {currentBatch.group}
                    {" · "}
                    Section {currentBatch.section}
                    {" · "}
                    {currentBatch.shift}
                  </span>

                </div>

              )}

              <p>
                If you enter 40, 40 student rows
                will be created for this batch.
              </p>

            </div>


            <div className="teacher-student-modal-footer">

              <button
                type="button"
                className="teacher-modal-cancel-btn"
                onClick={() =>
                  setShowStartModal(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="teacher-modal-create-btn"
                onClick={handleStartBatch}
              >
                Create  Students
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          STUDENT DETAILS MODAL
          ===================================================== */}

      {showDetailsModal && selectedStudent && (

        <div
          className="teacher-student-modal-overlay"
          onClick={() =>
            setShowDetailsModal(false)
          }
        >

          <div
            className="teacher-student-modal student-details-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="teacher-student-modal-header">

              <div>

                <span>Student Profile</span>

                <h2>
                  {selectedStudent.name || "Student"}
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowDetailsModal(false)
                }
              >
                ×
              </button>

            </div>


            <div className="teacher-student-details-grid">

              <div>
                <span>Student ID</span>
                <strong>
                  {selectedStudent.id || "Not added"}
                </strong>
              </div>

              <div>
                <span>Roll</span>
                <strong>
                  {selectedStudent.roll || "—"}
                </strong>
              </div>

              <div>
                <span>Class</span>
                <strong>
                  {selectedStudent.className || "—"}
                </strong>
              </div>

              <div>
                <span>Section</span>
                <strong>
                  {selectedStudent.section || "—"}
                </strong>
              </div>

              <div>
                <span>Group</span>
                <strong>
                  {selectedStudent.group || "—"}
                </strong>
              </div>

              <div>
                <span>Subject</span>
                <strong>
                  {selectedStudent.subject || "—"}
                </strong>
              </div>

              <div>
                <span>Shift</span>
                <strong>
                  {selectedStudent.shift || "—"}
                </strong>
              </div>

              <div>
                <span>Batch</span>
                <strong>
                  {selectedStudent.batch || "—"}
                </strong>
              </div>

              <div>
                <span>Attendance</span>
                <strong>
                  {selectedStudent.attendance}%
                </strong>
              </div>

              <div>
                <span>Average</span>
                <strong>
                  {selectedStudent.average}%
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {selectedStudent.status}
                </strong>
              </div>

            </div>


            <div className="teacher-student-modal-footer">

              <button
                type="button"
                className="teacher-modal-create-btn"
                onClick={() =>
                  setShowDetailsModal(false)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default TeacherStudents;