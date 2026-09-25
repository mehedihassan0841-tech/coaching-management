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

import { feeRecords } from "../data/mockData";
import "../styles/admin-fees.css";

const monthlyFeeData = [
  { month: "Jan", collected: 185000, due: 32000 },
  { month: "Feb", collected: 198000, due: 27000 },
  { month: "Mar", collected: 205000, due: 24000 },
  { month: "Apr", collected: 192000, due: 35000 },
  { month: "May", collected: 218000, due: 21000 },
  { month: "Jun", collected: 225000, due: 18000 },
  { month: "Jul", collected: 211000, due: 29000 },
  { month: "Aug", collected: 238000, due: 16000 },
  { month: "Sep", collected: 229000, due: 22000 },
  { month: "Oct", collected: 242000, due: 19000 },
  { month: "Nov", collected: 251000, due: 15000 },
  { month: "Dec", collected: 260000, due: 12000 },
];

const monthOptions = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Fees() {
  const [filter, setFilter] = useState("All");

  const [search, setSearch] = useState({
    className: "",
    studentId: "",
    section: "",
    roll: "",
  });

  const [selectedMonth, setSelectedMonth] = useState("All Months");

  const filtered = feeRecords.filter((f, index) => {
    const studentId =
      f.studentId || `S-${String(index + 1).padStart(3, "0")}`;

    const roll = String(f.roll || index + 1);

    const classText = String(f.className || "").toLowerCase();
    const idText = studentId.toLowerCase();
    const sectionText = String(f.section || "").toLowerCase();
    const rollText = roll.toLowerCase();

    const statusMatch =
      filter === "All" || f.status === filter;

    const monthMatch =
      selectedMonth === "All Months" ||
      String(f.month || "")
        .toLowerCase()
        .includes(selectedMonth.replace("All Months", "").toLowerCase());

    return (
      statusMatch &&
      monthMatch &&
      (!search.className ||
        classText.includes(search.className.toLowerCase().trim())) &&
      (!search.studentId ||
        idText.includes(search.studentId.toLowerCase().trim())) &&
      (!search.section ||
        sectionText.includes(search.section.toLowerCase().trim())) &&
      (!search.roll ||
        rollText.includes(search.roll.toLowerCase().trim()))
    );
  });

  const totalCollected = feeRecords
    .filter((f) => f.status === "Paid")
    .reduce((sum, f) => sum + Number(f.amount || 0), 0);

  const totalDue = feeRecords
    .filter((f) => f.status === "Due")
    .reduce((sum, f) => sum + Number(f.amount || 0), 0);

  const totalAmount = totalCollected + totalDue;

  const collectionRate =
    totalAmount > 0
      ? ((totalCollected / totalAmount) * 100).toFixed(1)
      : "0.0";

  const dueStudents = feeRecords.filter(
    (f) => f.status === "Due"
  ).length;

  const paidStudents = feeRecords.filter(
    (f) => f.status === "Paid"
  ).length;

  const paymentStatusData = [
    {
      name: "Collected",
      value: totalCollected,
    },
    {
      name: "Due",
      value: totalDue,
    },
  ];

  return (
    <div className="page-block">
      <div className="students-container">

        {/* ================= HEADER ================= */}

        <div className="students-container-header">
          <div>
            <span className="fees-kicker">FEE MANAGEMENT</span>

            <h2>Fee & Collection Overview</h2>

            <p>
              Monitor student payments, dues and yearly collection
              performance.
            </p>
          </div>

          <div className="fees-header-actions">
            <select
              className="student-search"
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(e.target.value)
              }
            >
              {monthOptions.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ================================================= */}
        {/*                    ANALYTICS                       */}
        {/* ================================================= */}

        <section className="fees-analytics">

          {/* ================= STAT CARDS ================= */}

          <div className="fees-stat-grid">

            <div className="fees-stat-card collected">
              <span>Collected</span>

              <strong>
                ৳{totalCollected.toLocaleString()}
              </strong>

              <small>Paid fee amount</small>
            </div>

            <div className="fees-stat-card due">
              <span>Total Due</span>

              <strong>
                ৳{totalDue.toLocaleString()}
              </strong>

              <small>Outstanding amount</small>
            </div>

            <div className="fees-stat-card rate">
              <span>Collection Rate</span>

              <strong>{collectionRate}%</strong>

              <small>Of total payable amount</small>
            </div>

            <div className="fees-stat-card students">
              <span>Students With Due</span>

              <strong>{dueStudents}</strong>

              <small>
                {paidStudents} payment records paid
              </small>
            </div>

          </div>

          {/* ================= CHARTS ================= */}

          <div className="fees-chart-grid">

            {/* COLLECTION PIE */}

            <div className="fees-chart-card">

              <div className="fees-chart-header">
                <div>
                  <h3>Collection Status</h3>

                  <p>
                    Collected vs outstanding fees
                  </p>
                </div>

                <span className="fees-chart-tag">
                  2026
                </span>
              </div>

              <div className="fees-pie-area">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={paymentStatusData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={72}
                      outerRadius={108}
                      paddingAngle={5}
                    >
                      <Cell fill="#4f46e5" />
                      <Cell fill="#f97316" />
                    </Pie>

                    <Tooltip
                      formatter={(value) =>
                        `৳${Number(value).toLocaleString()}`
                      }
                    />

                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="fees-pie-center">
                  <strong>{collectionRate}%</strong>
                  <span>Collected</span>
                </div>

              </div>
            </div>

            {/* MONTHLY COLLECTION */}

            <div className="fees-chart-card">

              <div className="fees-chart-header">
                <div>
                  <h3>Monthly Collection</h3>

                  <p>
                    Collected amount vs outstanding dues
                  </p>
                </div>

                <span className="fees-chart-tag">
                  Full Year
                </span>
              </div>

              <div className="fees-line-area">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart data={monthlyFeeData}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis dataKey="month" />

                    <YAxis
                      tickFormatter={(value) =>
                        `৳${value / 1000}k`
                      }
                    />

                    <Tooltip
                      formatter={(value) =>
                        `৳${Number(value).toLocaleString()}`
                      }
                    />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="collected"
                      name="Collected"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 7 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="due"
                      name="Due"
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

          {/* ================= YEARLY BAR ================= */}

          <div className="fees-chart-card yearly-fee-chart">

            <div className="fees-chart-header">

              <div>
                <h3>Yearly Fee Performance</h3>

                <p>
                  Monthly collected and outstanding amount
                </p>
              </div>

              <span className="fees-chart-tag">
                January — December
              </span>

            </div>

            <div className="fees-bar-area">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={monthlyFeeData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis dataKey="month" />

                  <YAxis
                    tickFormatter={(value) =>
                      `৳${value / 1000}k`
                    }
                  />

                  <Tooltip
                    formatter={(value) =>
                      `৳${Number(value).toLocaleString()}`
                    }
                  />

                  <Legend />

                  <Bar
                    dataKey="collected"
                    name="Collected"
                    fill="#4f46e5"
                    radius={[7, 7, 0, 0]}
                  />

                  <Bar
                    dataKey="due"
                    name="Due"
                    fill="#f97316"
                    radius={[7, 7, 0, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>

            </div>
          </div>

        </section>

        {/* ================================================= */}
        {/*                    FEE RECORDS                     */}
        {/* ================================================= */}

        <div className="fee-records-container">

          <div className="students-container-header">

            <div>
              <h2>Student Fee Records</h2>

              <p>
                Search individual students and review payment status.
              </p>
            </div>

            <div className="fee-status-filter">

              <button
                className={filter === "All" ? "active" : ""}
                onClick={() => setFilter("All")}
              >
                All
              </button>

              <button
                className={filter === "Paid" ? "active paid" : ""}
                onClick={() => setFilter("Paid")}
              >
                Paid
              </button>

              <button
                className={filter === "Due" ? "active due" : ""}
                onClick={() => setFilter("Due")}
              >
                Due
              </button>

            </div>

          </div>

          {/* ================= SEARCH ================= */}

          <div className="fees-searches">

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

          {/* ================= TABLE ================= */}

          <div className="table-wrap fees-table-scroll">

            <table className="data-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Roll</th>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Month</th>
                  <th>Amount</th>
                  <th>Paid</th>
                  <th>Due</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filtered.map((f, index) => {

                  const studentId =
                    f.studentId ||
                    `S-${String(index + 1).padStart(3, "0")}`;

                  const roll =
                    f.roll || index + 1;

                  const dueAmount =
                    f.status === "Due"
                      ? Number(f.amount || 0)
                      : 0;

                  const paidAmount =
                    f.status === "Paid"
                      ? Number(f.amount || 0)
                      : 0;

                  const duePercent =
                    f.status === "Due" ? 100 : 0;

                  return (
                    <tr key={f.id}>

                      <td>
                        <div className="fee-id-action">

                          <span className="student-id">
                            {studentId}
                          </span>

                          <button
                            type="button"
                            className="fee-view-btn"
                            title="View student fee details"
                            onClick={() =>
                              console.log(
                                "View fee:",
                                studentId
                              )
                            }
                          >
                            👁
                          </button>

                        </div>
                      </td>

                      <td>{roll}</td>

                      <td className="cell-name">
                        {f.student}
                      </td>

                      <td>{f.className}</td>

                      <td>{f.section || "A"}</td>

                      <td>{f.month}</td>

                      <td>
                        ৳{Number(f.amount || 0).toLocaleString()}
                      </td>

                      <td className="paid-amount">
                        ৳{paidAmount.toLocaleString()}
                      </td>

                      <td className="due-amount">
                        ৳{dueAmount.toLocaleString()}
                      </td>

                      <td>
                        <div className="fee-status-cell">

                          <span
                            className={`badge ${
                              f.status === "Paid"
                                ? "badge-active"
                                : "badge-pending"
                            }`}
                          >
                            {f.status}
                          </span>

                          {f.status === "Due" && (
                            <small>
                              {duePercent}% due
                            </small>
                          )}

                        </div>
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Fees;