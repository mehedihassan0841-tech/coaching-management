
function StudentFees() {
  const fees = [
    {
      month: "September 2026",
      amount: 1500,
      paid: 1500,
      due: 0,
      status: "Paid",
      date: "05 September 2026",
    },
    {
      month: "August 2026",
      amount: 1500,
      paid: 1500,
      due: 0,
      status: "Paid",
      date: "05 August 2026",
    },
    {
      month: "July 2026",
      amount: 1500,
      paid: 1000,
      due: 500,
      status: "Partial",
      date: "08 July 2026",
    },
    {
      month: "June 2026",
      amount: 1500,
      paid: 1500,
      due: 0,
      status: "Paid",
      date: "05 June 2026",
    },
  ];

  const totalAmount = fees.reduce(
    (total, fee) => total + fee.amount,
    0
  );

  const totalPaid = fees.reduce(
    (total, fee) => total + fee.paid,
    0
  );

  const totalDue = fees.reduce(
    (total, fee) => total + fee.due,
    0
  );

  return (
    <div className="student-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Fees</h1>
          <p>View your fee payment history and outstanding balance.</p>
        </div>
      </div>

      {/* Summary */}
      <div className="student-fees-summary">
        <div className="student-fee-summary-card">
          <div className="student-fee-icon">৳</div>

          <div>
            <span>Total Fees</span>
            <strong>৳{totalAmount}</strong>
          </div>
        </div>

        <div className="student-fee-summary-card">
          <div className="student-fee-icon">✓</div>

          <div>
            <span>Total Paid</span>
            <strong>৳{totalPaid}</strong>
          </div>
        </div>

        <div className="student-fee-summary-card">
          <div className="student-fee-icon">!</div>

          <div>
            <span>Total Due</span>
            <strong>৳{totalDue}</strong>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="student-fees-section">
        <div className="student-fees-section-header">
          <div>
            <h2>Payment History</h2>
            <p>Your monthly fee payment records</p>
          </div>
        </div>

        <div className="student-fees-list">
          {fees.map((fee, index) => (
            <div className="student-fee-card" key={index}>
              {/* Month */}
              <div className="student-fee-month">
                <div className="student-fee-month-icon">
                  ৳
                </div>

                <div>
                  <h3>{fee.month}</h3>
                  <p>Payment date: {fee.date}</p>
                </div>
              </div>

              {/* Amount */}
              <div className="student-fee-amount">
                <span>Amount</span>
                <strong>৳{fee.amount}</strong>
              </div>

              {/* Paid */}
              <div className="student-fee-paid">
                <span>Paid</span>
                <strong>৳{fee.paid}</strong>
              </div>

              {/* Due */}
              <div className="student-fee-due">
                <span>Due</span>
                <strong>৳{fee.due}</strong>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`student-fee-status ${
                    fee.status === "Paid"
                      ? "student-fee-status-paid"
                      : "student-fee-status-partial"
                  }`}
                >
                  {fee.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentFees;

