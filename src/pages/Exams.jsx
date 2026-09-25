import { useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { exams, examResults } from "../data/mockData";
import "../styles/admin-exams.css";


// ======================================================
// DEMO CHART DATA
// ======================================================

const examTrendData = [
  { month: "Jan", exams: 4, average: 72 },
  { month: "Feb", exams: 6, average: 76 },
  { month: "Mar", exams: 5, average: 74 },
  { month: "Apr", exams: 7, average: 79 },
  { month: "May", exams: 6, average: 77 },
  { month: "Jun", exams: 8, average: 82 },
  { month: "Jul", exams: 5, average: 78 },
  { month: "Aug", exams: 9, average: 84 },
  { month: "Sep", exams: 7, average: 81 },
  { month: "Oct", exams: 8, average: 83 },
  { month: "Nov", exams: 6, average: 80 },
  { month: "Dec", exams: 9, average: 86 },
];

const subjectPerformance = [
  { subject: "Physics", average: 78 },
  { subject: "Chemistry", average: 82 },
  { subject: "Biology", average: 74 },
  { subject: "Math", average: 86 },
  { subject: "English", average: 81 },
];

const examTypeData = [
  { name: "CT", value: 32 },
  { name: "MT", value: 24 },
  { name: "Term", value: 18 },
  { name: "Special", value: 10 },
];

const filterOptions = [
  "All",
  "CT",
  "MT",
  "Term Exam",
  "Half-Yearly",
  "Final",
  "Model Test",
  "Special",
  "Mock Test",
];

const examTypeSuggestions = [
  "CT",
  "MT",
  "ST",
  "Weekly Test",
  "Monthly Test",
  "Mid Term",
  "Half-Yearly",
  "Annual",
  "Final Exam",
  "Model Test",
  "Viva",
  "Practical",
  "Special Exam",
  "Mock Test",
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


// ======================================================
// INITIAL ASSESSMENT CONFIGURATION
// ======================================================

const initialAssessmentTypes = [
  {
    id: "ASM-001",
    name: "CT",
    description: "Class Test",
    totalMarks: 15,
    components: [
      {
        id: "CMP-001",
        name: "Written",
        marks: 15,
      },
    ],
    status: "Active",
  },

  {
    id: "ASM-002",
    name: "MT",
    description: "Monthly Test",
    totalMarks: 20,
    components: [
      {
        id: "CMP-002",
        name: "Written",
        marks: 20,
      },
    ],
    status: "Active",
  },

  {
    id: "ASM-003",
    name: "Mid Term",
    description: "Mid Term Examination",
    totalMarks: 30,
    components: [
      {
        id: "CMP-003",
        name: "MCQ",
        marks: 10,
      },
      {
        id: "CMP-004",
        name: "Written",
        marks: 20,
      },
    ],
    status: "Active",
  },

  {
    id: "ASM-004",
    name: "Annual",
    description: "Annual Examination",
    totalMarks: 100,
    components: [
      {
        id: "CMP-005",
        name: "MCQ",
        marks: 25,
      },
      {
        id: "CMP-006",
        name: "Written",
        marks: 50,
      },
      {
        id: "CMP-007",
        name: "Practical",
        marks: 25,
      },
    ],
    status: "Active",
  },
];


// ======================================================
// COMPONENT
// ======================================================

function Exams() {
  // ----------------------------------------------------
  // EXISTING PAGE STATE
  // ----------------------------------------------------

  const [tab, setTab] = useState("overview");

  const [typeFilter, setTypeFilter] = useState("All");

  const [examSearch, setExamSearch] = useState({
    examType: "",
    className: "",
    section: "",
    group: "",
    subject: "",
    teacher: "",
    status: "All",
  });

  const [activeSuggestion, setActiveSuggestion] = useState(null);


  // ----------------------------------------------------
  // NEW ASSESSMENT SETUP STATE
  // ----------------------------------------------------

  const [assessmentTypes, setAssessmentTypes] = useState(
    initialAssessmentTypes
  );

  const [showAssessmentModal, setShowAssessmentModal] = useState(false);

  const [assessmentForm, setAssessmentForm] = useState({
    name: "",
    description: "",
    components: [
      {
        id: Date.now(),
        name: "Written",
        marks: "",
      },
    ],
  });

  const [assessmentError, setAssessmentError] = useState("");


  // ====================================================
  // EXISTING EXAM FILTER
  // ====================================================

  const filteredExams = exams.filter((exam) => {
    const text = `${exam.name || ""} ${exam.type || ""}`.toLowerCase();

    const examTypeMatch =
      !examSearch.examType.trim() ||
      text.includes(examSearch.examType.trim().toLowerCase());

    const classMatch =
      !examSearch.className.trim() ||
      String(exam.className || "")
        .toLowerCase()
        .includes(examSearch.className.trim().toLowerCase());

    const sectionMatch =
      !examSearch.section.trim() ||
      String(exam.section || "")
        .toLowerCase()
        .includes(examSearch.section.trim().toLowerCase());

    const groupMatch =
      !examSearch.group.trim() ||
      String(exam.group || "")
        .toLowerCase()
        .includes(examSearch.group.trim().toLowerCase());

    const subjectMatch =
      !examSearch.subject.trim() ||
      String(exam.subject || "")
        .toLowerCase()
        .includes(examSearch.subject.trim().toLowerCase());

    const teacherMatch =
      !examSearch.teacher.trim() ||
      String(exam.teacher || "")
        .toLowerCase()
        .includes(examSearch.teacher.trim().toLowerCase());

    const statusMatch =
      examSearch.status === "All" ||
      String(exam.status || "").toLowerCase() ===
        examSearch.status.toLowerCase();

    return (
      examTypeMatch &&
      classMatch &&
      sectionMatch &&
      groupMatch &&
      subjectMatch &&
      teacherMatch &&
      statusMatch
    );
  });


  const upcomingExams = filteredExams.filter(
    (exam) =>
      exam.status === "Upcoming" ||
      exam.status === "Scheduled" ||
      exam.status === "Running"
  );

  const completedExams = filteredExams.filter(
    (exam) => exam.status === "Completed"
  );

  const publishedResults = examResults.length;

  const totalExams = filteredExams.length;


  // ====================================================
  // ASSESSMENT FORM FUNCTIONS
  // ====================================================

  const openAssessmentModal = () => {
    setAssessmentError("");

    setAssessmentForm({
      name: "",
      description: "",
      components: [
        {
          id: Date.now(),
          name: "Written",
          marks: "",
        },
      ],
    });

    setShowAssessmentModal(true);
  };


  const closeAssessmentModal = () => {
    setShowAssessmentModal(false);
    setAssessmentError("");
  };


  const handleAssessmentBasicChange = (field, value) => {
    setAssessmentForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleComponentChange = (id, field, value) => {
    setAssessmentForm((prev) => ({
      ...prev,
      components: prev.components.map((component) =>
        component.id === id
          ? {
              ...component,
              [field]: value,
            }
          : component
      ),
    }));
  };


  const addComponent = () => {
    setAssessmentForm((prev) => ({
      ...prev,
      components: [
        ...prev.components,
        {
          id: Date.now() + Math.random(),
          name: "",
          marks: "",
        },
      ],
    }));
  };


  const removeComponent = (id) => {
    if (assessmentForm.components.length === 1) {
      setAssessmentError("At least one component is required.");
      return;
    }

    setAssessmentForm((prev) => ({
      ...prev,
      components: prev.components.filter(
        (component) => component.id !== id
      ),
    }));

    setAssessmentError("");
  };


  const calculateComponentTotal = () => {
    return assessmentForm.components.reduce(
      (total, component) => total + Number(component.marks || 0),
      0
    );
  };


  const createAssessment = (e) => {
    e.preventDefault();

    setAssessmentError("");

    const name = assessmentForm.name.trim();

    if (!name) {
      setAssessmentError("Assessment name is required.");
      return;
    }

    const hasEmptyComponent = assessmentForm.components.some(
      (component) =>
        !component.name.trim() ||
        component.marks === "" ||
        Number(component.marks) <= 0
    );

    if (hasEmptyComponent) {
      setAssessmentError(
        "Every component needs a name and valid marks."
      );
      return;
    }

    const totalMarks = calculateComponentTotal();

    if (totalMarks <= 0) {
      setAssessmentError("Total marks must be greater than 0.");
      return;
    }

    const duplicate = assessmentTypes.some(
      (assessment) =>
        assessment.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
      setAssessmentError(
        "This assessment type already exists."
      );
      return;
    }

    const newAssessment = {
      id: `ASM-${Date.now()}`,
      name,
      description:
        assessmentForm.description.trim() || "Custom assessment",
      totalMarks,
      components: assessmentForm.components.map(
        (component, index) => ({
          id: `CMP-${Date.now()}-${index}`,
          name: component.name.trim(),
          marks: Number(component.marks),
        })
      ),
      status: "Active",
    };

    setAssessmentTypes((prev) => [
      ...prev,
      newAssessment,
    ]);

    closeAssessmentModal();
  };


  const deleteAssessment = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this assessment type?"
    );

    if (!confirmed) return;

    setAssessmentTypes((prev) =>
      prev.filter((assessment) => assessment.id !== id)
    );
  };


  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="page-block">
      <div className="students-container exams-page">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="students-container-header exams-header">

          <div>
            <span className="exams-kicker">
              EXAM INTELLIGENCE
            </span>

            <h2>Exams & Results</h2>

            <p>
              Monitor exams, configure assessments and review
              student performance across classes and subjects.
            </p>
          </div>

          <div className="exam-header-filter">

            <select
              className="student-search"
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
            >
              {filterOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>

          </div>

        </div>


        {/* ==================================================
            SEARCH PANEL
        ================================================== */}

        <div className="exam-search-panel">

          {/* Exam Type */}

          <div className="exam-search-field suggestion-field">

            <input
              type="text"
              placeholder="Exam Type..."
              value={examSearch.examType}
              onFocus={() =>
                setActiveSuggestion("examType")
              }
              onChange={(e) =>
                setExamSearch({
                  ...examSearch,
                  examType: e.target.value,
                })
              }
            />

            {activeSuggestion === "examType" &&
              examSearch.examType.trim() && (
                <div className="suggestion-menu">

                  {examTypeSuggestions
                    .filter((item) =>
                      item
                        .toLowerCase()
                        .includes(
                          examSearch.examType.toLowerCase()
                        )
                    )
                    .map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => {
                          setExamSearch({
                            ...examSearch,
                            examType: item,
                          });

                          setActiveSuggestion(null);
                        }}
                      >
                        {item}
                      </button>
                    ))}

                </div>
              )}

          </div>


          {/* Class */}

          <div className="exam-search-field suggestion-field">

            <input
              type="text"
              placeholder="Class..."
              value={examSearch.className}
              onFocus={() =>
                setActiveSuggestion("class")
              }
              onChange={(e) =>
                setExamSearch({
                  ...examSearch,
                  className: e.target.value,
                })
              }
            />

            {activeSuggestion === "class" &&
              examSearch.className.trim() && (
                <div className="suggestion-menu">

                  {classSuggestions
                    .filter((item) =>
                      item
                        .toLowerCase()
                        .includes(
                          examSearch.className.toLowerCase()
                        )
                    )
                    .map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => {
                          setExamSearch({
                            ...examSearch,
                            className: item,
                          });

                          setActiveSuggestion(null);
                        }}
                      >
                        {item}
                      </button>
                    ))}

                </div>
              )}

          </div>


          {/* Section */}

          <div className="exam-search-field">

            <input
              type="text"
              placeholder="Section..."
              value={examSearch.section}
              onChange={(e) =>
                setExamSearch({
                  ...examSearch,
                  section: e.target.value,
                })
              }
            />

          </div>


          {/* Group */}

          <div className="exam-search-field">

            <input
              type="text"
              placeholder="Group..."
              value={examSearch.group}
              onChange={(e) =>
                setExamSearch({
                  ...examSearch,
                  group: e.target.value,
                })
              }
            />

          </div>


          {/* Subject */}

          <div className="exam-search-field">

            <input
              type="text"
              placeholder="Subject..."
              value={examSearch.subject}
              onChange={(e) =>
                setExamSearch({
                  ...examSearch,
                  subject: e.target.value,
                })
              }
            />

          </div>


          {/* Teacher */}

          <div className="exam-search-field">

            <input
              type="text"
              placeholder="Teacher..."
              value={examSearch.teacher}
              onChange={(e) =>
                setExamSearch({
                  ...examSearch,
                  teacher: e.target.value,
                })
              }
            />

          </div>


          {/* Status */}

          <div className="exam-search-field">

            <select
              value={examSearch.status}
              onChange={(e) =>
                setExamSearch({
                  ...examSearch,
                  status: e.target.value,
                })
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Upcoming">
                Upcoming
              </option>

              <option value="Running">
                Running
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

          </div>

        </div>


        {/* ==================================================
            STAT CARDS
        ================================================== */}

        <div className="exam-stat-grid">

          <div className="exam-stat-card total">

            <div className="exam-stat-icon">
              📝
            </div>

            <span>Total Exams</span>

            <strong>{totalExams}</strong>

            <small>
              Created by teachers
            </small>

          </div>


          <div className="exam-stat-card upcoming">

            <div className="exam-stat-icon">
              📅
            </div>

            <span>Upcoming</span>

            <strong>
              {upcomingExams.length}
            </strong>

            <small>
              Scheduled / running exams
            </small>

          </div>


          <div className="exam-stat-card completed">

            <div className="exam-stat-icon">
              ✓
            </div>

            <span>Completed</span>

            <strong>
              {completedExams.length}
            </strong>

            <small>
              Exams already finished
            </small>

          </div>


          <div className="exam-stat-card results">

            <div className="exam-stat-icon">
              🏆
            </div>

            <span>Results</span>

            <strong>
              {publishedResults}
            </strong>

            <small>
              Result records available
            </small>

          </div>

        </div>


        {/* ==================================================
            TABS
        ================================================== */}

        <div className="exam-tabs">

          <button
            className={
              tab === "overview" ? "active" : ""
            }
            onClick={() => setTab("overview")}
          >
            Overview
          </button>


          {/* NEW TAB */}

          <button
            className={
              tab === "assessmentSetup"
                ? "active"
                : ""
            }
            onClick={() =>
              setTab("assessmentSetup")
            }
          >
            Assessment Setup
          </button>


          <button
            className={
              tab === "upcoming" ? "active" : ""
            }
            onClick={() => setTab("upcoming")}
          >
            Upcoming Exams
          </button>


          <button
            className={
              tab === "results" ? "active" : ""
            }
            onClick={() => setTab("results")}
          >
            Results
          </button>


          <button
            className={
              tab === "performance"
                ? "active"
                : ""
            }
            onClick={() =>
              setTab("performance")
            }
          >
            Performance
          </button>

        </div>


        {/* ==================================================
            OVERVIEW
        ================================================== */}

        {tab === "overview" && (
          <>

            <section className="exam-overview-grid">

              {/* EXAM TYPE */}

              <div className="exam-chart-card">

                <div className="exam-chart-header">

                  <div>

                    <span>
                      EXAM DISTRIBUTION
                    </span>

                    <h3>
                      Assessment Types
                    </h3>

                    <p>
                      How teachers are conducting
                      assessments.
                    </p>

                  </div>

                  <span className="exam-chart-badge">
                    2026
                  </span>

                </div>


                <div className="exam-pie-area">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <PieChart>

                      <Pie
                        data={examTypeData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={65}
                        outerRadius={100}
                        paddingAngle={4}
                      >

                        {examTypeData.map(
                          (entry, index) => (
                            <Cell
                              key={index}
                              fill={
                                [
                                  "#4f46e5",
                                  "#06b6d4",
                                  "#f59e0b",
                                  "#ef4444",
                                ][index]
                              }
                            />
                          )
                        )}

                      </Pie>

                      <Tooltip />

                      <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                      />

                    </PieChart>

                  </ResponsiveContainer>


                  <div className="exam-pie-center">

                    <strong>
                      {totalExams}
                    </strong>

                    <span>
                      Exams
                    </span>

                  </div>

                </div>

              </div>


              {/* EXAM TREND */}

              <div className="exam-chart-card large">

                <div className="exam-chart-header">

                  <div>

                    <span>
                      YEARLY ACTIVITY
                    </span>

                    <h3>
                      Exam Activity & Average Score
                    </h3>

                    <p>
                      Monthly exam activity and
                      student performance.
                    </p>

                  </div>

                  <span className="exam-chart-badge">
                    Jan — Dec
                  </span>

                </div>


                <div className="exam-line-area">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <LineChart data={examTrendData}>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                      />

                      <XAxis dataKey="month" />

                      <YAxis />

                      <Tooltip />

                      <Legend />

                      <Line
                        type="monotone"
                        dataKey="exams"
                        name="Exams"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />

                      <Line
                        type="monotone"
                        dataKey="average"
                        name="Average Score %"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </section>


            {/* SUBJECT PERFORMANCE */}

            <section className="exam-chart-card exam-performance-card">

              <div className="exam-chart-header">

                <div>

                  <span>
                    SUBJECT ANALYTICS
                  </span>

                  <h3>
                    Subject Performance
                  </h3>

                  <p>
                    Average student performance
                    across subjects.
                  </p>

                </div>

              </div>


              <div className="exam-bar-area">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart data={subjectPerformance}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis dataKey="subject" />

                    <YAxis domain={[0, 100]} />

                    <Tooltip />

                    <Bar
                      dataKey="average"
                      name="Average Score %"
                      fill="#4f46e5"
                      radius={[8, 8, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </section>

          </>
        )}


        {/* ==================================================
            ASSESSMENT SETUP
        ================================================== */}

        {tab === "assessmentSetup" && (
          <section className="assessment-setup-page">

            {/* SETUP HEADER */}

            <div className="assessment-setup-header">

              <div>

                <span className="assessment-kicker">
                  ACADEMIC CONFIGURATION
                </span>

                <h3>
                  Assessment Setup
                </h3>

                <p>
                  Create the assessment types and
                  mark structures used by this
                  institution.
                </p>

              </div>


              <button
                type="button"
                className="assessment-create-btn"
                onClick={openAssessmentModal}
              >
                <span>+</span>
                Create Assessment
              </button>

            </div>


            {/* INFO STRIP */}

            <div className="assessment-info-strip">

              <div className="assessment-info-icon">
                ⚙
              </div>

              <div>

                <strong>
                  Flexible academic rules
                </strong>

                <p>
                  Each school, college or coaching
                  centre can define its own assessment
                  name, total marks and components.
                </p>

              </div>

            </div>


            {/* ASSESSMENT GRID */}

            <div className="assessment-grid">

              {assessmentTypes.map(
                (assessment) => (

                  <div
                    className="assessment-card"
                    key={assessment.id}
                  >

                    {/* CARD TOP */}

                    <div className="assessment-card-top">

                      <div>

                        <span className="assessment-mini-label">
                          ASSESSMENT
                        </span>

                        <h4>
                          {assessment.name}
                        </h4>

                        <p>
                          {assessment.description}
                        </p>

                      </div>


                      <div className="assessment-total">

                        <strong>
                          {assessment.totalMarks}
                        </strong>

                        <span>
                          marks
                        </span>

                      </div>

                    </div>


                    {/* COMPONENTS */}

                    <div className="assessment-components">

                      <div className="assessment-component-title">
                        <span>
                          MARK COMPONENTS
                        </span>

                        <span>
                          {assessment.components.length}
                        </span>
                      </div>


                      {assessment.components.map(
                        (component) => (

                          <div
                            className="assessment-component-row"
                            key={component.id}
                          >

                            <span>
                              {component.name}
                            </span>

                            <strong>
                              {component.marks}
                            </strong>

                          </div>

                        )
                      )}

                    </div>


                    {/* CARD FOOTER */}

                    <div className="assessment-card-footer">

                      <span className="assessment-status">
                        <i></i>
                        Active
                      </span>


                      <button
                        type="button"
                        className="assessment-delete-btn"
                        onClick={() =>
                          deleteAssessment(
                            assessment.id
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                )
              )}


              {/* EMPTY STATE */}

              {assessmentTypes.length === 0 && (
                <div className="assessment-empty">

                  <div>
                    ⚙
                  </div>

                  <h4>
                    No assessment configured
                  </h4>

                  <p>
                    Create your first assessment
                    structure to get started.
                  </p>

                  <button
                    type="button"
                    onClick={openAssessmentModal}
                  >
                    Create Assessment
                  </button>

                </div>
              )}

            </div>

          </section>
        )}


        {/* ==================================================
            UPCOMING EXAMS
        ================================================== */}

        {tab === "upcoming" && (
          <section className="exam-table-card">

            <div className="exam-section-heading">

              <div>

                <span>
                  LIVE EXAM MONITOR
                </span>

                <h3>
                  Upcoming & Running Exams
                </h3>

                <p>
                  Exams scheduled or currently
                  being conducted by teachers.
                </p>

              </div>

            </div>


            <div className="table-wrap exam-table-scroll">

              <table className="data-table">

                <thead>

                  <tr>

                    <th>Exam</th>

                    <th>Type</th>

                    <th>Class</th>

                    <th>Subject</th>

                    <th>Teacher</th>

                    <th>Date</th>

                    <th>Status</th>

                  </tr>

                </thead>


                <tbody>

                  {upcomingExams.length > 0 ? (

                    upcomingExams.map((exam) => (

                      <tr key={exam.id}>

                        <td className="cell-name">
                          {exam.name}
                        </td>

                        <td>
                          <span className="exam-type-badge">
                            {exam.type || "Custom"}
                          </span>
                        </td>

                        <td>
                          {exam.className}
                        </td>

                        <td>
                          {exam.subject}
                        </td>

                        <td>
                          {exam.teacher || "Teacher"}
                        </td>

                        <td>
                          {exam.date}
                        </td>

                        <td>

                          <span
                            className={`badge ${
                              exam.status === "Running"
                                ? "badge-active"
                                : "badge-pending"
                            }`}
                          >
                            {exam.status}
                          </span>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        className="empty-exam"
                      >
                        No upcoming exams found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </section>
        )}


        {/* ==================================================
            RESULTS
        ================================================== */}

        {tab === "results" && (
          <section className="exam-table-card">

            <div className="exam-section-heading">

              <div>

                <span>
                  RESULT CENTER
                </span>

                <h3>
                  Student Results
                </h3>

                <p>
                  Review marks and grades entered
                  by teachers.
                </p>

              </div>

            </div>


            <div className="table-wrap exam-table-scroll">

              <table className="data-table">

                <thead>

                  <tr>

                    <th>Student</th>

                    <th>Exam</th>

                    <th>Subject</th>

                    <th>Class</th>

                    <th>Marks</th>

                    <th>Grade</th>

                  </tr>

                </thead>


                <tbody>

                  {examResults.map((result) => (

                    <tr key={result.id}>

                      <td className="cell-name">
                        {result.student}
                      </td>

                      <td>
                        {result.exam}
                      </td>

                      <td>
                        {result.subject || "—"}
                      </td>

                      <td>
                        {result.className || "—"}
                      </td>

                      <td>

                        <strong>
                          {result.marks} /{" "}
                          {result.outOf}
                        </strong>

                      </td>

                      <td>

                        <span className="badge badge-active">
                          {result.grade}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>
        )}


        {/* ==================================================
            PERFORMANCE
        ================================================== */}

        {tab === "performance" && (
          <section className="exam-performance-layout">

            <div className="exam-chart-card">

              <div className="exam-chart-header">

                <div>

                  <span>
                    ACADEMIC INSIGHTS
                  </span>

                  <h3>
                    Subject Performance
                  </h3>

                  <p>
                    Compare average marks across
                    subjects.
                  </p>

                </div>

              </div>


              <div className="exam-bar-area">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart data={subjectPerformance}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis dataKey="subject" />

                    <YAxis domain={[0, 100]} />

                    <Tooltip />

                    <Bar
                      dataKey="average"
                      name="Average %"
                      fill="#4f46e5"
                      radius={[8, 8, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>


            <div className="exam-insight-card">

              <span>
                ADMIN INSIGHT
              </span>

              <h3>
                Configurable assessment system
              </h3>

              <p>
                Assessment rules can be configured
                according to the institution. CT,
                MT, term exams, model tests,
                practicals, viva or custom
                assessments can all be managed
                from one place.
              </p>


              <div className="insight-list">

                <div>
                  <strong>
                    Admin
                  </strong>

                  <span>
                    Configures assessment
                  </span>
                </div>


                <div>
                  <strong>
                    Teacher
                  </strong>

                  <span>
                    Conducts assessment
                  </span>
                </div>


                <div>
                  <strong>
                    Teacher
                  </strong>

                  <span>
                    Enters marks
                  </span>
                </div>


                <div>
                  <strong>
                    System
                  </strong>

                  <span>
                    Generates results
                  </span>
                </div>

              </div>

            </div>

          </section>
        )}

      </div>


      {/* ====================================================
          CREATE ASSESSMENT MODAL
      ==================================================== */}

      {showAssessmentModal && (
        <div
          className="assessment-modal-overlay"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              closeAssessmentModal();
            }
          }}
        >

          <div className="assessment-modal">

            {/* MODAL HEADER */}

            <div className="assessment-modal-header">

              <div>

                <span>
                  NEW CONFIGURATION
                </span>

                <h3>
                  Create Assessment
                </h3>

                <p>
                  Define the name and mark
                  structure for this assessment.
                </p>

              </div>


              <button
                type="button"
                className="assessment-modal-close"
                onClick={closeAssessmentModal}
              >
                ×
              </button>

            </div>


            <form onSubmit={createAssessment}>

              {/* BASIC INFO */}

              <div className="assessment-form-grid">

                <div className="assessment-form-field">

                  <label>
                    Assessment Name
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. CT, Mid Term, Annual"
                    value={assessmentForm.name}
                    onChange={(e) =>
                      handleAssessmentBasicChange(
                        "name",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="assessment-form-field">

                  <label>
                    Description
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Class Test"
                    value={
                      assessmentForm.description
                    }
                    onChange={(e) =>
                      handleAssessmentBasicChange(
                        "description",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              {/* COMPONENT HEADER */}

              <div className="assessment-components-heading">

                <div>

                  <strong>
                    Mark Components
                  </strong>

                  <span>
                    Divide the assessment into
                    MCQ, Written, Viva, Practical
                    or any custom component.
                  </span>

                </div>


                <div className="assessment-live-total">

                  Total

                  <strong>
                    {calculateComponentTotal()}
                  </strong>

                </div>

              </div>


              {/* COMPONENT ROWS */}

              <div className="assessment-form-components">

                {assessmentForm.components.map(
                  (component, index) => (

                    <div
                      className="assessment-form-component"
                      key={component.id}
                    >

                      <div className="component-number">
                        {index + 1}
                      </div>


                      <div className="assessment-component-input">

                        <label>
                          Component
                        </label>

                        <input
                          type="text"
                          placeholder="MCQ / Written / Viva / Practical"
                          value={component.name}
                          onChange={(e) =>
                            handleComponentChange(
                              component.id,
                              "name",
                              e.target.value
                            )
                          }
                        />

                      </div>


                      <div className="assessment-component-input small">

                        <label>
                          Marks
                        </label>

                        <input
                          type="number"
                          min="1"
                          placeholder="25"
                          value={component.marks}
                          onChange={(e) =>
                            handleComponentChange(
                              component.id,
                              "marks",
                              e.target.value
                            )
                          }
                        />

                      </div>


                      <button
                        type="button"
                        className="component-remove-btn"
                        onClick={() =>
                          removeComponent(
                            component.id
                          )
                        }
                      >
                        ×
                      </button>

                    </div>

                  )
                )}

              </div>


              {/* ADD COMPONENT */}

              <button
                type="button"
                className="add-component-btn"
                onClick={addComponent}
              >
                <span>+</span>
                Add Component
              </button>


              {/* PREVIEW */}

              <div className="assessment-preview">

                <div className="assessment-preview-head">

                  <div>

                    <span>
                      LIVE PREVIEW
                    </span>

                    <strong>
                      {assessmentForm.name ||
                        "Your Assessment"}
                    </strong>

                  </div>


                  <div>

                    <strong>
                      {calculateComponentTotal()}
                    </strong>

                    <span>
                      Total Marks
                    </span>

                  </div>

                </div>


                <div className="assessment-preview-list">

                  {assessmentForm.components.map(
                    (component) => (

                      <div
                        key={component.id}
                      >

                        <span>
                          {component.name ||
                            "Component"}
                        </span>

                        <strong>
                          {component.marks || 0}
                        </strong>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* ERROR */}

              {assessmentError && (
                <div className="assessment-form-error">
                  {assessmentError}
                </div>
              )}


              {/* FOOTER */}

              <div className="assessment-modal-footer">

                <button
                  type="button"
                  className="assessment-cancel-btn"
                  onClick={closeAssessmentModal}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="assessment-save-btn"
                >
                  Create Assessment
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}


export default Exams;