import { useEffect, useState } from "react";

function StudentFees() {
  const [showIntro, setShowIntro] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* =========================================
          GLASS PAYMENT INTRO
      ========================================= */}
      {showIntro && (
        <div className="fees-glass-intro">
          <div className="fees-glass-scene">

            {/* Soft background light */}
            <div className="fees-glass-orb fees-glass-orb-one"></div>
            <div className="fees-glass-orb fees-glass-orb-two"></div>

            {/* Glass Payment Card */}
            <div className="fees-glass-card">

              <div className="fees-glass-card-shine"></div>

              <div className="fees-glass-card-top">
                <span>FEES</span>
                <span className="fees-glass-card-chip"></span>
              </div>

              <div className="fees-glass-card-info">
                <span>STUDENT PAYMENT</span>
                <strong>ARIF RAHMAN</strong>
              </div>

              <div className="fees-glass-card-bottom">
                <span>09 / 26</span>
                <strong>৳1,500</strong>
              </div>

              <div className="fees-glass-card-lines">
                <i></i>
                <i></i>
                <i></i>
              </div>

            </div>

            {/* Glass Payment Terminal */}
            <div className="fees-payment-terminal">

              <div className="fees-terminal-glass"></div>

              <div className="fees-terminal-screen">
                <span className="fees-terminal-small">
                  TAP TO PAY
                </span>

                <div className="fees-terminal-contact">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div className="fees-terminal-base">
                <span></span>
                <span></span>
              </div>

              {/* Successful Payment */}
              <div className="fees-payment-success">
                <div className="fees-success-check">
                  ✓
                </div>

                <span>Payment Successful</span>
              </div>

            </div>

            {/* Ripple between card and terminal */}
            <div className="fees-payment-ripple"></div>

            {/* Intro label */}
            <div className="fees-intro-label">
              <span>SECURE PAYMENT</span>
              <strong>FEES</strong>
            </div>

          </div>
        </div>
      )}

      {/* =========================================
          ACTUAL FEES PAGE
      ========================================= */}
      <div
        className={`student-page ${
          showIntro
            ? "fees-page-hidden"
            : "fees-page-visible"
        }`}
      >

        {/* Header */}
        <div className="student-page-header">
          <div>
            <h1>Fees</h1>
            <p>
              View your fee payment history and outstanding balance.
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="student-fees-summary">

          <div className="student-fee-summary-card">
            <div className="student-fee-icon">
              ৳
            </div>

            <div>
              <span>Total Fees</span>
              <strong>৳{totalAmount}</strong>
            </div>
          </div>

          <div className="student-fee-summary-card">
            <div className="student-fee-icon">
              ✓
            </div>

            <div>
              <span>Total Paid</span>
              <strong>৳{totalPaid}</strong>
            </div>
          </div>

          <div className="student-fee-summary-card">
            <div className="student-fee-icon">
              !
            </div>

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

              <div
                className="student-fee-card"
                key={index}
              >

                {/* Month */}
                <div className="student-fee-month">

                  <div className="student-fee-month-icon">
                    ৳
                  </div>

                  <div>
                    <h3>{fee.month}</h3>
                    <p>
                      Payment date: {fee.date}
                    </p>
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
    </>
  );
}

export default StudentFees;

