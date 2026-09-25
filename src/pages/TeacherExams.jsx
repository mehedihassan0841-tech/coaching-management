
import { useMemo, useState } from "react";
import "../styles/teacher-exams.css";

function getGrade(percentage) {
  if (percentage >= 80) return "A+";
  if (percentage >= 70) return "A";
  if (percentage >= 60) return "A-";
  if (percentage >= 50) return "B";
  if (percentage >= 40) return "C";
  if (percentage >= 33) return "D";
  return "F";
}

function TeacherExams() {
  // =====================================================
  // EXAMS
  // Admin থেকে পরে API দিয়ে আসবে
  // =====================================================
  const exams = [
    {
      id: "EX-001",
      name: "Physics CT-01",
      type: "CT",
      subject: "Physics",
      className: "HSC 2027",
      section: "A",
      group: "Science",
      shift: "Morning",
      examDate: "2026-09-20",
      totalMarks: 10,
      components: [
        { id: "C1", name: "Written", maxMarks: 10 },
      ],
    },

    {
      id: "EX-002",
      name: "Physics Mid Term",
      type: "Mid Term",
      subject: "Physics",
      className: "HSC 2027",
      section: "A",
      group: "Science",
      shift: "Morning",
      examDate: "2026-09-25",
      totalMarks: 30,
      components: [
        { id: "C2", name: "MCQ", maxMarks: 10 },
        { id: "C3", name: "Written", maxMarks: 15 },
        { id: "C4", name: "Practical", maxMarks: 5 },
      ],
    },

    {
      id: "EX-003",
      name: "Physics Model Test",
      type: "Model Test",
      subject: "Physics",
      className: "HSC 2027",
      section: "A",
      group: "Science",
      shift: "Morning",
      examDate: "2026-10-05",
      totalMarks: 100,
      components: [
        { id: "C5", name: "MCQ", maxMarks: 40 },
        { id: "C6", name: "Written", maxMarks: 60 },
      ],
    },
  ];

  // =====================================================
  // STUDENTS
  // =====================================================
  const students = [
    {
      id: "ST-001",
      roll: 1,
      name: "Abdullah Rahman",
      className: "HSC 2027",
      section: "A",
      group: "Science",
      shift: "Morning",
      subject: "Physics",
    },
    {
      id: "ST-002",
      roll: 2,
      name: "Tanvir Ahmed",
      className: "HSC 2027",
      section: "A",
      group: "Science",
      shift: "Morning",
      subject: "Physics",
    },
    {
      id: "ST-003",
      roll: 3,
      name: "Sakib Hasan",
      className: "HSC 2027",
      section: "A",
      group: "Science",
      shift: "Morning",
      subject: "Physics",
    },
    {
      id: "ST-004",
      roll: 4,
      name: "Fahim Hossain",
      className: "HSC 2027",
      section: "A",
      group: "Science",
      shift: "Morning",
      subject: "Physics",
    },
    {
      id: "ST-005",
      roll: 5,
      name: "Nayeem Islam",
      className: "HSC 2027",
      section: "A",
      group: "Science",
      shift: "Morning",
      subject: "Physics",
    },
    {
      id: "ST-006",
      roll: 6,
      name: "Rakibul Hasan",
      className: "HSC 2027",
      section: "A",
      group: "Science",
      shift: "Morning",
      subject: "Physics",
    },
  ];

  // =====================================================
  // SELECTED EXAM
  // =====================================================
  const [selectedExamId, setSelectedExamId] = useState("EX-002");

  const selectedExam = exams.find(
    (exam) => exam.id === selectedExamId
  );

  // =====================================================
  // FILTERS
  // =====================================================
  const [classFilter, setClassFilter] = useState("HSC 2027");
  const [sectionFilter, setSectionFilter] = useState("A");
  const [groupFilter, setGroupFilter] = useState("Science");
  const [shiftFilter, setShiftFilter] = useState("Morning");

  // =====================================================
  // MARKS
  // =====================================================
  const [marks, setMarks] = useState({
    "EX-002": {
      "ST-001": {
        MCQ: 8,
        Written: 13,
        Practical: 4,
      },
      "ST-002": {
        MCQ: 7,
        Written: 12,
        Practical: 5,
      },
      "ST-003": {
        MCQ: 9,
        Written: 14,
        Practical: 5,
      },
      "ST-004": {
        MCQ: 6,
        Written: 11,
        Practical: 4,
      },
      "ST-005": {
        MCQ: 8,
        Written: 10,
        Practical: 3,
      },
      "ST-006": {
        MCQ: 5,
        Written: 12,
        Practical: 4,
      },
    },
  });

  // =====================================================
  // FILTER STUDENTS
  // =====================================================
  const filteredStudents = useMemo(() => {
    return students.filter(
      (student) =>
        student.className === classFilter &&
        student.section === sectionFilter &&
        student.group === groupFilter &&
        student.shift === shiftFilter &&
        student.subject === selectedExam?.subject
    );
  }, [
    classFilter,
    sectionFilter,
    groupFilter,
    shiftFilter,
    selectedExam,
  ]);

  // =====================================================
  // UPDATE MARKS
  // =====================================================
  const updateMarks = (studentId, componentName, value) => {
    const component = selectedExam?.components.find(
      (item) => item.name === componentName
    );

    if (!component) return;

    let numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      numericValue = 0;
    }

    numericValue = Math.max(
      0,
      Math.min(numericValue, component.maxMarks)
    );

    setMarks((prev) => ({
      ...prev,
      [selectedExam.id]: {
        ...prev[selectedExam.id],
        [studentId]: {
          ...prev[selectedExam.id]?.[studentId],
          [componentName]: numericValue,
        },
      },
    }));
  };

  // =====================================================
  // CALCULATE TOTAL
  // =====================================================
  const calculateTotal = (studentId) => {
    const studentMarks =
      marks[selectedExam.id]?.[studentId] || {};

    return selectedExam.components.reduce((total, component) => {
      return total + Number(studentMarks[component.name] || 0);
    }, 0);
  };

  // =====================================================
  // SUMMARY
  // =====================================================
  const results = filteredStudents.map((student) => {
    const total = calculateTotal(student.id);

    const percentage =
      selectedExam.totalMarks > 0
        ? (total / selectedExam.totalMarks) * 100
        : 0;

    return {
      ...student,
      total,
      percentage,
      grade: getGrade(percentage),
    };
  });

  const average =
    results.length > 0
      ? results.reduce((sum, student) => sum + student.total, 0) /
        results.length
      : 0;

  const highest =
    results.length > 0
      ? Math.max(...results.map((student) => student.total))
      : 0;

  const passed = results.filter(
    (student) => student.percentage >= 33
  ).length;

  // =====================================================
  // SAVE
  // =====================================================
  const handleSave = () => {
    alert(
      `${selectedExam.name} marks saved successfully.`
    );
  };

  return (
    <div className="teacher-exams-page">
      {/* =================================================
          HEADER
      ================================================= */}
      <div className="teacher-exams-header">
        <div>
          <span className="page-eyebrow">Teacher Portal</span>

          <h1>Exam Marks</h1>

          <p>
            Enter and manage marks for your assigned exams.
          </p>
        </div>
      </div>

      {/* =================================================
          EXAM SELECT
      ================================================= */}
      <section className="teacher-exam-card">
        <div className="teacher-section-title">
          <div>
            <h2>Select Exam</h2>
            <p>Choose an exam to enter student marks.</p>
          </div>
        </div>

        <div className="teacher-exam-select-row">
          <div className="teacher-field">
            <label>Exam</label>

            <select
              value={selectedExamId}
              onChange={(e) =>
                setSelectedExamId(e.target.value)
              }
            >
              {exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.name}
                </option>
              ))}
            </select>
          </div>

          <div className="teacher-exam-info">
            <span>{selectedExam.type}</span>
            <strong>{selectedExam.subject}</strong>
            <small>
              Exam Date: {selectedExam.examDate}
            </small>
          </div>
        </div>
      </section>

      {/* =================================================
          FILTERS
      ================================================= */}
      <section className="teacher-exam-card">
        <div className="teacher-section-title">
          <div>
            <h2>Find Students</h2>
            <p>Filter your assigned students.</p>
          </div>
        </div>

        <div className="teacher-filters">
          <div className="teacher-field">
            <label>Class</label>

            <select
              value={classFilter}
              onChange={(e) =>
                setClassFilter(e.target.value)
              }
            >
              <option>HSC 2027</option>
            </select>
          </div>

          <div className="teacher-field">
            <label>Section</label>

            <select
              value={sectionFilter}
              onChange={(e) =>
                setSectionFilter(e.target.value)
              }
            >
              <option>A</option>
              <option>B</option>
            </select>
          </div>

          <div className="teacher-field">
            <label>Group</label>

            <select
              value={groupFilter}
              onChange={(e) =>
                setGroupFilter(e.target.value)
              }
            >
              <option>Science</option>
              <option>Business Studies</option>
              <option>Humanities</option>
            </select>
          </div>

          <div className="teacher-field">
            <label>Shift</label>

            <select
              value={shiftFilter}
              onChange={(e) =>
                setShiftFilter(e.target.value)
              }
            >
              <option>Morning</option>
              <option>Day</option>
            </select>
          </div>
        </div>
      </section>

      {/* =================================================
          EXAM INFO
      ================================================= */}
      <section className="teacher-exam-info-bar">
        <div>
          <span>Exam</span>
          <strong>{selectedExam.name}</strong>
        </div>

        <div>
          <span>Subject</span>
          <strong>{selectedExam.subject}</strong>
        </div>

        <div>
          <span>Total Marks</span>
          <strong>{selectedExam.totalMarks}</strong>
        </div>

        <div>
          <span>Students</span>
          <strong>{filteredStudents.length}</strong>
        </div>
      </section>

      {/* =================================================
          SUMMARY
      ================================================= */}
      <section className="teacher-summary-grid">
        <div className="teacher-summary-card">
          <span>Highest</span>
          <strong>
            {highest}/{selectedExam.totalMarks}
          </strong>
        </div>

        <div className="teacher-summary-card">
          <span>Average</span>
          <strong>{average.toFixed(1)}</strong>
        </div>

        <div className="teacher-summary-card">
          <span>Passed</span>
          <strong>
            {passed}/{results.length}
          </strong>
        </div>

        <div className="teacher-summary-card">
          <span>Components</span>
          <strong>
            {selectedExam.components.length}
          </strong>
        </div>
      </section>

     
{/* =================================================
    MARKS TABLE
================================================= */}
<section className="teacher-exam-card marks-entry-card">
  <div className="teacher-section-title">
    <div>
      <h2>Enter Marks</h2>

      <p>
        Enter marks according to the exam mark
        structure.
      </p>
    </div>

    <button
      className="teacher-save-btn"
      onClick={handleSave}
    >
      Save Marks
    </button>
  </div>

  <div className="teacher-table-wrapper">
    <table className="teacher-marks-table">
      <thead>
        <tr>
          {/* Roll first */}
          <th>Roll</th>

          {/* Dynamic Marks Components */}
          {selectedExam.components.map(
            (component) => (
              <th key={component.id}>
                {component.name}
                <small>
                  / {component.maxMarks}
                </small>
              </th>
            )
          )}

          {/* Result */}
          <th>Total</th>
          <th>%</th>
          <th>Grade</th>

          {/* Student information on the right */}
          <th>ID</th>
          <th>Student</th>
        </tr>
      </thead>

      <tbody>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => {
            const total = calculateTotal(
              student.id
            );

            const percentage =
              selectedExam.totalMarks > 0
                ? (total /
                    selectedExam.totalMarks) *
                  100
                : 0;

            return (
              <tr key={student.id}>
                {/* Roll */}
                <td>
                  <strong>{student.roll}</strong>
                </td>

                {/* Dynamic Marks Inputs */}
                {selectedExam.components.map(
                  (component) => (
                    <td key={component.id}>
                      <input
                        type="number"
                        min="0"
                        max={component.maxMarks}
                        value={
                          marks[selectedExam.id]?.[
                            student.id
                          ]?.[component.name] ?? ""
                        }
                        onChange={(e) =>
                          updateMarks(
                            student.id,
                            component.name,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  )
                )}

                {/* Total */}
                <td>
                  <strong>
                    {total}/{selectedExam.totalMarks}
                  </strong>
                </td>

                {/* Percentage */}
                <td>
                  {percentage.toFixed(0)}%
                </td>

                {/* Grade */}
                <td>
                  <span className="teacher-grade">
                    {getGrade(percentage)}
                  </span>
                </td>

                {/* ID */}
                <td>{student.id}</td>

                {/* Student */}
                <td>
                  <div className="teacher-student-name">
                    <strong>{student.name}</strong>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td
              colSpan={
                selectedExam.components.length + 7
              }
              className="teacher-empty-state"
            >
              No students found for the selected
              filters.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  <div className="teacher-table-footer">
    <span>
      {filteredStudents.length} students
    </span>

    <button
      className="teacher-save-btn"
      onClick={handleSave}
    >
      Save Marks
    </button>
  </div>
</section>

    </div>
  );
}

export default TeacherExams;
