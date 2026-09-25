
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
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const groupSuggestions = [
  "Science",
  "Business Studies",
  "Humanities",
  "General",
];

// ======================================================
// INITIAL EXAM TYPES
// ======================================================

const initialExamTypes = [
  {
    id: "EXAMTYPE-001",
    name: "CT",
    description: "Class Test",
    status: "Active",
  },
  {
    id: "EXAMTYPE-002",
    name: "MT",
    description: "Monthly Test",
    status: "Active",
  },
  {
    id: "EXAMTYPE-003",
    name: "Mid Term",
    description: "Mid Term Examination",
    status: "Active",
  },
  {
    id: "EXAMTYPE-004",
    name: "Annual",
    description: "Annual Examination",
    status: "Active",
  },
];

// ======================================================
// INITIAL MARK STRUCTURES
// ======================================================

const initialMarkStructures = [
  {
    id: "STRUCT-001",
    examType: "CT",
    className: "Class 9",
    group: "Science",
    subject: "Physics",
    components: [
      { id: "C-001", name: "Written", marks: 15 },
    ],
    totalMarks: 15,
  },
  {
    id: "STRUCT-002",
    examType: "Mid Term",
    className: "Class 9",
    group: "Science",
    subject: "Physics",
    components: [
      { id: "C-002", name: "MCQ", marks: 10 },
      { id: "C-003", name: "Written", marks: 15 },
      { id: "C-004", name: "Practical", marks: 5 },
    ],
    totalMarks: 30,
  },
  {
    id: "STRUCT-003",
    examType: "Mid Term",
    className: "Class 9",
    group: "Science",
    subject: "Bangla 2nd",
    components: [
      { id: "C-005", name: "Written", marks: 60 },
    ],
    totalMarks: 60,
  },
  {
    id: "STRUCT-004",
    examType: "Annual",
    className: "Class 9",
    group: "Science",
    subject: "Physics",
    components: [
      { id: "C-006", name: "MCQ", marks: 25 },
      { id: "C-007", name: "Written", marks: 50 },
      { id: "C-008", name: "Practical", marks: 25 },
    ],
    totalMarks: 100,
  },
];

// ======================================================
// INITIAL RESULT RULES
// ======================================================

const initialResultRules = [
  {
    id: "RULE-001",
    name: "Annual Final Result",
    description: "Combined yearly academic result",
    components: [
      { id: "R-001", examType: "CT", weight: 20 },
      { id: "R-002", examType: "MT", weight: 20 },
      { id: "R-003", examType: "Mid Term", weight: 20 },
      { id: "R-004", examType: "Annual", weight: 40 },
    ],
  },
];

// ======================================================
// COMPONENT
// ======================================================

