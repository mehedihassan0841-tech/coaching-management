import { useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { teachers as initialTeachers } from "../data/mockData";
import "../styles/admin-teachers.css";


/* =========================================================
   DEFAULT SUGGESTIONS
   এগুলো শুধু suggestion — বাধ্যতামূলক নয়
========================================================= */

const groupSuggestions = [
  "Science",
  "Commerce",
  "Arts",
  "Humanities",
  "Business Studies",
  "Medical",
  "General",
  "Others",
];

const sectionSuggestions = [
  "A",
  "B",
  "C",
  "D",
  "Morning",
  "Day",
  "Evening",
  "Red",
  "Blue",
];

const subjectSuggestions = [
  "Physics",
  "Chemistry",
  "Biology",
  "Higher Mathematics",
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

const classSuggestions = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];


/* =========================================================
   PREPARE EXISTING TEACHERS
========================================================= */

const preparedTeachers = initialTeachers.map(
  (teacher, index) => {

    const subjects = Array.isArray(
      teacher.subjects
    )
      ? teacher.subjects
      : teacher.subject
        ? String(teacher.subject)
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

    const classes = Array.isArray(
      teacher.classes
    )
      ? teacher.classes
      : teacher.classes
        ? String(teacher.classes)
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

    return {
      ...teacher,

      teacherId:
        teacher.teacherId ||
        `T-${String(index + 1).padStart(3, "0")}`,

      group:
        teacher.group || "Science",

      section:
        teacher.section || "A",

      subjects,

      classes,
    };
  }
);


function Teachers() {

  const [teachers, setTeachers] =
    useState(preparedTeachers);


  /* =========================================================
     TABLE SEARCH
  ========================================================= */

  const [search, setSearch] = useState({
    name: "",
    group: "",
    idClass: "",
  });


  /* =========================================================
     ANALYTICS FILTER
  ========================================================= */

  const [analyticsFilter, setAnalyticsFilter] =
    useState({
      className: "All Classes",
      group: "All Groups",
      section: "All Sections",
      subject: "All Subjects",
    });


  /* =========================================================
     MODAL
  ========================================================= */

  const [showModal, setShowModal] =
    useState(false);


  /* =========================================================
     DROPDOWN
  ========================================================= */

  const [openDropdown, setOpenDropdown] =
    useState(null);


  /* =========================================================
     FORM
  ========================================================= */

  const [form, setForm] = useState({
    name: "",
    group: "",
    section: "",
    subjects: [],
    classes: [],
    phone: "",
  });


  /* =========================================================
     MANUAL INPUT STATES
  ========================================================= */

  const [groupInput, setGroupInput] =
    useState("");

  const [sectionInput, setSectionInput] =
    useState("");

  const [subjectInput, setSubjectInput] =
    useState("");

  const [classInput, setClassInput] =
    useState("");


  /* =========================================================
     SUGGESTION VISIBILITY
  ========================================================= */

  const [activeSuggestion, setActiveSuggestion] =
    useState(null);


  /* =========================================================
     TABLE FILTER
  ========================================================= */

  const filtered = teachers.filter(
    (teacher) => {

      const teacherName =
        String(
          teacher.name || ""
        ).toLowerCase();

      const teacherGroup =
        String(
          teacher.group || ""
        ).toLowerCase();

      const teacherId =
        String(
          teacher.teacherId || ""
        ).toLowerCase();

      const teacherClasses =
        Array.isArray(
          teacher.classes
        )
          ? teacher.classes
              .join(" ")
              .toLowerCase()
          : String(
              teacher.classes || ""
            ).toLowerCase();


      const nameMatch =
        !search.name.trim() ||
        teacherName.includes(
          search.name
            .trim()
            .toLowerCase()
        );


      const groupMatch =
        !search.group.trim() ||
        teacherGroup.includes(
          search.group
            .trim()
            .toLowerCase()
        );


      const idClassMatch =
        !search.idClass.trim() ||
        teacherId.includes(
          search.idClass
            .trim()
            .toLowerCase()
        ) ||
        teacherClasses.includes(
          search.idClass
            .trim()
            .toLowerCase()
        );


      return (
        nameMatch &&
        groupMatch &&
        idClassMatch
      );
    }
  );


  /* =========================================================
     ANALYTICS FILTERED TEACHERS
  ========================================================= */

  const analyticsTeachers =
    teachers.filter(
      (teacher) => {

        const teacherClasses =
          Array.isArray(
            teacher.classes
          )
            ? teacher.classes
            : [];

        const teacherSubjects =
          Array.isArray(
            teacher.subjects
          )
            ? teacher.subjects
            : [];


        const classMatch =
          analyticsFilter.className ===
            "All Classes" ||
          teacherClasses.includes(
            analyticsFilter.className
          );


        const groupMatch =
          analyticsFilter.group ===
            "All Groups" ||
          teacher.group ===
            analyticsFilter.group;


        const sectionMatch =
          analyticsFilter.section ===
            "All Sections" ||
          teacher.section ===
            analyticsFilter.section;


        const subjectMatch =
          analyticsFilter.subject ===
            "All Subjects" ||
          teacherSubjects.includes(
            analyticsFilter.subject
          );


        return (
          classMatch &&
          groupMatch &&
          sectionMatch &&
          subjectMatch
        );
      }
    );


  /* =========================================================
     ALL SUBJECTS
  ========================================================= */

  const allSubjects =
    Array.from(
      new Set(
        teachers.flatMap(
          (teacher) =>
            Array.isArray(
              teacher.subjects
            )
              ? teacher.subjects
              : []
        )
      )
    );


  /* =========================================================
     SUBJECT CHART
  ========================================================= */

  const subjectChartData =
    allSubjects
      .map((subject) => {

        const count =
          analyticsTeachers.filter(
            (teacher) => {

              const subjects =
                Array.isArray(
                  teacher.subjects
                )
                  ? teacher.subjects
                  : [];

              return subjects.includes(
                subject
              );
            }
          ).length;


        return {
          subject,
          teachers: count,
        };
      })
      .filter(
        (item) =>
          item.teachers > 0
      );


  /* =========================================================
     CLASS + GROUP CHART
  ========================================================= */

  const classAnalyticsMap = {};


  analyticsTeachers.forEach(
    (teacher) => {

      const classes =
        Array.isArray(
          teacher.classes
        )
          ? teacher.classes
          : [];


      classes.forEach(
        (className) => {

          const key =
            `${className} • ${
              teacher.group || "Others"
            }`;


          if (
            !classAnalyticsMap[key]
          ) {

            classAnalyticsMap[key] = {
              className,
              group:
                teacher.group ||
                "Others",
              assignments: 0,
            };
          }


          classAnalyticsMap[key]
            .assignments += 1;
        }
      );
    }
  );


  const classChartData =
    Object.values(
      classAnalyticsMap
    );


  /* =========================================================
     ANALYTICS STATS
  ========================================================= */

  const totalAnalyticsTeachers =
    analyticsTeachers.length;


  const totalSubjectAssignments =
    analyticsTeachers.reduce(
      (total, teacher) =>
        total +
        (
          Array.isArray(
            teacher.subjects
          )
            ? teacher.subjects.length
            : 0
        ),
      0
    );


  const totalClassAssignments =
    analyticsTeachers.reduce(
      (total, teacher) =>
        total +
        (
          Array.isArray(
            teacher.classes
          )
            ? teacher.classes.length
            : 0
        ),
      0
    );


  const uniqueAnalyticsSubjects =
    new Set(
      analyticsTeachers.flatMap(
        (teacher) =>
          Array.isArray(
            teacher.subjects
          )
            ? teacher.subjects
            : []
      )
    ).size;


  /* =========================================================
     GROUP SUGGESTIONS
  ========================================================= */

  const filteredGroupSuggestions =
    groupSuggestions.filter(
      (item) =>
        !groupInput.trim() ||
        item
          .toLowerCase()
          .includes(
            groupInput
              .trim()
              .toLowerCase()
          )
    );


  /* =========================================================
     SECTION SUGGESTIONS
  ========================================================= */

  const filteredSectionSuggestions =
    sectionSuggestions.filter(
      (item) =>
        !sectionInput.trim() ||
        item
          .toLowerCase()
          .includes(
            sectionInput
              .trim()
              .toLowerCase()
          )
    );


  /* =========================================================
     SUBJECT SUGGESTIONS
  ========================================================= */

  const filteredSubjectSuggestions =
    subjectSuggestions.filter(
      (item) =>
        !subjectInput.trim() ||
        item
          .toLowerCase()
          .includes(
            subjectInput
              .trim()
              .toLowerCase()
          )
    );


  /* =========================================================
     CLASS SUGGESTIONS
  ========================================================= */

  const filteredClassSuggestions =
    classSuggestions.filter(
      (item) =>
        !classInput.trim() ||
        item
          .toLowerCase()
          .includes(
            classInput
              .trim()
              .toLowerCase()
          )
    );


  /* =========================================================
     GROUP SELECT
  ========================================================= */

  function selectGroup(value) {

    setForm((prev) => ({
      ...prev,
      group: value,
    }));

    setGroupInput(value);

    setActiveSuggestion(null);
  }


  /* =========================================================
     SECTION SELECT
  ========================================================= */

  function selectSection(value) {

    setForm((prev) => ({
      ...prev,
      section: value,
    }));

    setSectionInput(value);

    setActiveSuggestion(null);
  }


  /* =========================================================
     SUBJECT SELECT
  ========================================================= */

  function addSubject(value) {

    const cleanValue =
      value.trim();

    if (!cleanValue) return;


    setForm((prev) => {

      if (
        prev.subjects.includes(
          cleanValue
        )
      ) {
        return prev;
      }

      return {
        ...prev,
        subjects: [
          ...prev.subjects,
          cleanValue,
        ],
      };
    });


    setSubjectInput("");

    setActiveSuggestion(null);
  }


  /* =========================================================
     CLASS SELECT
  ========================================================= */

  function addClass(value) {

    const cleanValue =
      value.trim();

    if (!cleanValue) return;


    setForm((prev) => {

      if (
        prev.classes.includes(
          cleanValue
        )
      ) {
        return prev;
      }

      return {
        ...prev,
        classes: [
          ...prev.classes,
          cleanValue,
        ],
      };
    });


    setClassInput("");

    setActiveSuggestion(null);
  }


  /* =========================================================
     REMOVE SUBJECT
  ========================================================= */

  function removeSubject(subject) {

    setForm((prev) => ({
      ...prev,

      subjects:
        prev.subjects.filter(
          (item) =>
            item !== subject
        ),
    }));
  }


  /* =========================================================
     REMOVE CLASS
  ========================================================= */

  function removeClass(className) {

    setForm((prev) => ({
      ...prev,

      classes:
        prev.classes.filter(
          (item) =>
            item !== className
        ),
    }));
  }


  /* =========================================================
     GROUP INPUT
  ========================================================= */

  function handleGroupInput(value) {

    setGroupInput(value);

    setForm((prev) => ({
      ...prev,
      group: value,
    }));

    setActiveSuggestion(
      "group"
    );
  }


  /* =========================================================
     SECTION INPUT
  ========================================================= */

  function handleSectionInput(value) {

    setSectionInput(value);

    setForm((prev) => ({
      ...prev,
      section: value,
    }));

    setActiveSuggestion(
      "section"
    );
  }


  /* =========================================================
     SUBJECT INPUT
  ========================================================= */

  function handleSubjectInput(value) {

    setSubjectInput(value);

    setActiveSuggestion(
      "subject"
    );
  }


  /* =========================================================
     CLASS INPUT
  ========================================================= */

  function handleClassInput(value) {

    setClassInput(value);

    setActiveSuggestion(
      "class"
    );
  }


  /* =========================================================
     ADD TEACHER
  ========================================================= */

  function handleAdd(e) {

    e.preventDefault();


    const finalGroup =
      form.group.trim();

    const finalSection =
      form.section.trim();


    const finalSubjects =
      form.subjects.length > 0
        ? form.subjects
        : subjectInput.trim()
          ? [subjectInput.trim()]
          : [];


    const finalClasses =
      form.classes.length > 0
        ? form.classes
        : classInput.trim()
          ? [classInput.trim()]
          : [];


    if (
      !form.name.trim()
    ) {
      return;
    }


    if (!finalGroup) {
      return;
    }


    if (!finalSection) {
      return;
    }


    if (
      finalSubjects.length === 0
    ) {
      return;
    }


    if (
      finalClasses.length === 0
    ) {
      return;
    }


    const nextTeacherNumber =
      teachers.length + 1;


    const newTeacherId =
      `T-${String(
        nextTeacherNumber
      ).padStart(3, "0")}`;


    const newTeacher = {

      id: Date.now(),

      teacherId:
        newTeacherId,

      name:
        form.name.trim(),

      group:
        finalGroup,

      section:
        finalSection,

      subject:
        finalSubjects.join(", "),

      subjects:
        finalSubjects,

      classes:
        finalClasses,

      phone:
        form.phone.trim(),

      status:
        "Active",

      joined:
        "Sep 2026",
    };


    setTeachers(
      (prev) => [
        ...prev,
        newTeacher,
      ]
    );


    resetForm();

    setShowModal(false);
  }


  /* =========================================================
     RESET FORM
  ========================================================= */

  function resetForm() {

    setForm({
      name: "",
      group: "",
      section: "",
      subjects: [],
      classes: [],
      phone: "",
    });

    setGroupInput("");

    setSectionInput("");

    setSubjectInput("");

    setClassInput("");

    setActiveSuggestion(null);

    setOpenDropdown(null);
  }


  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  function closeModal() {

    setShowModal(false);

    resetForm();
  }


  /* =========================================================
     OPEN MODAL
  ========================================================= */

  function openModal() {

    resetForm();

    setShowModal(true);
  }


  return (

    <div className="page-block ">


      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="student-summary">

        <div className="summary-box">

          <span>
            Total Teachers
          </span>

          <strong>
            {teachers.length}
          </strong>

        </div>


        <div className="summary-box">

          <span>
            Active
          </span>

          <strong>
            {
              teachers.filter(
                (teacher) =>
                  teacher.status ===
                  "Active"
              ).length
            }
          </strong>

        </div>


        <div className="summary-box">

          <span>
            On Leave
          </span>

          <strong>
            {
              teachers.filter(
                (teacher) =>
                  teacher.status ===
                  "On Leave"
              ).length
            }
          </strong>

        </div>

      </div>



      {/* =====================================================
          ANALYTICS
      ===================================================== */}

      <div className="teacher-analytics">


        <div className="teacher-analytics-header">

          <div>

            <span className="analytics-kicker">
              TEACHER INTELLIGENCE
            </span>

            <h2>
              Teaching Distribution
            </h2>

            <p>
              Monitor teacher availability across
              classes, groups, sections and subjects.
            </p>

          </div>


          <div className="analytics-live-badge">
            Live Overview
          </div>

        </div>



        {/* FILTERS */}

        <div className="teacher-analytics-filters">

          <div className="analytics-filter-field">

            <label>
              Class
            </label>

            <select
              value={
                analyticsFilter.className
              }
              onChange={(e) =>
                setAnalyticsFilter({
                  ...analyticsFilter,
                  className:
                    e.target.value,
                })
              }
            >

              <option>
                All Classes
              </option>

              {classSuggestions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}

            </select>

          </div>



          <div className="analytics-filter-field">

            <label>
              Group
            </label>

            <select
              value={
                analyticsFilter.group
              }
              onChange={(e) =>
                setAnalyticsFilter({
                  ...analyticsFilter,
                  group:
                    e.target.value,
                  subject:
                    "All Subjects",
                })
              }
            >

              <option>
                All Groups
              </option>

              {groupSuggestions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}

            </select>

          </div>



          <div className="analytics-filter-field">

            <label>
              Section
            </label>

            <select
              value={
                analyticsFilter.section
              }
              onChange={(e) =>
                setAnalyticsFilter({
                  ...analyticsFilter,
                  section:
                    e.target.value,
                })
              }
            >

              <option>
                All Sections
              </option>

              {sectionSuggestions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}

            </select>

          </div>



          <div className="analytics-filter-field">

            <label>
              Subject
            </label>

            <select
              value={
                analyticsFilter.subject
              }
              onChange={(e) =>
                setAnalyticsFilter({
                  ...analyticsFilter,
                  subject:
                    e.target.value,
                })
              }
            >

              <option>
                All Subjects
              </option>

              {allSubjects.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}

            </select>

          </div>

        </div>



        {/* STATS */}

        <div className="teacher-analytics-stats">

          <div className="analytics-stat">

            <span>
              TEACHERS
            </span>

            <strong>
              {totalAnalyticsTeachers}
            </strong>

            <small>
              Matching filter
            </small>

          </div>


          <div className="analytics-stat">

            <span>
              SUBJECTS
            </span>

            <strong>
              {uniqueAnalyticsSubjects}
            </strong>

            <small>
              Assigned subjects
            </small>

          </div>


          <div className="analytics-stat">

            <span>
              SUBJECT ASSIGNMENTS
            </span>

            <strong>
              {totalSubjectAssignments}
            </strong>

            <small>
              Across selected teachers
            </small>

          </div>


          <div className="analytics-stat">

            <span>
              CLASS ASSIGNMENTS
            </span>

            <strong>
              {totalClassAssignments}
            </strong>

            <small>
              Teaching assignments
            </small>

          </div>

        </div>



        {/* CHARTS */}

        <div className="teacher-chart-grid">


          {/* SUBJECT */}

          <div className="teacher-chart-card">

            <div className="chart-card-header">

              <div>

                <span>
                  SUBJECT LOAD
                </span>

                <h3>
                  Teachers by Subject
                </h3>

              </div>

              <span className="chart-info">
                Count
              </span>

            </div>


            <div className="teacher-chart">

              {subjectChartData.length >
              0 ? (

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={
                      subjectChartData
                    }
                    margin={{
                      top: 10,
                      right: 10,
                      left: -18,
                      bottom: 5,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(148,163,184,0.18)"
                    />

                    <XAxis
                      dataKey="subject"
                      tick={{
                        fontSize: 10,
                        fill: "#64748b",
                      }}
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                    />

                    <YAxis
                      allowDecimals={false}
                      tick={{
                        fontSize: 10,
                        fill: "#64748b",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border:
                          "1px solid rgba(99,102,241,.15)",
                        background:
                          "rgba(255,255,255,.95)",
                        fontSize: 11,
                      }}
                    />

                    <Bar
                      dataKey="teachers"
                      name="Teachers"
                      fill="#6366f1"
                      radius={[
                        7,
                        7,
                        0,
                        0,
                      ]}
                      maxBarSize={34}
                    />

                  </BarChart>

                </ResponsiveContainer>

              ) : (

                <div className="chart-empty">
                  No teacher data for this filter.
                </div>

              )}

            </div>

          </div>



          {/* CLASS GROUP */}

          <div className="teacher-chart-card">

            <div className="chart-card-header">

              <div>

                <span>
                  CLASS COVERAGE
                </span>

                <h3>
                  Class & Group Distribution
                </h3>

              </div>

              <span className="chart-info">
                Assignments
              </span>

            </div>


            <div className="teacher-chart">

              {classChartData.length >
              0 ? (

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={
                      classChartData
                    }
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 20,
                      left: 10,
                      bottom: 5,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="rgba(148,163,184,0.18)"
                    />

                    <XAxis
                      type="number"
                      allowDecimals={false}
                      tick={{
                        fontSize: 10,
                        fill: "#64748b",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      type="category"
                      dataKey="className"
                      width={65}
                      tick={{
                        fontSize: 10,
                        fill: "#475569",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      formatter={(
                        value,
                        name,
                        props
                      ) => [
                        value,
                        `Assignments • ${
                          props.payload.group
                        }`,
                      ]}
                      contentStyle={{
                        borderRadius: 12,
                        border:
                          "1px solid rgba(6,182,212,.15)",
                        background:
                          "rgba(255,255,255,.95)",
                        fontSize: 11,
                      }}
                    />

                    <Bar
                      dataKey="assignments"
                      name="Assignments"
                      fill="#06b6d4"
                      radius={[
                        0,
                        7,
                        7,
                        0,
                      ]}
                      maxBarSize={22}
                    />

                  </BarChart>

                </ResponsiveContainer>

              ) : (

                <div className="chart-empty">
                  No class assignment data.
                </div>

              )}

            </div>

          </div>

        </div>



        {/* DISTRIBUTION */}

        <div className="teacher-distribution-list">

          <div className="distribution-header">

            <div>

              <span>
                DETAILED VIEW
              </span>

              <h3>
                Subject-wise Teacher Distribution
              </h3>

            </div>

            <span>
              {subjectChartData.length} subjects
            </span>

          </div>


          <div className="distribution-items">

            {subjectChartData.length >
            0 ? (

              subjectChartData.map(
                (item, index) => {

                  const maxValue =
                    Math.max(
                      ...subjectChartData.map(
                        (entry) =>
                          entry.teachers
                      )
                    );


                  return (

                    <div
                      className="distribution-item"
                      key={
                        item.subject
                      }
                    >

                      <div className="distribution-number">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </div>


                      <div className="distribution-name">

                        <strong>
                          {item.subject}
                        </strong>

                        <div className="distribution-track">

                          <span
                            style={{
                              width:
                                maxValue
                                  ? `${
                                      (
                                        item.teachers /
                                        maxValue
                                      ) *
                                      100
                                    }%`
                                  : "0%",
                            }}
                          />

                        </div>

                      </div>


                      <div className="distribution-count">

                        <strong>
                          {item.teachers}
                        </strong>

                        <span>
                          teacher
                          {item.teachers !==
                          1
                            ? "s"
                            : ""}
                        </span>

                      </div>

                    </div>

                  );
                }
              )

            ) : (

              <div className="distribution-empty">
                No subject data available.
              </div>

            )}

          </div>

        </div>

      </div>



      {/* =====================================================
          TEACHER DIRECTORY
      ===================================================== */}

      <div className="students-container">


        <div className="students-container-header">

          <div>

            <span className="section-kicker">
              TEACHER DIRECTORY
            </span>

            <h2>
              All Teachers
            </h2>

            <p>
              Teaching staff, groups, sections,
              subjects and classes
            </p>

          </div>


          <div className="header-actions">

            <input
              type="text"
              placeholder="Search Name..."
              className="student-search"
              value={
                search.name
              }
              onChange={(e) =>
                setSearch({
                  ...search,
                  name:
                    e.target.value,
                })
              }
            />


            <input
              type="text"
              placeholder="Search Group..."
              className="student-search"
              value={
                search.group
              }
              onChange={(e) =>
                setSearch({
                  ...search,
                  group:
                    e.target.value,
                })
              }
            />


            <input
              type="text"
              placeholder="Search ID / Class..."
              className="student-search"
              value={
                search.idClass
              }
              onChange={(e) =>
                setSearch({
                  ...search,
                  idClass:
                    e.target.value,
                })
              }
            />


            <button
              className="add-student-btn"
              onClick={
                openModal
              }
            >
              + Add Teacher
            </button>

          </div>

        </div>



        <div className="teacher-result-info">

          Showing{" "}
          <strong>
            {filtered.length}
          </strong>{" "}
          of{" "}
          <strong>
            {teachers.length}
          </strong>{" "}
          teachers

        </div>



        {/* TABLE */}

        <div className="table-wrap teacher-table-scroll">

          <table className="data-table">

            <thead>

              <tr>

                <th>
                  Teacher ID
                </th>

                <th>
                  Name
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
                  Classes
                </th>

                <th>
                  Phone
                </th>

                <th>
                  Joined
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {filtered.map(
                (teacher) => (

                  <tr
                    key={
                      teacher.id
                    }
                  >

                    <td>

                      <div className="teacher-id-action">

                        <span className="teacher-id">
                          {
                            teacher.teacherId
                          }
                        </span>

                        <button
                          type="button"
                          className="teacher-view-btn"
                          title="View teacher portfolio"
                          onClick={() =>
                            console.log(
                              "View teacher:",
                              teacher.teacherId
                            )
                          }
                        >
                          👁
                        </button>

                      </div>

                    </td>


                    <td className="cell-name">

                      <span className="mini-avatar">

                        {teacher.name
                          .split(" ")
                          .map(
                            (word) =>
                              word[0]
                          )
                          .slice(
                            0,
                            2
                          )
                          .join("")
                          .toUpperCase()}

                      </span>

                      {
                        teacher.name
                      }

                    </td>


                    <td>

                      <span className="group-badge">
                        {
                          teacher.group ||
                          "—"
                        }
                      </span>

                    </td>


                    <td>

                      <span className="section-badge">
                        {
                          teacher.section ||
                          "—"
                        }
                      </span>

                    </td>


                    <td className="compact-list-cell">

                      {teacher.subjects?.length >
                      0
                        ? teacher.subjects.map(
                            (
                              subject,
                              index
                            ) => (

                              <span
                                key={`${subject}-${index}`}
                              >

                                {
                                  subject
                                }

                                {index <
                                  teacher.subjects.length -
                                    1 && (
                                  <br />
                                )}

                              </span>

                            )
                          )
                        : "—"}

                    </td>


                    <td className="compact-list-cell">

                      {teacher.classes?.length >
                      0
                        ? teacher.classes.map(
                            (
                              className,
                              index
                            ) => (

                              <span
                                key={`${className}-${index}`}
                              >

                                {
                                  className
                                }

                                {index <
                                  teacher.classes.length -
                                    1 && (
                                  <br />
                                )}

                              </span>

                            )
                          )
                        : "—"}

                    </td>


                    <td>
                      {
                        teacher.phone ||
                        "—"
                      }
                    </td>


                    <td>
                      {
                        teacher.joined ||
                        "—"
                      }
                    </td>


                    <td>

                      <span
                        className={`badge ${
                          teacher.status ===
                          "Active"
                            ? "badge-active"
                            : "badge-pending"
                        }`}
                      >
                        {
                          teacher.status
                        }
                      </span>

                    </td>

                  </tr>
                )
              )}


              {filtered.length ===
                0 && (

                <tr>

                  <td
                    colSpan="9"
                    className="empty-state"
                  >
                    No teacher found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>



      {/* =====================================================
          ADD TEACHER MODAL
      ===================================================== */}

      {showModal && (

        <div
          className="modal-backdrop"
          onClick={
            closeModal
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            <div className="modal-header">

              <div>

                <h2>
                  Add New Teacher
                </h2>

                <p>
                  Add teacher information and
                  teaching assignments.
                </p>

              </div>


              <button
                type="button"
                className="modal-close"
                onClick={
                  closeModal
                }
              >
                ×
              </button>

            </div>



            <form
              onSubmit={
                handleAdd
              }
            >


              {/* NAME */}

              <label>

                Full Name

                <input
                  type="text"
                  value={
                    form.name
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name:
                        e.target.value,
                    })
                  }
                  placeholder="e.g. Jasim Uddin"
                  autoFocus
                />

              </label>



              {/* =================================================
                  GROUP MANUAL INPUT
              ================================================= */}

              <div className="custom-select-field">

                <span className="field-label">
                  Group
                </span>


                <input
                  type="text"
                  className="suggestion-input"
                  value={
                    groupInput
                  }
                  placeholder="Type group..."
                  onFocus={() =>
                    setActiveSuggestion(
                      "group"
                    )
                  }
                  onChange={(e) =>
                    handleGroupInput(
                      e.target.value
                    )
                  }
                  autoComplete="off"
                />


                {activeSuggestion ===
                  "group" &&
                  filteredGroupSuggestions.length >
                    0 && (

                    <div className="live-suggestions">

                      {filteredGroupSuggestions.map(
                        (item) => (

                          <button
                            type="button"
                            key={item}
                            className="suggestion-option"
                            onMouseDown={(e) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              selectGroup(
                                item
                              )
                            }
                          >

                            <span>
                              {item}
                            </span>

                            {form.group ===
                              item && (
                              <span>
                                ✓
                              </span>
                            )}

                          </button>

                        )
                      )}

                    </div>

                  )}

              </div>



              {/* =================================================
                  SECTION MANUAL INPUT
              ================================================= */}

              <div className="custom-select-field">

                <span className="field-label">
                  Section
                </span>


                <input
                  type="text"
                  className="suggestion-input"
                  value={
                    sectionInput
                  }
                  placeholder="Type section..."
                  onFocus={() =>
                    setActiveSuggestion(
                      "section"
                    )
                  }
                  onChange={(e) =>
                    handleSectionInput(
                      e.target.value
                    )
                  }
                  autoComplete="off"
                />


                {activeSuggestion ===
                  "section" &&
                  filteredSectionSuggestions.length >
                    0 && (

                    <div className="live-suggestions">

                      {filteredSectionSuggestions.map(
                        (item) => (

                          <button
                            type="button"
                            key={item}
                            className="suggestion-option"
                            onMouseDown={(e) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              selectSection(
                                item
                              )
                            }
                          >

                            <span>
                              {item}
                            </span>

                            {form.section ===
                              item && (
                              <span>
                                ✓
                              </span>
                            )}

                          </button>

                        )
                      )}

                    </div>

                  )}

              </div>



              {/* =================================================
                  SUBJECT MANUAL INPUT
              ================================================= */}

              <div className="custom-select-field">

                <span className="field-label">
                  Subjects
                </span>


                <input
                  type="text"
                  className="suggestion-input"
                  value={
                    subjectInput
                  }
                  placeholder="Type subject..."
                  onFocus={() =>
                    setActiveSuggestion(
                      "subject"
                    )
                  }
                  onChange={(e) =>
                    handleSubjectInput(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {

                    if (
                      e.key ===
                      "Enter"
                    ) {

                      e.preventDefault();

                      addSubject(
                        subjectInput
                      );
                    }

                  }}
                  autoComplete="off"
                />


                {activeSuggestion ===
                  "subject" &&
                  filteredSubjectSuggestions.length >
                    0 && (

                    <div className="live-suggestions">

                      {filteredSubjectSuggestions.map(
                        (item) => (

                          <button
                            type="button"
                            key={item}
                            className="suggestion-option"
                            onMouseDown={(e) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              addSubject(
                                item
                              )
                            }
                          >

                            <span>
                              {item}
                            </span>

                            <span>
                              +
                            </span>

                          </button>

                        )
                      )}

                    </div>

                  )}

              </div>



              {/* SELECTED SUBJECTS */}

              {form.subjects.length >
                0 && (

                <div className="selected-tags">

                  {form.subjects.map(
                    (subject) => (

                      <span
                        className="selected-tag"
                        key={subject}
                      >

                        {subject}

                        <button
                          type="button"
                          onClick={() =>
                            removeSubject(
                              subject
                            )
                          }
                        >
                          ×
                        </button>

                      </span>

                    )
                  )}

                </div>

              )}



              {/* =================================================
                  CLASSES MANUAL INPUT
              ================================================= */}

              <div className="custom-select-field">

                <span className="field-label">
                  Classes
                </span>


                <input
                  type="text"
                  className="suggestion-input"
                  value={
                    classInput
                  }
                  placeholder="Type class..."
                  onFocus={() =>
                    setActiveSuggestion(
                      "class"
                    )
                  }
                  onChange={(e) =>
                    handleClassInput(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {

                    if (
                      e.key ===
                      "Enter"
                    ) {

                      e.preventDefault();

                      addClass(
                        classInput
                      );
                    }

                  }}
                  autoComplete="off"
                />


                {activeSuggestion ===
                  "class" &&
                  filteredClassSuggestions.length >
                    0 && (

                    <div className="live-suggestions">

                      {filteredClassSuggestions.map(
                        (item) => (

                          <button
                            type="button"
                            key={item}
                            className="suggestion-option"
                            onMouseDown={(e) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              addClass(
                                item
                              )
                            }
                          >

                            <span>
                              {item}
                            </span>

                            <span>
                              +
                            </span>

                          </button>

                        )
                      )}

                    </div>

                  )}

              </div>



              {/* SELECTED CLASSES */}

              {form.classes.length >
                0 && (

                <div className="selected-tags">

                  {form.classes.map(
                    (className) => (

                      <span
                        className="selected-tag"
                        key={className}
                      >

                        {className}

                        <button
                          type="button"
                          onClick={() =>
                            removeClass(
                              className
                            )
                          }
                        >
                          ×
                        </button>

                      </span>

                    )
                  )}

                </div>

              )}



              {/* PHONE */}

              <label>

                Phone

                <input
                  type="text"
                  value={
                    form.phone
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone:
                        e.target.value,
                    })
                  }
                  placeholder="01XXX-XXXXXX"
                />

              </label>



              {/* ACTIONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={
                    closeModal
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Teacher
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


export default Teachers;