import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/teacher-exams.css";

function TeacherExams() {
  const navigate = useNavigate();

  // =========================================================
  // 1. EXAM SETUP
  // =========================================================

  const [exams, setExams] = useState([
    {
      id: "EX-001",
      name: "Physics CT-01",
      type: "CT",
      subject: "Physics",
      totalMarks: 10,
      mcqMarks: 0,
      writtenMarks: 10,
      className: "HSC 2027",
      section: "A",
      group: "Science",
      shift: "Morning",
      examDate: "2026-09-20",
    },
    {
      id: "EX-002",
      name: "Physics Mid Term",
      type: "Mid Term",
      subject: "Physics",
      totalMarks: 30,
      mcqMarks: 10,
      writtenMarks: 20,
      className: "HSC 2027",
      section: "A",
      group: "Science",
      shift: "Morning",
      examDate: "2026-09-25",
    },
    {
      id: "EX-003",
      name: "Physics Model Test",
      type: "Model Test",
      subject: "Physics",
      totalMarks: 100,
      mcqMarks: 40,
      writtenMarks: 60,
      className: "HSC 2027",
      section: "A",
      group: "Science",
      shift: "Morning",
      examDate: "2026-10-05",
    },
  ]);

  const [showCreateExam, setShowCreateExam] = useState(false);

  const [examForm, setExamForm] = useState({
    name: "",
    type: "",
    subject: "Physics",
    totalMarks: "",
    mcqMarks: "",
    writtenMarks: "",
    className: "HSC 2027",
    section: "A",
    group: "Science",
    shift: "Morning",
    examDate: "",
  });

  function updateExamForm(field, value) {
    setExamForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function createExam() {
    const total = Number(examForm.totalMarks);
    const mcq = Number(examForm.mcqMarks || 0);
    const written = Number(examForm.writtenMarks || 0);

    if (!examForm.name.trim()) {
      alert("Please enter exam name.");
      return;
    }

    if (!examForm.type.trim()) {
      alert("Please enter exam type.");
      return;
    }

    if (!total || total <= 0) {
      alert("Please enter valid total marks.");
      return;
    }

    if (mcq + written !== total) {
      alert("MCQ Marks + Written Marks must equal Total Marks.");
      return;
    }

    const newExam = {
      id: `EX-${String(exams.length + 1).padStart(3, "0")}`,
      ...examForm,
      totalMarks: total,
      mcqMarks: mcq,
      writtenMarks: written,
    };

    setExams((current) => [...current, newExam]);

    setExamForm({
      name: "",
      type: "",
      subject: "Physics",
      totalMarks: "",
      mcqMarks: "",
      writtenMarks: "",
      className: "HSC 2027",
      section: "A",
      group: "Science",
      shift: "Morning",
      examDate: "",
    });

    setShowCreateExam(false);
  }

  // =========================================================
  // 2. EXAM + CLASS FILTER
  // =========================================================

  const [selectedExamId, setSelectedExamId] = useState("EX-001");

  const [selectedClass, setSelectedClass] = useState("HSC 2027");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedGroup, setSelectedGroup] = useState("Science");
  const [selectedShift, setSelectedShift] = useState("Morning");

  const selectedExam =
    exams.find((exam) => exam.id === selectedExamId) || exams[0];

  // =========================================================
  // 3. STUDENTS
  // =========================================================

  const [students, setStudents] = useState([
    {
      id: "ST-001",
      name: "Rahim",
      roll: "01",
      className: "HSC 2027",
      group: "Science",
      section: "A",
      shift: "Morning",
      subject: "Physics",
    },
    {
      id: "ST-002",
      name: "Karim",
      roll: "02",
      className: "HSC 2027",
      group: "Science",
      section: "A",
      shift: "Morning",
      subject: "Physics",
    },
    {
      id: "ST-003",
      name: "Sakib",
      roll: "03",
      className: "HSC 2027",
      group: "Science",
      section: "A",
      shift: "Morning",
      subject: "Physics",
    },
    {
      id: "ST-004",
      name: "Hasan",
      roll: "04",
      className: "HSC 2027",
      group: "Science",
      section: "A",
      shift: "Morning",
      subject: "Physics",
    },
    {
      id: "ST-005",
      name: "Nabil",
      roll: "05",
      className: "HSC 2027",
      group: "Science",
      section: "A",
      shift: "Morning",
      subject: "Physics",
    },
    {
      id: "ST-006",
      name: "Rafi",
      roll: "06",
      className: "HSC 2027",
      group: "Science",
      section: "A",
      shift: "Morning",
      subject: "Physics",
    },
  ]);

  // =========================================================
  // 4. MARKS
  // =========================================================

  /*
    examMarks structure:

    {
      "EX-001": {
        "ST-001": 8,
        "ST-002": 7
      }
    }
  */

  const [examMarks, setExamMarks] = useState({
    "EX-001": {
      "ST-001": 8,
      "ST-002": 7,
      "ST-003": 9,
      "ST-004": 6,
      "ST-005": 5,
      "ST-006": 4,
    },

    "EX-002": {
      "ST-001": 25,
      "ST-002": 22,
      "ST-003": 28,
      "ST-004": 19,
      "ST-005": 17,
      "ST-006": 14,
    },

    "EX-003": {
      "ST-001": 82,
      "ST-002": 76,
      "ST-003": 91,
      "ST-004": 69,
      "ST-005": 62,
      "ST-006": 55,
    },
  });

  function updateMarks(studentId, value) {
    if (!selectedExam) return;

    if (value === "") {
      setExamMarks((current) => ({
        ...current,
        [selectedExam.id]: {
          ...(current[selectedExam.id] || {}),
          [studentId]: "",
        },
      }));

      return;
    }

    let marks = Number(value);

    if (Number.isNaN(marks)) {
      return;
    }

    if (marks < 0) {
      marks = 0;
    }

    if (marks > selectedExam.totalMarks) {
      marks = selectedExam.totalMarks;
    }

    setExamMarks((current) => ({
      ...current,
      [selectedExam.id]: {
        ...(current[selectedExam.id] || {}),
        [studentId]: marks,
      },
    }));
  }

  // =========================================================
  // 5. FILTER STUDENTS
  // =========================================================

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      return (
        student.className === selectedClass &&
        student.section === selectedSection &&
        student.group === selectedGroup &&
        student.shift === selectedShift &&
        student.subject === selectedExam?.subject
      );
    });
  }, [
    students,
    selectedClass,
    selectedSection,
    selectedGroup,
    selectedShift,
    selectedExam,
  ]);

  // =========================================================
  // 6. SUBJECT RESULT
  // =========================================================

  const subjectResults = useMemo(() => {
    if (!selectedExam) return [];

    const marksForExam = examMarks[selectedExam.id] || {};

    return filteredStudents
      .map((student) => {
        const marks = Number(marksForExam[student.id] || 0);

        const percentage =
          selectedExam.totalMarks > 0
            ? (marks / selectedExam.totalMarks) * 100
            : 0;

        return {
          ...student,
          marks,
          percentage,
        };
      })
      .sort((a, b) => b.marks - a.marks)
      .map((student, index) => ({
        ...student,
        position: index + 1,
      }));
  }, [
    filteredStudents,
    examMarks,
    selectedExam,
  ]);

  const highestMarks =
    subjectResults.length > 0
      ? subjectResults[0].marks
      : 0;

  const subjectAverage =
    subjectResults.length > 0
      ? subjectResults.reduce(
          (sum, student) => sum + student.percentage,
          0
        ) / subjectResults.length
      : 0;

  const passedStudents = subjectResults.filter(
    (student) => student.percentage >= 40
  ).length;

  const failedStudents =
    subjectResults.length - passedStudents;

  const aPlusStudents = subjectResults.filter(
    (student) => student.percentage >= 80
  ).length;

  // =========================================================
  // 7. CLASS TEACHER RESULT FORMULA
  // =========================================================

  const [resultFormula, setResultFormula] = useState([
    {
      id: 1,
      examId: "EX-001",
      weight: 20,
    },
    {
      id: 2,
      examId: "EX-002",
      weight: 30,
    },
    {
      id: 3,
      examId: "EX-003",
      weight: 20,
    },
  ]);

  const [resultName, setResultName] = useState(
    "HSC 2027 Final Result"
  );

  function addFormulaItem() {
    const unusedExam = exams.find(
      (exam) =>
        !resultFormula.some(
          (item) => item.examId === exam.id
        )
    );

    if (!unusedExam) {
      alert("All available exams are already added.");
      return;
    }

    setResultFormula((current) => [
      ...current,
      {
        id: Date.now(),
        examId: unusedExam.id,
        weight: 0,
      },
    ]);
  }

  function updateFormulaItem(id, field, value) {
    setResultFormula((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "weight"
                  ? Number(value)
                  : value,
            }
          : item
      )
    );
  }

  function removeFormulaItem(id) {
    setResultFormula((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  const totalWeight = resultFormula.reduce(
    (sum, item) => sum + Number(item.weight || 0),
    0
  );

  // =========================================================
  // 8. FINAL CLASS RESULT
  // =========================================================

  const finalResults = useMemo(() => {
    return filteredStudents
      .map((student) => {
        let finalPercentage = 0;

        resultFormula.forEach((formula) => {
          const exam = exams.find(
            (item) => item.id === formula.examId
          );

          if (!exam) return;

          const marks = Number(
            examMarks[exam.id]?.[student.id] || 0
          );

          const percentage =
            exam.totalMarks > 0
              ? (marks / exam.totalMarks) * 100
              : 0;

          finalPercentage +=
            (percentage * Number(formula.weight || 0)) /
            100;
        });

        return {
          ...student,
          finalPercentage,
        };
      })
      .sort(
        (a, b) =>
          b.finalPercentage - a.finalPercentage
      )
      .map((student, index) => ({
        ...student,
        position: index + 1,
      }));
  }, [
    filteredStudents,
    resultFormula,
    exams,
    examMarks,
  ]);

  function getGrade(percentage) {
    if (percentage >= 80) return "A+";
    if (percentage >= 70) return "A";
    if (percentage >= 60) return "A-";
    if (percentage >= 50) return "B";
    if (percentage >= 40) return "C";
    if (percentage >= 33) return "D";
    return "F";
  }

  // =========================================================
  // 9. SAVE FUNCTIONS
  // =========================================================

  function saveExamMarks() {
    console.log("Exam Marks:", {
      exam: selectedExam,
      className: selectedClass,
      section: selectedSection,
      group: selectedGroup,
      shift: selectedShift,
      marks: examMarks[selectedExam.id],
    });

    alert("Exam marks saved successfully!");
  }

  function saveResultFormula() {
    if (!resultName.trim()) {
      alert("Please enter result name.");
      return;
    }

    if (totalWeight !== 100) {
      alert(
        `Result formula must total 100%. Current total: ${totalWeight}%`
      );
      return;
    }

    console.log("Result Formula:", {
      resultName,
      className: selectedClass,
      section: selectedSection,
      group: selectedGroup,
      shift: selectedShift,
      items: resultFormula,
    });

    alert("Result formula saved successfully!");
  }

  function generateFinalResult() {
    if (totalWeight !== 100) {
      alert(
        `Formula must total 100%. Current total: ${totalWeight}%`
      );
      return;
    }

    alert(
      `Final result generated for ${finalResults.length} students.`
    );
  }

  function openStudentPortfolio(studentId) {
    console.log("Open student portfolio:", studentId);

    // Later this can become:
    // navigate(`/student/${studentId}`);

    alert(`Student portfolio: ${studentId}`);
  }

  return (
    <div className="dashboard-page teacher-exams-page">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="teacher-exams-header">
        <div>
          <p className="teacher-dashboard-eyebrow">
            Teacher Portal
          </p>

          <h1>Exam & Result Management</h1>

          <p>
            Create exams, enter marks and generate
            subject and class results.
          </p>
        </div>

        <button
          type="button"
          className="teacher-save-results-btn"
          onClick={() => setShowCreateExam(true)}
        >
          + Create Exam
        </button>
      </div>

      {/* =====================================================
          STAGE 1 — EXAM SETUP
      ====================================================== */}

      <div className="dashboard-panel teacher-exam-control-panel">

        <div className="panel-header">
          <div>
            <h2>Exam Setup</h2>
            <p>
              Select an existing exam or create a new
              exam structure.
            </p>
          </div>

          <span className="teacher-exam-student-count">
            {exams.length} Exams
          </span>
        </div>

        <div className="teacher-exam-controls">

          <div className="teacher-exam-field">
            <label>Exam</label>

            <select
              value={selectedExamId}
              onChange={(e) =>
                setSelectedExamId(e.target.value)
              }
            >
              {exams.map((exam) => (
                <option
                  key={exam.id}
                  value={exam.id}
                >
                  {exam.name}
                </option>
              ))}
            </select>
          </div>

          <div className="teacher-exam-field">
            <label>Exam Type</label>

            <input
              type="text"
              value={selectedExam?.type || ""}
              readOnly
            />
          </div>

          <div className="teacher-exam-field">
            <label>Subject</label>

            <input
              type="text"
              value={selectedExam?.subject || ""}
              readOnly
            />
          </div>

          <div className="teacher-exam-field">
            <label>Total Marks</label>

            <div className="teacher-total-marks">
              {selectedExam?.totalMarks || 0}
            </div>
          </div>

          <div className="teacher-exam-field">
            <label>MCQ</label>

            <div className="teacher-total-marks">
              {selectedExam?.mcqMarks || 0}
            </div>
          </div>

          <div className="teacher-exam-field">
            <label>Written</label>

            <div className="teacher-total-marks">
              {selectedExam?.writtenMarks || 0}
            </div>
          </div>

        </div>

      </div>

      {/* =====================================================
          STAGE 2 — CLASS SEARCH
      ====================================================== */}

      <div className="dashboard-panel teacher-exam-filter-panel">

        <div className="panel-header">
          <div>
            <h2>Find Students</h2>

            <p>
              Select class, section, group and shift.
            </p>
          </div>
        </div>

        <div className="teacher-exam-controls">

          <div className="teacher-exam-field">
            <label>Class</label>

            <input
              list="teacher-exam-classes"
              value={selectedClass}
              onChange={(e) =>
                setSelectedClass(e.target.value)
              }
            />

            <datalist id="teacher-exam-classes">
              <option value="HSC 2027" />
              <option value="HSC 2026" />
              <option value="Class 9" />
              <option value="Class 10" />
            </datalist>
          </div>

          <div className="teacher-exam-field">
            <label>Section</label>

            <input
              list="teacher-exam-sections"
              value={selectedSection}
              onChange={(e) =>
                setSelectedSection(e.target.value)
              }
            />

            <datalist id="teacher-exam-sections">
              <option value="A" />
              <option value="B" />
              <option value="C" />
              <option value="D" />
            </datalist>
          </div>

          <div className="teacher-exam-field">
            <label>Group</label>

            <input
              list="teacher-exam-groups"
              value={selectedGroup}
              onChange={(e) =>
                setSelectedGroup(e.target.value)
              }
            />

            <datalist id="teacher-exam-groups">
              <option value="Science" />
              <option value="Commerce" />
              <option value="Arts" />
            </datalist>
          </div>

          <div className="teacher-exam-field">
            <label>Shift</label>

            <input
              list="teacher-exam-shifts"
              value={selectedShift}
              onChange={(e) =>
                setSelectedShift(e.target.value)
              }
            />

            <datalist id="teacher-exam-shifts">
              <option value="Morning" />
              <option value="Day" />
              <option value="Afternoon" />
              <option value="Evening" />
            </datalist>
          </div>

        </div>

      </div>

      {/* =====================================================
          STAGE 3 — SUBJECT MARKS
      ====================================================== */}

      <div className="teacher-exam-summary">

        <div className="teacher-exam-summary-card">
          <span>Total Students</span>
          <strong>
            {subjectResults.length}
          </strong>
          <small>
            Selected class
          </small>
        </div>

        <div className="teacher-exam-summary-card">
          <span>Highest Marks</span>
          <strong>
            {highestMarks}
          </strong>
          <small>
            Out of {selectedExam?.totalMarks}
          </small>
        </div>

        <div className="teacher-exam-summary-card">
          <span>Average</span>
          <strong>
            {subjectAverage.toFixed(1)}%
          </strong>
          <small>
            Subject performance
          </small>
        </div>

        <div className="teacher-exam-summary-card">
          <span>Passed</span>
          <strong>
            {passedStudents}
          </strong>
          <small>
            {failedStudents} failed
          </small>
        </div>

      </div>

      <div className="dashboard-panel teacher-exam-results-panel">

        <div className="panel-header">

          <div>
            <h2>Enter Exam Marks</h2>

            <p>
              {selectedExam?.name} ·{" "}
              {selectedExam?.totalMarks} marks
            </p>
          </div>

          <span className="teacher-exam-student-count">
            {subjectResults.length} Students
          </span>

        </div>

        <div className="teacher-exam-table-wrapper">

          <table className="teacher-exam-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Roll</th>
                <th>Student</th>
                <th>Class</th>
                <th>Group</th>
                <th>Section</th>
                <th>Shift</th>
                <th>Subject</th>
                <th>
                  Marks / {selectedExam?.totalMarks}
                </th>
                <th>Percentage</th>
                <th>Result</th>
              </tr>
            </thead>

            <tbody>

              {subjectResults.map((student) => (

                <tr key={student.id}>

                  <td>
                    <div className="teacher-exam-id-action">

                      <span className="teacher-exam-student-id">
                        {student.id}
                      </span>

                      <button
                        type="button"
                        className="teacher-student-eye-btn"
                        title="View student portfolio"
                        onClick={() =>
                          openStudentPortfolio(
                            student.id
                          )
                        }
                      >
                        👁
                      </button>

                    </div>
                  </td>

                  <td>
                    <span className="teacher-exam-roll">
                      {student.roll}
                    </span>
                  </td>

                  <td>
                    <strong className="teacher-exam-student-name">
                      {student.name}
                    </strong>
                  </td>

                  <td>{student.className}</td>

                  <td>{student.group}</td>

                  <td>{student.section}</td>

                  <td>{student.shift}</td>

                  <td>{selectedExam?.subject}</td>

                  <td>

                    <input
                      type="number"
                      min="0"
                      max={selectedExam?.totalMarks}
                      value={
                        examMarks[selectedExam?.id]?.[
                          student.id
                        ] ?? ""
                      }
                      onChange={(e) =>
                        updateMarks(
                          student.id,
                          e.target.value
                        )
                      }
                      className="teacher-marks-input"
                    />

                  </td>

                  <td>
                    <strong className="teacher-exam-percentage">
                      {student.percentage.toFixed(1)}%
                    </strong>
                  </td>

                  <td>

                    <span
                      className={
                        student.percentage >= 40
                          ? "teacher-result-badge pass"
                          : "teacher-result-badge fail"
                      }
                    >
                      {student.percentage >= 40
                        ? "Passed"
                        : "Failed"}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="teacher-exam-footer">

          <div>
            <strong>
              {selectedExam?.name}
            </strong>

            <span>
              {selectedClass} ·{" "}
              {selectedSection} ·{" "}
              {selectedGroup} ·{" "}
              {selectedShift}
            </span>
          </div>

          <button
            type="button"
            className="teacher-save-results-btn"
            onClick={saveExamMarks}
          >
            Save Exam Marks
          </button>

        </div>

      </div>

      {/* =====================================================
          STAGE 4 — RESULT FORMULA
      ====================================================== */}

      <div className="dashboard-panel teacher-result-formula-panel">

        <div className="panel-header">

          <div>
            <h2>Class Teacher Result Formula</h2>

            <p>
              Combine CT, Mid, Model Test or any custom
              exam into a final result.
            </p>
          </div>

          <span
            className={
              totalWeight === 100
                ? "teacher-formula-total valid"
                : "teacher-formula-total invalid"
            }
          >
            Total {totalWeight}%
          </span>

        </div>

        <div className="teacher-result-name-field">

          <label>Result Name</label>

          <input
            type="text"
            value={resultName}
            onChange={(e) =>
              setResultName(e.target.value)
            }
            placeholder="Example: HSC 2027 Final Result"
          />

        </div>

        <div className="teacher-formula-table-wrapper">

          <table className="teacher-formula-table">

            <thead>
              <tr>
                <th>Exam</th>
                <th>Type</th>
                <th>Total Marks</th>
                <th>Weight</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {resultFormula.map((item) => {

                const exam = exams.find(
                  (examItem) =>
                    examItem.id === item.examId
                );

                return (
                  <tr key={item.id}>

                    <td>

                      <select
                        value={item.examId}
                        onChange={(e) =>
                          updateFormulaItem(
                            item.id,
                            "examId",
                            e.target.value
                          )
                        }
                      >

                        {exams.map((examItem) => (
                          <option
                            key={examItem.id}
                            value={examItem.id}
                          >
                            {examItem.name}
                          </option>
                        ))}

                      </select>

                    </td>

                    <td>
                      {exam?.type}
                    </td>

                    <td>
                      {exam?.totalMarks}
                    </td>

                    <td>

                      <div className="teacher-weight-input">

                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={item.weight}
                          onChange={(e) =>
                            updateFormulaItem(
                              item.id,
                              "weight",
                              e.target.value
                            )
                          }
                        />

                        <span>%</span>

                      </div>

                    </td>

                    <td>

                      <button
                        type="button"
                        className="teacher-remove-formula-btn"
                        onClick={() =>
                          removeFormulaItem(item.id)
                        }
                      >
                        Remove
                      </button>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        <div className="teacher-formula-actions">

          <button
            type="button"
            className="teacher-add-formula-btn"
            onClick={addFormulaItem}
          >
            + Add Exam
          </button>

          <button
            type="button"
            className="teacher-save-results-btn"
            onClick={saveResultFormula}
          >
            Save Result Formula
          </button>

        </div>

      </div>

      {/* =====================================================
          STAGE 5 — FINAL CLASS RESULT
      ====================================================== */}

      <div className="dashboard-panel teacher-final-result-panel">

        <div className="panel-header">

          <div>
            <h2>Final Class Result</h2>

            <p>
              {resultName}
            </p>
          </div>

          <button
            type="button"
            className="teacher-save-results-btn"
            onClick={generateFinalResult}
          >
            Generate Result
          </button>

        </div>

        <div className="teacher-final-result-info">

          <span>
            {selectedClass}
          </span>

          <span>
            Section {selectedSection}
          </span>

          <span>
            {selectedGroup}
          </span>

          <span>
            {selectedShift}
          </span>

          <span>
            Formula {totalWeight}%
          </span>

        </div>

        <div className="teacher-exam-table-wrapper">

          <table className="teacher-exam-table">

            <thead>
              <tr>
                <th>Position</th>
                <th>ID</th>
                <th>Roll</th>
                <th>Student</th>
                <th>Final %</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {finalResults.map((student) => {

                const grade = getGrade(
                  student.finalPercentage
                );

                return (
                  <tr key={student.id}>

                    <td>
                      <span
                        className={
                          student.position <= 3
                            ? "teacher-position-badge top"
                            : "teacher-position-badge"
                        }
                      >
                        {student.position}
                      </span>
                    </td>

                    <td>
                      <div className="teacher-exam-id-action">

                        <span className="teacher-exam-student-id">
                          {student.id}
                        </span>

                        <button
                          type="button"
                          className="teacher-student-eye-btn"
                          title="View student portfolio"
                          onClick={() =>
                            openStudentPortfolio(
                              student.id
                            )
                          }
                        >
                          👁
                        </button>

                      </div>
                    </td>

                    <td>
                      {student.roll}
                    </td>

                    <td>
                      <strong>
                        {student.name}
                      </strong>
                    </td>

                    <td>
                      <strong className="teacher-exam-percentage">
                        {student.finalPercentage.toFixed(
                          2
                        )}
                        %
                      </strong>
                    </td>

                    <td>
                      <span className="teacher-result-grade">
                        {grade}
                      </span>
                    </td>

                    <td>

                      <span
                        className={
                          student.finalPercentage >= 33
                            ? "teacher-result-badge pass"
                            : "teacher-result-badge fail"
                        }
                      >
                        {student.finalPercentage >= 33
                          ? "Passed"
                          : "Failed"}
                      </span>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          CREATE EXAM MODAL
      ====================================================== */}

      {showCreateExam && (

        <div
          className="teacher-exam-modal-overlay"
          onClick={() =>
            setShowCreateExam(false)
          }
        >

          <div
            className="teacher-exam-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="teacher-exam-modal-header">

              <div>
                <span>
                  Teacher Portal
                </span>

                <h2>
                  Create New Exam
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowCreateExam(false)
                }
              >
                ×
              </button>

            </div>

            <div className="teacher-exam-modal-body">

              <div className="teacher-modal-grid">

                <div className="teacher-exam-field">
                  <label>Exam Name</label>

                  <input
                    type="text"
                    placeholder="Example: Physics CT-02"
                    value={examForm.name}
                    onChange={(e) =>
                      updateExamForm(
                        "name",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="teacher-exam-field">
                  <label>Exam Type</label>

                  <input
                    type="text"
                    placeholder="CT / Mid / ST / Model Test"
                    value={examForm.type}
                    onChange={(e) =>
                      updateExamForm(
                        "type",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="teacher-exam-field">
                  <label>Subject</label>

                  <input
                    type="text"
                    value={examForm.subject}
                    onChange={(e) =>
                      updateExamForm(
                        "subject",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="teacher-exam-field">
                  <label>Total Marks</label>

                  <input
                    type="number"
                    min="1"
                    placeholder="10 / 30 / 100"
                    value={examForm.totalMarks}
                    onChange={(e) =>
                      updateExamForm(
                        "totalMarks",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="teacher-exam-field">
                  <label>MCQ Marks</label>

                  <input
                    type="number"
                    min="0"
                    value={examForm.mcqMarks}
                    onChange={(e) =>
                      updateExamForm(
                        "mcqMarks",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="teacher-exam-field">
                  <label>Written Marks</label>

                  <input
                    type="number"
                    min="0"
                    value={examForm.writtenMarks}
                    onChange={(e) =>
                      updateExamForm(
                        "writtenMarks",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="teacher-exam-field">
                  <label>Class</label>

                  <input
                    type="text"
                    value={examForm.className}
                    onChange={(e) =>
                      updateExamForm(
                        "className",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="teacher-exam-field">
                  <label>Section</label>

                  <input
                    type="text"
                    value={examForm.section}
                    onChange={(e) =>
                      updateExamForm(
                        "section",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="teacher-exam-field">
                  <label>Group</label>

                  <input
                    type="text"
                    value={examForm.group}
                    onChange={(e) =>
                      updateExamForm(
                        "group",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="teacher-exam-field">
                  <label>Shift</label>

                  <input
                    type="text"
                    value={examForm.shift}
                    onChange={(e) =>
                      updateExamForm(
                        "shift",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="teacher-exam-field">
                  <label>Exam Date</label>

                  <input
                    type="date"
                    value={examForm.examDate}
                    onChange={(e) =>
                      updateExamForm(
                        "examDate",
                        e.target.value
                      )
                    }
                  />
                </div>

              </div>

              <div className="teacher-exam-mark-rule">

                <strong>
                  Marks Structure
                </strong>

                <span>
                  MCQ + Written must equal Total Marks.
                </span>

              </div>

            </div>

            <div className="teacher-exam-modal-footer">

              <button
                type="button"
                className="teacher-cancel-btn"
                onClick={() =>
                  setShowCreateExam(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="teacher-save-results-btn"
                onClick={createExam}
              >
                Create Exam
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default TeacherExams;