function Exams() {
  // ----------------------------------------------------
  // MAIN PAGE STATE
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
  // EXAM TYPE STATE
  // ----------------------------------------------------

  const [examTypes, setExamTypes] = useState(initialExamTypes);

  const [showExamTypeModal, setShowExamTypeModal] =
    useState(false);

  const [examTypeForm, setExamTypeForm] = useState({
    name: "",
    description: "",
  });

  const [examTypeError, setExamTypeError] = useState("");

  // ----------------------------------------------------
  // MARK STRUCTURE STATE
  // ----------------------------------------------------

  const [markStructures, setMarkStructures] = useState(
    initialMarkStructures
  );

  const [showStructureModal, setShowStructureModal] =
    useState(false);

  const [structureForm, setStructureForm] = useState({
    examType: "",
    className: "",
    group: "",
    subject: "",
    components: [
      {
        id: Date.now(),
        name: "Written",
        marks: "",
      },
    ],
  });

  const [structureError, setStructureError] = useState("");

  // ----------------------------------------------------
  // RESULT RULE STATE
  // ----------------------------------------------------

  const [resultRules, setResultRules] = useState(
    initialResultRules
  );

  const [showRuleModal, setShowRuleModal] = useState(false);

  const [ruleForm, setRuleForm] = useState({
    name: "",
    description: "",
    components: [
      {
        id: Date.now(),
        examType: "",
        weight: "",
      },
    ],
  });

  const [ruleError, setRuleError] = useState("");

  // ====================================================
  // EXAM FILTER
  // ====================================================

  const filteredExams = exams.filter((exam) => {
    const text = `${exam.name || ""} ${
      exam.type || ""
    }`.toLowerCase();

    const examTypeMatch =
      !examSearch.examType.trim() ||
      text.includes(
        examSearch.examType.trim().toLowerCase()
      );

    const classMatch =
      !examSearch.className.trim() ||
      String(exam.className || "")
        .toLowerCase()
        .includes(
          examSearch.className.trim().toLowerCase()
        );

    const sectionMatch =
      !examSearch.section.trim() ||
      String(exam.section || "")
        .toLowerCase()
        .includes(
          examSearch.section.trim().toLowerCase()
        );

    const groupMatch =
      !examSearch.group.trim() ||
      String(exam.group || "")
        .toLowerCase()
        .includes(
          examSearch.group.trim().toLowerCase()
        );

    const subjectMatch =
      !examSearch.subject.trim() ||
      String(exam.subject || "")
        .toLowerCase()
        .includes(
          examSearch.subject.trim().toLowerCase()
        );

    const teacherMatch =
      !examSearch.teacher.trim() ||
      String(exam.teacher || "")
        .toLowerCase()
        .includes(
          examSearch.teacher.trim().toLowerCase()
        );

    const statusMatch =
      examSearch.status === "All" ||
      String(exam.status || "").toLowerCase() ===
        examSearch.status.toLowerCase();

    const typeDropdownMatch =
      typeFilter === "All" ||
      String(exam.type || "").toLowerCase() ===
        typeFilter.toLowerCase();

    return (
      examTypeMatch &&
      classMatch &&
      sectionMatch &&
      groupMatch &&
      subjectMatch &&
      teacherMatch &&
      statusMatch &&
      typeDropdownMatch
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
  // EXAM TYPE FUNCTIONS
  // ====================================================

  const openExamTypeModal = () => {
    setExamTypeError("");

    setExamTypeForm({
      name: "",
      description: "",
    });

    setShowExamTypeModal(true);
  };

  const closeExamTypeModal = () => {
    setShowExamTypeModal(false);
    setExamTypeError("");
  };

  const createExamType = (e) => {
    e.preventDefault();

    setExamTypeError("");

    const name = examTypeForm.name.trim();

    if (!name) {
      setExamTypeError("Exam type name is required.");
      return;
    }

    const duplicate = examTypes.some(
      (item) =>
        item.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
      setExamTypeError(
        "This exam type already exists."
      );
      return;
    }

    const newExamType = {
      id: `EXAMTYPE-${Date.now()}`,
      name,
      description:
        examTypeForm.description.trim() ||
        "Custom academic assessment",
      status: "Active",
    };

    setExamTypes((prev) => [
      ...prev,
      newExamType,
    ]);

    closeExamTypeModal();
  };

  const deleteExamType = (id) => {
    const confirmed = window.confirm(
      "Remove this exam type?"
    );

    if (!confirmed) return;

    setExamTypes((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // ====================================================
  // MARK STRUCTURE FUNCTIONS
  // ====================================================

  const openStructureModal = () => {
    setStructureError("");

    setStructureForm({
      examType: examTypes[0]?.name || "",
      className: "",
      group: "",
      subject: "",
      components: [
        {
          id: Date.now(),
          name: "Written",
          marks: "",
        },
      ],
    });

    setShowStructureModal(true);
  };

  const closeStructureModal = () => {
    setShowStructureModal(false);
    setStructureError("");
  };

  const updateStructureField = (field, value) => {
    setStructureForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateStructureComponent = (
    id,
    field,
    value
  ) => {
    setStructureForm((prev) => ({
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

  const addStructureComponent = () => {
    setStructureForm((prev) => ({
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

  const removeStructureComponent = (id) => {
    if (structureForm.components.length === 1) {
      setStructureError(
        "At least one mark component is required."
      );
      return;
    }

    setStructureForm((prev) => ({
      ...prev,
      components: prev.components.filter(
        (component) => component.id !== id
      ),
    }));

    setStructureError("");
  };

  const calculateStructureTotal = () => {
    return structureForm.components.reduce(
      (total, component) =>
        total + Number(component.marks || 0),
      0
    );
  };

  const createMarkStructure = (e) => {
    e.preventDefault();

    setStructureError("");

    if (!structureForm.examType) {
      setStructureError("Select an exam type.");
      return;
    }

    if (!structureForm.className.trim()) {
      setStructureError("Class is required.");
      return;
    }

    if (!structureForm.subject.trim()) {
      setStructureError("Subject is required.");
      return;
    }

    const invalidComponent =
      structureForm.components.some(
        (component) =>
          !component.name.trim() ||
          component.marks === "" ||
          Number(component.marks) <= 0
      );

    if (invalidComponent) {
      setStructureError(
        "Every component needs a valid name and marks."
      );
      return;
    }

    const duplicate = markStructures.some(
      (structure) =>
        structure.examType.toLowerCase() ===
          structureForm.examType.toLowerCase() &&
        structure.className.toLowerCase() ===
          structureForm.className
            .trim()
            .toLowerCase() &&
        structure.group.toLowerCase() ===
          structureForm.group
            .trim()
            .toLowerCase() &&
        structure.subject.toLowerCase() ===
          structureForm.subject
            .trim()
            .toLowerCase()
    );

    if (duplicate) {
      setStructureError(
        "A mark structure already exists for this exam, class, group and subject."
      );
      return;
    }

    const totalMarks = calculateStructureTotal();

    const newStructure = {
      id: `STRUCT-${Date.now()}`,
      examType: structureForm.examType,
      className: structureForm.className.trim(),
      group: structureForm.group.trim() || "General",
      subject: structureForm.subject.trim(),
      components: structureForm.components.map(
        (component, index) => ({
          id: `SC-${Date.now()}-${index}`,
          name: component.name.trim(),
          marks: Number(component.marks),
        })
      ),
      totalMarks,
    };

    setMarkStructures((prev) => [
      ...prev,
      newStructure,
    ]);

    closeStructureModal();
  };

  const deleteMarkStructure = (id) => {
    const confirmed = window.confirm(
      "Remove this mark structure?"
    );

    if (!confirmed) return;

    setMarkStructures((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // ====================================================
  // RESULT RULE FUNCTIONS
  // ====================================================

  const openRuleModal = () => {
    setRuleError("");

    setRuleForm({
      name: "",
      description: "",
      components: [
        {
          id: Date.now(),
          examType: examTypes[0]?.name || "",
          weight: "",
        },
      ],
    });

    setShowRuleModal(true);
  };

  const closeRuleModal = () => {
    setShowRuleModal(false);
    setRuleError("");
  };

  const updateRuleBasic = (field, value) => {
    setRuleForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateRuleComponent = (
    id,
    field,
    value
  ) => {
    setRuleForm((prev) => ({
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

  const addRuleComponent = () => {
    setRuleForm((prev) => ({
      ...prev,
      components: [
        ...prev.components,
        {
          id: Date.now() + Math.random(),
          examType: "",
          weight: "",
        },
      ],
    }));
  };

  const removeRuleComponent = (id) => {
    if (ruleForm.components.length === 1) {
      setRuleError(
        "At least one exam is required."
      );
      return;
    }

    setRuleForm((prev) => ({
      ...prev,
      components: prev.components.filter(
        (component) => component.id !== id
      ),
    }));

    setRuleError("");
  };

  const calculateRuleWeight = () => {
    return ruleForm.components.reduce(
      (total, component) =>
        total + Number(component.weight || 0),
      0
    );
  };

  const createResultRule = (e) => {
    e.preventDefault();

    setRuleError("");

    if (!ruleForm.name.trim()) {
      setRuleError(
        "Result rule name is required."
      );
      return;
    }

    const invalid = ruleForm.components.some(
      (component) =>
        !component.examType ||
        component.weight === "" ||
        Number(component.weight) <= 0
    );

    if (invalid) {
      setRuleError(
        "Every exam needs a valid weight."
      );
      return;
    }

    const totalWeight = calculateRuleWeight();

    if (totalWeight !== 100) {
      setRuleError(
        `Total weight must be 100%. Current total: ${totalWeight}%.`
      );
      return;
    }

    const duplicate = resultRules.some(
      (rule) =>
        rule.name.toLowerCase() ===
        ruleForm.name.trim().toLowerCase()
    );

    if (duplicate) {
      setRuleError(
        "This result rule already exists."
      );
      return;
    }

    const newRule = {
      id: `RULE-${Date.now()}`,
      name: ruleForm.name.trim(),
      description:
        ruleForm.description.trim() ||
        "Custom result calculation rule",
      components: ruleForm.components.map(
        (component, index) => ({
          id: `RC-${Date.now()}-${index}`,
          examType: component.examType,
          weight: Number(component.weight),
        })
      ),
    };

    setResultRules((prev) => [
      ...prev,
      newRule,
    ]);

    closeRuleModal();
  };

  const deleteResultRule = (id) => {
    const confirmed = window.confirm(
      "Remove this result rule?"
    );

    if (!confirmed) return;

    setResultRules((prev) =>
      prev.filter((rule) => rule.id !== id)
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
              Configure institution-specific exams,
              mark structures and result calculation
              rules from one academic control centre.
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
                <option key={option}>
                  {option}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* ==================================================
            SEARCH PANEL
        ================================================== */}

        <div className="exam-search-panel">

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

          <button
            className={
              tab === "examTypes" ? "active" : ""
            }
            onClick={() => setTab("examTypes")}
          >
            Exam Types
          </button>

          <button
            className={
              tab === "markStructure" ? "active" : ""
            }
            onClick={() =>
              setTab("markStructure")
            }
          >
            Mark Structure
          </button>

          <button
            className={
              tab === "resultRules" ? "active" : ""
            }
            onClick={() =>
              setTab("resultRules")
            }
          >
            Result Rules
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
                              fill={[
                                "#4f46e5",
                                "#06b6d4",
                                "#f59e0b",
                                "#ef4444",
                              ][index]}
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

                    <LineChart
                      data={examTrendData}
                    >

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

                  <BarChart
                    data={subjectPerformance}
                  >

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
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </section>

          </>
        )}

        {/* ==================================================
            EXAM TYPES
        ================================================== */}

        {tab === "examTypes" && (
          <section className="assessment-setup-page">

            <div className="assessment-setup-header">

              <div>

                <span className="assessment-kicker">
                  ACADEMIC CONFIGURATION
                </span>

                <h3>
                  Exam Types
                </h3>

                <p>
                  Create the official assessment
                  types used by this institution.
                </p>

              </div>

              <button
                type="button"
                className="assessment-create-btn"
                onClick={openExamTypeModal}
              >
                <span>+</span>
                Create Exam Type
              </button>

            </div>

            <div className="assessment-info-strip">

              <div className="assessment-info-icon">
                ⚙
              </div>

              <div>

                <strong>
                  Institution-specific exam system
                </strong>

                <p>
                  CT, MT, ST, Mid Term, Half-Yearly,
                  Annual, Final, Model Test or any
                  custom exam type can be created.
                </p>

              </div>

            </div>

            <div className="assessment-grid">

              {examTypes.map((examType) => (

                <div
                  className="assessment-card"
                  key={examType.id}
                >

                  <div className="assessment-card-top">

                    <div>

                      <span className="assessment-mini-label">
                        EXAM TYPE
                      </span>

                      <h4>
                        {examType.name}
                      </h4>

                      <p>
                        {examType.description}
                      </p>

                    </div>

                  </div>

                  <div className="assessment-card-footer">

                    <span className="assessment-status">
                      <i></i>
                      {examType.status}
                    </span>

                    <button
                      type="button"
                      className="assessment-delete-btn"
                      onClick={() =>
                        deleteExamType(
                          examType.id
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>
        )}

        {/* ==================================================
            MARK STRUCTURE
        ================================================== */}

        {tab === "markStructure" && (
          <section className="assessment-setup-page">

            <div className="assessment-setup-header">

              <div>

                <span className="assessment-kicker">
                  SUBJECT MARKING SYSTEM
                </span>

                <h3>
                  Mark Structure
                </h3>

                <p>
                  Define different marks and
                  components for every class,
                  group, subject and exam.
                </p>

              </div>

              <button
                type="button"
                className="assessment-create-btn"
                onClick={openStructureModal}
              >
                <span>+</span>
                Create Mark Structure
              </button>

            </div>

            <div className="assessment-info-strip">

              <div className="assessment-info-icon">
                ∑
              </div>

              <div>

                <strong>
                  Flexible subject-wise marks
                </strong>

                <p>
                  The same exam can have different
                  marks for different subjects,
                  classes or groups.
                </p>

              </div>

            </div>

            <div className="assessment-grid">

              {markStructures.map(
                (structure) => (

                  <div
                    className="assessment-card"
                    key={structure.id}
                  >

                    <div className="assessment-card-top">

                      <div>

                        <span className="assessment-mini-label">
                          {structure.examType}
                        </span>

                        <h4>
                          {structure.subject}
                        </h4>

                        <p>
                          {structure.className} •{" "}
                          {structure.group}
                        </p>

                      </div>

                      <div className="assessment-total">

                        <strong>
                          {structure.totalMarks}
                        </strong>

                        <span>
                          marks
                        </span>

                      </div>

                    </div>

                    <div className="assessment-components">

                      <div className="assessment-component-title">

                        <span>
                          COMPONENTS
                        </span>

                        <span>
                          {
                            structure.components
                              .length
                          }
                        </span>

                      </div>

                      {structure.components.map(
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

                    <div className="assessment-card-footer">

                      <span className="assessment-status">
                        <i></i>
                        Active
                      </span>

                      <button
                        type="button"
                        className="assessment-delete-btn"
                        onClick={() =>
                          deleteMarkStructure(
                            structure.id
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          </section>
        )}

        {/* ==================================================
            RESULT RULES
        ================================================== */}

        {tab === "resultRules" && (
          <section className="assessment-setup-page">

            <div className="assessment-setup-header">

              <div>

                <span className="assessment-kicker">
                  RESULT CALCULATION
                </span>

                <h3>
                  Result Rules
                </h3>

                <p>
                  Configure how multiple exams are
                  combined into the final result.
                </p>

              </div>

              <button
                type="button"
                className="assessment-create-btn"
                onClick={openRuleModal}
              >
                <span>+</span>
                Create Result Rule
              </button>

            </div>

            <div className="assessment-info-strip">

              <div className="assessment-info-icon">
                %
              </div>

              <div>

                <strong>
                  Institution-specific result formula
                </strong>

                <p>
                  CT, MT, Mid Term, Annual or any
                  custom assessment can be combined
                  using your own percentage weights.
                </p>

              </div>

            </div>

            <div className="assessment-grid">

              {resultRules.map((rule) => (

                <div
                  className="assessment-card"
                  key={rule.id}
                >

                  <div className="assessment-card-top">

                    <div>

                      <span className="assessment-mini-label">
                        RESULT RULE
                      </span>

                      <h4>
                        {rule.name}
                      </h4>

                      <p>
                        {rule.description}
                      </p>

                    </div>

                  </div>

                  <div className="assessment-components">

                    <div className="assessment-component-title">

                      <span>
                        CALCULATION
                      </span>

                      <span>
                        100%
                      </span>

                    </div>

                    {rule.components.map(
                      (component) => (

                        <div
                          className="assessment-component-row"
                          key={component.id}
                        >

                          <span>
                            {component.examType}
                          </span>

                          <strong>
                            {component.weight}%
                          </strong>

                        </div>

                      )
                    )}

                  </div>

                  <div className="assessment-card-footer">

                    <span className="assessment-status">
                      <i></i>
                      Active
                    </span>

                    <button
                      type="button"
                      className="assessment-delete-btn"
                      onClick={() =>
                        deleteResultRule(
                          rule.id
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

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
                          {exam.teacher ||
                            "Teacher"}
                        </td>

                        <td>
                          {exam.date}
                        </td>

                        <td>

                          <span
                            className={`badge ${
                              exam.status ===
                              "Running"
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

                  <BarChart
                    data={subjectPerformance}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis dataKey="subject" />

                    <YAxis
                      domain={[0, 100]}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="average"
                      name="Average %"
                      fill="#4f46e5"
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
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
                Configurable result engine
              </h3>

              <p>
                Each institution can define its
                own exam types, subject-wise mark
                structures and final result formulas.
                Teachers enter only their assigned
                subject marks while the system
                combines the complete student result.
              </p>

              <div className="insight-list">

                <div>
                  <strong>
                    Admin
                  </strong>

                  <span>
                    Configures exam types
                  </span>
                </div>

                <div>
                  <strong>
                    Admin
                  </strong>

                  <span>
                    Defines mark structure
                  </span>
                </div>

                <div>
                  <strong>
                    Teacher
                  </strong>

                  <span>
                    Enters subject marks
                  </span>
                </div>

                <div>
                  <strong>
                    System
                  </strong>

                  <span>
                    Generates combined result
                  </span>
                </div>

              </div>

            </div>

          </section>
        )}

      </div>

      {/* ====================================================
          CREATE EXAM TYPE MODAL
      ==================================================== */}

      {showExamTypeModal && (
        <div
          className="assessment-modal-overlay"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              closeExamTypeModal();
            }
          }}
        >

          <div className="assessment-modal">

            <div className="assessment-modal-header">

              <div>

                <span>
                  NEW EXAM CONFIGURATION
                </span>

                <h3>
                  Create Exam Type
                </h3>

                <p>
                  Add an official assessment type
                  for this institution.
                </p>

              </div>

              <button
                type="button"
                className="assessment-modal-close"
                onClick={closeExamTypeModal}
              >
                ×
              </button>

            </div>

            <form
              onSubmit={createExamType}
            >

              <div className="assessment-form-grid">

                <div className="assessment-form-field">

                  <label>
                    Exam Type Name
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. CT, ST, Mid Term"
                    value={
                      examTypeForm.name
                    }
                    onChange={(e) =>
                      setExamTypeForm({
                        ...examTypeForm,
                        name: e.target.value,
                      })
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
                      examTypeForm.description
                    }
                    onChange={(e) =>
                      setExamTypeForm({
                        ...examTypeForm,
                        description:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>

              {examTypeError && (
                <div className="assessment-form-error">
                  {examTypeError}
                </div>
              )}

              <div className="assessment-modal-footer">

                <button
                  type="button"
                  className="assessment-cancel-btn"
                  onClick={
                    closeExamTypeModal
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="assessment-save-btn"
                >
                  Create Exam Type
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ====================================================
          CREATE MARK STRUCTURE MODAL
      ==================================================== */}

      {showStructureModal && (
        <div
          className="assessment-modal-overlay"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              closeStructureModal();
            }
          }}
        >

          <div className="assessment-modal">

            <div className="assessment-modal-header">

              <div>

                <span>
                  SUBJECT MARKING CONFIGURATION
                </span>

                <h3>
                  Create Mark Structure
                </h3>

                <p>
                  Define marks for a specific
                  class, group, subject and exam.
                </p>

              </div>

              <button
                type="button"
                className="assessment-modal-close"
                onClick={
                  closeStructureModal
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={createMarkStructure}
            >

              <div className="assessment-form-grid">

                <div className="assessment-form-field">

                  <label>
                    Exam Type
                  </label>

                  <select
                    value={
                      structureForm.examType
                    }
                    onChange={(e) =>
                      updateStructureField(
                        "examType",
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Select Exam
                    </option>

                    {examTypes.map(
                      (examType) => (
                        <option
                          key={examType.id}
                          value={examType.name}
                        >
                          {examType.name}
                        </option>
                      )
                    )}

                  </select>

                </div>

                <div className="assessment-form-field">

                  <label>
                    Class
                  </label>

                  <input
                    type="text"
                    list="class-options"
                    placeholder="e.g. Class 9"
                    value={
                      structureForm.className
                    }
                    onChange={(e) =>
                      updateStructureField(
                        "className",
                        e.target.value
                      )
                    }
                  />

                  <datalist id="class-options">
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

                <div className="assessment-form-field">

                  <label>
                    Group
                  </label>

                  <input
                    type="text"
                    list="group-options"
                    placeholder="e.g. Science"
                    value={
                      structureForm.group
                    }
                    onChange={(e) =>
                      updateStructureField(
                        "group",
                        e.target.value
                      )
                    }
                  />

                  <datalist id="group-options">
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

                <div className="assessment-form-field">

                  <label>
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Physics"
                    value={
                      structureForm.subject
                    }
                    onChange={(e) =>
                      updateStructureField(
                        "subject",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              <div className="assessment-components-heading">

                <div>

                  <strong>
                    Mark Components
                  </strong>

                  <span>
                    Add MCQ, Written, Practical,
                    Viva or any custom component.
                  </span>

                </div>

                <div className="assessment-live-total">

                  Total

                  <strong>
                    {calculateStructureTotal()}
                  </strong>

                </div>

              </div>

              <div className="assessment-form-components">

                {structureForm.components.map(
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
                          value={
                            component.name
                          }
                          onChange={(e) =>
                            updateStructureComponent(
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
                          value={
                            component.marks
                          }
                          onChange={(e) =>
                            updateStructureComponent(
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
                          removeStructureComponent(
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

              <button
                type="button"
                className="add-component-btn"
                onClick={
                  addStructureComponent
                }
              >
                <span>+</span>
                Add Component
              </button>

              <div className="assessment-preview">

                <div className="assessment-preview-head">

                  <div>

                    <span>
                      LIVE PREVIEW
                    </span>

                    <strong>
                      {structureForm.subject ||
                        "Subject"}
                    </strong>

                  </div>

                  <div>

                    <strong>
                      {calculateStructureTotal()}
                    </strong>

                    <span>
                      Total Marks
                    </span>

                  </div>

                </div>

                <div className="assessment-preview-list">

                  {structureForm.components.map(
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

              {structureError && (
                <div className="assessment-form-error">
                  {structureError}
                </div>
              )}

              <div className="assessment-modal-footer">

                <button
                  type="button"
                  className="assessment-cancel-btn"
                  onClick={
                    closeStructureModal
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="assessment-save-btn"
                >
                  Save Mark Structure
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ====================================================
          CREATE RESULT RULE MODAL
      ==================================================== */}

      {showRuleModal && (
        <div
          className="assessment-modal-overlay"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              closeRuleModal();
            }
          }}
        >

          <div className="assessment-modal">

            <div className="assessment-modal-header">

              <div>

                <span>
                  RESULT CALCULATION CONFIGURATION
                </span>

                <h3>
                  Create Result Rule
                </h3>

                <p>
                  Decide how different exams
                  contribute to the final result.
                </p>

              </div>

              <button
                type="button"
                className="assessment-modal-close"
                onClick={closeRuleModal}
              >
                ×
              </button>

            </div>

            <form
              onSubmit={createResultRule}
            >

              <div className="assessment-form-grid">

                <div className="assessment-form-field">

                  <label>
                    Rule Name
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Annual Final Result"
                    value={ruleForm.name}
                    onChange={(e) =>
                      updateRuleBasic(
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
                    placeholder="e.g. Yearly result"
                    value={
                      ruleForm.description
                    }
                    onChange={(e) =>
                      updateRuleBasic(
                        "description",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              <div className="assessment-components-heading">

                <div>

                  <strong>
                    Exam Weight
                  </strong>

                  <span>
                    Total weight must equal 100%.
                  </span>

                </div>

                <div className="assessment-live-total">

                  Total

                  <strong>
                    {calculateRuleWeight()}%
                  </strong>

                </div>

              </div>

              <div className="assessment-form-components">

                {ruleForm.components.map(
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
                          Exam
                        </label>

                        <select
                          value={
                            component.examType
                          }
                          onChange={(e) =>
                            updateRuleComponent(
                              component.id,
                              "examType",
                              e.target.value
                            )
                          }
                        >

                          <option value="">
                            Select Exam
                          </option>

                          {examTypes.map(
                            (examType) => (
                              <option
                                key={examType.id}
                                value={
                                  examType.name
                                }
                              >
                                {
                                  examType.name
                                }
                              </option>
                            )
                          )}

                        </select>

                      </div>

                      <div className="assessment-component-input small">

                        <label>
                          Weight %
                        </label>

                        <input
                          type="number"
                          min="1"
                          max="100"
                          placeholder="20"
                          value={
                            component.weight
                          }
                          onChange={(e) =>
                            updateRuleComponent(
                              component.id,
                              "weight",
                              e.target.value
                            )
                          }
                        />

                      </div>

                      <button
                        type="button"
                        className="component-remove-btn"
                        onClick={() =>
                          removeRuleComponent(
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

              <button
                type="button"
                className="add-component-btn"
                onClick={
                  addRuleComponent
                }
              >
                <span>+</span>
                Add Exam
              </button>

              {ruleError && (
                <div className="assessment-form-error">
                  {ruleError}
                </div>
              )}

              <div className="assessment-modal-footer">

                <button
                  type="button"
                  className="assessment-cancel-btn"
                  onClick={
                    closeRuleModal
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="assessment-save-btn"
                >
                  Create Result Rule
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
