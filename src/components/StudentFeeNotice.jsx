import { feeRecords } from "../data/mockData";

function StudentFeeNotice() {
  const studentName = "Arif Rahman";

  const dueFee = feeRecords.find(
    (fee) =>
      fee.student === studentName &&
      fee.status === "Due"
  );

  return (
    <section className="student-fee-notice">

      <div className="student-fee-icon">
        💳
      </div>

      <div className="student-fee-content">
        <span>FEE STATUS</span>

        {dueFee ? (
          <>
            <h2>Monthly fee payment is due</h2>

            <p>
              Your {dueFee.month} tuition fee of{" "}
              <strong>
                ৳{dueFee.amount.toLocaleString()}
              </strong>{" "}
              is currently pending.
            </p>
          </>
        ) : (
          <>
            <h2>All fees are up to date 🎉</h2>

            <p>
              You don't have any outstanding fee payments.
            </p>
          </>
        )}
      </div>

      <div className="student-fee-action">
        {dueFee ? (
          <button className="student-fee-btn">
            View Payment
          </button>
        ) : (
          <span className="student-fee-paid">
            Paid
          </span>
        )}
      </div>

    </section>
  );
}

export default StudentFeeNotice;