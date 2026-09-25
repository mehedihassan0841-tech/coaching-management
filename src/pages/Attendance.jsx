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

import { attendanceRecords } from "../data/mockData";
import "../styles/admin-attendance.css";

const monthlyData = [
  { month: "Jan", present: 91, absent: 9 },
  { month: "Feb", present: 87, absent: 13 },
  { month: "Mar", present: 82, absent: 18 },
  { month: "Apr", present: 89, absent: 11 },
  { month: "May", present: 85, absent: 15 },
  { month: "Jun", present: 92, absent: 8 },
  { month: "Jul", present: 88, absent: 12 },
  { month: "Aug", present: 94, absent: 6 },
  { month: "Sep", present: 90, absent: 10 },
  { month: "Oct", present: 86, absent: 14 },
  { month: "Nov", present: 93, absent: 7 },
  { month: "Dec", present: 89, absent: 11 },
];

const periodOptions = [
  "Today",
  "1 Week",
  "2 Weeks",
  "1 Month",
  "January",
  "February",
  "Last 3 Months",
  "Last 6 Months",
  "1 Year",
];

function Attendance() {
  const [selectedDate, setSelectedDate] = useState("2026-09-12");

  const [search, setSearch] = useState({
    className: "",
    studentId: "",
    roll: "",
    section: "",
    group: "",
  });

  const [analyticsFilter, setAnalyticsFilter] = useState({
    className: "",
    section: "",
    group: "",
    period: "1 Month",
  });

  const filteredRecords = attendanceRecords.filter((rec, index) => {
    const studentId =
      rec.studentId || `S-${String(index + 1).padStart(3, "0")}`;

    const roll = String(rec.roll || index + 1);

    const classText = String(rec.className || "").toLowerCase();
    const idText = studentId.toLowerCase();
    const rollText = roll.toLowerCase();
    const sectionText = String(rec.section || "").toLowerCase();
    const groupText = String(rec.group || "").toLowerCase();

    return (
      (!search.className ||
        classText.includes(search.className.toLowerCase().trim())) &&
      (!search.studentId ||
        idText.includes(search.studentId.toLowerCase().trim())) &&
      (!search.roll ||
        rollText.includes(search.roll.toLowerCase().trim())) &&
      (!search.section ||
        sectionText.includes(search.section.toLowerCase().trim())) &&
      (!search.group ||
        groupText.includes(search.group.toLowerCase().trim()))
    );
  });

  /*
    Analytics filter
    এখন dummy data দিয়ে chart দেখাচ্ছে।
    Backend connect করলে এখানে real attendance data আসবে।
  */
  const analyticsRecords = attendanceRecords.filter((rec) => {
    const classMatch =
      !analyticsFilter.className ||
      String(rec.className || "")
        .toLowerCase()
        .includes(analyticsFilter.className.toLowerCase());

    const sectionMatch =
      !analyticsFilter.section ||
      String(rec.section || "")
        .toLowerCase()
        .includes(analyticsFilter.section.toLowerCase());

    const groupMatch =
      !analyticsFilter.group ||
      String(rec.group || "")
        .toLowerCase()
        .includes(analyticsFilter.group.toLowerCase());

    return classMatch && sectionMatch && groupMatch;
  });

  const totalStudents = analyticsRecords.length || 60;

  const totalPresent =
    analyticsRecords.length > 0
      ? analyticsRecords.reduce((sum, rec) => sum + Number(rec.present || 0), 0)
      : 52;

  const totalAbsent =
    analyticsRecords.length > 0
      ? analyticsRecords.reduce((sum, rec) => sum + Number(rec.absent || 0), 0)
      : 8;

  const totalAttendanceDays = totalPresent + totalAbsent;

  const attendanceRate =
    totalAttendanceDays > 0
      ? ((totalPresent / totalAttendanceDays) * 100).toFixed(1)
      : "0.0";

  const presentAbsentData = [
    {
      name: "Present",
      value: totalPresent,
    },
    {
      name: "Absent",
      value: totalAbsent,
    },
  ];

  return (
    <div className="page-block">
      <div className="students-container">
                <section className="attendance-analytics">

          <div className="analytics-heading">
            <div>
              <span className="analytics-kicker">
                ATTENDANCE ANALYTICS
              </span>

              <h2>Class Attendance Insights</h2>

              <p>
                Analyze attendance performance by class, section and group.
              </p>
            </div>
          </div>

          {/* ================= FILTER ================= */}

          <div className="analytics-filter-card">

            <div className="analytics-filter-title">
              <span>Analytics Filter</span>
              <small>
                Select one or combine multiple filters
              </small>
            </div>

            <div className="analytics-filters">

              <select
                value={analyticsFilter.className}
                onChange={(e) =>
                  setAnalyticsFilter({
                    ...analyticsFilter,
                    className: e.target.value,
                  })
                }
              >
                <option value="">All Classes</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>

              <select
                value={analyticsFilter.section}
                onChange={(e) =>
                  setAnalyticsFilter({
                    ...analyticsFilter,
                    section: e.target.value,
                  })
                }
              >
                <option value="">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>

              <select
                value={analyticsFilter.group}
                onChange={(e) =>
                  setAnalyticsFilter({
                    ...analyticsFilter,
                    group: e.target.value,
                  })
                }
              >
                <option value="">All Groups</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>

              <select
                value={analyticsFilter.period}
                onChange={(e) =>
                  setAnalyticsFilter({
                    ...analyticsFilter,
                    period: e.target.value,
                  })
                }
              >
                {periodOptions.map((period) => (
                  <option key={period}>{period}</option>
                ))}
              </select>

            </div>
          </div>

          {/* ================= STAT CARDS ================= */}

          <div className="analytics-stats">

            <div className="analytics-stat-card">
              <span className="stat-label">Total Students</span>
              <strong>{totalStudents}</strong>
              <small>Selected group</small>
            </div>

            <div className="analytics-stat-card present-stat">
              <span className="stat-label">Present</span>
              <strong>{totalPresent}</strong>
              <small>Attendance records</small>
            </div>

            <div className="analytics-stat-card absent-stat">
              <span className="stat-label">Absent</span>
              <strong>{totalAbsent}</strong>
              <small>Attendance records</small>
            </div>

            <div className="analytics-stat-card rate-stat">
              <span className="stat-label">Attendance Rate</span>
              <strong>{attendanceRate}%</strong>
              <small>Overall attendance</small>
            </div>

          </div>

          {/* ================= CHART GRID ================= */}

          <div className="analytics-chart-grid">

            {/* PRESENT VS ABSENT */}

            <div className="analytics-chart-card">

              <div className="chart-card-header">
                <div>
                  <h3>Present vs Absent</h3>
                  <p>
                    {analyticsFilter.className || "All Classes"}
                    {analyticsFilter.section &&
                      ` • Section ${analyticsFilter.section}`}
                    {analyticsFilter.group &&
                      ` • ${analyticsFilter.group}`}
                  </p>
                </div>

                <span className="chart-period">
                  {analyticsFilter.period}
                </span>
              </div>

              <div className="pie-chart-area">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={presentAbsentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={105}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#4f46e5" />
                      <Cell fill="#f97316" />
                    </Pie>

                    <Tooltip />

                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pie-center">
                  <strong>{attendanceRate}%</strong>
                  <span>Present</span>
                </div>
              </div>

            </div>

            {/* MONTHLY TREND */}

            <div className="analytics-chart-card">

              <div className="chart-card-header">
                <div>
                  <h3>Attendance Trend</h3>
                  <p>Monthly attendance performance</p>
                </div>

                <span className="chart-period">
                  1 Year
                </span>
              </div>

              <div className="line-chart-area">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis dataKey="month" />

                    <YAxis domain={[0, 100]} />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="present"
                      name="Present %"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 7 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="absent"
                      name="Absent %"
                      stroke="#f97316"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>

          </div>

          {/* ================= MONTHLY BAR CHART ================= */}

          <div className="analytics-chart-card monthly-performance">

            <div className="chart-card-header">
              <div>
                <h3>Monthly Attendance Performance</h3>
                <p>
                  Compare present and absent percentages throughout the year
                </p>
              </div>

              <span className="chart-period">
                {analyticsFilter.period}
              </span>
            </div>

            <div className="bar-chart-area">

              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis dataKey="month" />

                  <YAxis domain={[0, 100]} />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="present"
                    name="Present %"
                    fill="#4f46e5"
                    radius={[7, 7, 0, 0]}
                  />

                  <Bar
                    dataKey="absent"
                    name="Absent %"
                    fill="#f97316"
                    radius={[7, 7, 0, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>

            </div>

          </div>

        </section>

        {/* ================= HEADER ================= */}

        <div className="students-container-header">
          <div>
            <h2>Attendance Overview</h2>
            <p>Monthly attendance summary for all students</p>
          </div>

          <div className="header-actions attendance-header-actions">
            <input
              type="date"
              className="student-search attendance-date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <button className="add-student-btn attendance-report-btn">
              View Monthly Report
            </button>
          </div>
        </div>

        {/* ================= TABLE SEARCH ================= */}

        <div className="attendance-searches">
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
            placeholder="Search Group..."
            className="student-search"
            value={search.group}
            onChange={(e) =>
              setSearch({
                ...search,
                group: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Search Student ID..."
            className="student-search"
            value={search.studentId}
            onChange={(e) =>
              setSearch({
                ...search,
                studentId: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Search Roll..."
            className="student-search"
            value={search.roll}
            onChange={(e) =>
              setSearch({
                ...search,
                roll: e.target.value,
              })
            }
          />
        </div>

        {/* ================= STUDENT TABLE ================= */}

        <div className="table-wrap attendance-table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Roll</th>
                <th>Student</th>
                <th>Class</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Attendance</th>
                <th>Section</th>
                <th>Group</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((rec, index) => {
                const pct =
                  rec.total > 0
                    ? Math.round((rec.present / rec.total) * 100)
                    : 0;

                return (
                  <tr key={rec.id}>
                    <td>
                      <div className="attendance-id-action">
                        <span className="student-id">
                          {rec.studentId ||
                            `S-${String(index + 1).padStart(3, "0")}`}
                        </span>

                        <button
                          type="button"
                          className="attendance-view-btn"
                          title="View attendance details"
                          onClick={() =>
                            console.log(
                              "View attendance:",
                              rec.studentId ||
                                `S-${String(index + 1).padStart(3, "0")}`
                            )
                          }
                        >
                          👁
                        </button>
                      </div>
                    </td>

                    <td>{rec.roll || index + 1}</td>

                    <td className="cell-name">
                      <span className="mini-avatar">
                        {rec.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </span>

                      {rec.name}
                    </td>

                    <td>{rec.className}</td>

                    <td>{rec.present}</td>

                    <td>{rec.absent}</td>

                    <td>
                      <div className="progress-cell">
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${pct}%`,
                              background:
                                pct >= 90
                                  ? "#22c55e"
                                  : pct >= 75
                                  ? "#6c63ff"
                                  : "#f59e0b",
                            }}
                          ></div>
                        </div>

                        <span>{pct}%</span>
                      </div>
                    </td>

                    <td>{rec.section || "A"}</td>

                    <td>
                      <span className="group-badge">
                        {rec.group || "Science"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ================================================= */}
        {/*              ATTENDANCE ANALYTICS                 */}
        {/* ================================================= */}



      </div>
    </div>
  );
}

export default Attendance;