export const students = [
  { id: 1, name: "Arif Rahman", className: "Class 10", subject: "Science", status: "Active", phone: "01711-223344", fee: "Paid" },
  { id: 2, name: "Nusrat Sultana", className: "Class 9", subject: "Science", status: "Active", phone: "01911-556677", fee: "Paid" },
  { id: 3, name: "Fahim Ahmed", className: "Class 8", subject: "General", status: "Pending", phone: "01611-889900", fee: "Due" },
  { id: 4, name: "Sumaiya Akter", className: "Class 10", subject: "Science", status: "Active", phone: "01811-112233", fee: "Paid" },
  { id: 5, name: "Tanvir Hasan", className: "Class 9", subject: "Science", status: "Active", phone: "01511-445566", fee: "Due" },
  { id: 6, name: "Mim Akter", className: "Class 8", subject: "General", status: "Active", phone: "01311-778899", fee: "Paid" },
];

export const teachers = [
  { id: 1, name: "Rafiqul Islam", subject: "Physics", classes: "Class 9-10", phone: "01711-000111", status: "Active", joined: "Jan 2023" },
  { id: 2, name: "Shirin Akter", subject: "Chemistry", classes: "Class 9-10", phone: "01811-222333", status: "Active", joined: "Mar 2023" },
  { id: 3, name: "Kamal Hossain", subject: "Mathematics", classes: "Class 8-10", phone: "01911-444555", status: "Active", joined: "Jun 2022" },
  { id: 4, name: "Farzana Yasmin", subject: "English", classes: "Class 6-8", phone: "01611-666777", status: "On Leave", joined: "Sep 2023" },
];

export const feeRecords = [
  { id: 1, student: "Arif Rahman", className: "Class 10", month: "September", amount: 1500, status: "Paid", date: "2026-09-03" },
  { id: 2, student: "Nusrat Sultana", className: "Class 9", month: "September", amount: 1200, status: "Paid", date: "2026-09-04" },
  { id: 3, student: "Fahim Ahmed", className: "Class 8", month: "September", amount: 1000, status: "Due", date: "-" },
  { id: 4, student: "Sumaiya Akter", className: "Class 10", month: "September", amount: 1500, status: "Paid", date: "2026-09-02" },
  { id: 5, student: "Tanvir Hasan", className: "Class 9", month: "September", amount: 1200, status: "Due", date: "-" },
  { id: 6, student: "Mim Akter", className: "Class 8", month: "September", amount: 1000, status: "Paid", date: "2026-09-05" },
];

export const attendanceRecords = [
  { id: 1, name: "Arif Rahman", className: "Class 10", present: 24, absent: 2, total: 26 },
  { id: 2, name: "Nusrat Sultana", className: "Class 9", present: 25, absent: 1, total: 26 },
  { id: 3, name: "Fahim Ahmed", className: "Class 8", present: 19, absent: 7, total: 26 },
  { id: 4, name: "Sumaiya Akter", className: "Class 10", present: 26, absent: 0, total: 26 },
  { id: 5, name: "Tanvir Hasan", className: "Class 9", present: 22, absent: 4, total: 26 },
  { id: 6, name: "Mim Akter", className: "Class 8", present: 23, absent: 3, total: 26 },
];

export const batches = [
  { id: 1, name: "Class 10 - Science Batch A", teacher: "Rafiqul Islam", students: 18, schedule: "Sat, Mon, Wed · 4:00 PM", room: "Room 101" },
  { id: 2, name: "Class 9 - Science Batch B", teacher: "Shirin Akter", students: 22, schedule: "Sun, Tue, Thu · 5:00 PM", room: "Room 102" },
  { id: 3, name: "Class 8 - General Batch", teacher: "Kamal Hossain", students: 15, schedule: "Sat, Mon, Wed · 6:00 PM", room: "Room 103" },
  { id: 4, name: "Class 6-8 - English Batch", teacher: "Farzana Yasmin", students: 20, schedule: "Sun, Tue, Thu · 3:00 PM", room: "Room 104" },
];

export const exams = [
  { id: 1, name: "Mid-Term Exam", className: "Class 10", subject: "Science", date: "2026-09-20", status: "Upcoming" },
  { id: 2, name: "Weekly Test", className: "Class 9", subject: "Mathematics", date: "2026-09-14", status: "Upcoming" },
  { id: 3, name: "Model Test - 1", className: "Class 8", subject: "General", date: "2026-08-30", status: "Completed" },
  { id: 4, name: "Final Exam", className: "Class 10", subject: "Science", date: "2026-08-15", status: "Completed" },
];

export const examResults = [
  { id: 1, student: "Arif Rahman", exam: "Model Test - 1", marks: 88, outOf: 100, grade: "A" },
  { id: 2, student: "Nusrat Sultana", exam: "Model Test - 1", marks: 92, outOf: 100, grade: "A+" },
  { id: 3, student: "Fahim Ahmed", exam: "Model Test - 1", marks: 61, outOf: 100, grade: "B" },
];

export const notices = [
  { id: 1, title: "Mid-Term Exam Routine Published", date: "2026-09-10", body: "Class 10 Science batch mid-term exam routine has been published. Check the notice board for details.", tag: "Exam" },
  { id: 2, title: "Coaching Center Closed on Eid Holiday", date: "2026-09-05", body: "The coaching center will remain closed for 3 days on the occasion of Eid.", tag: "Holiday" },
  { id: 3, title: "September Fee Deadline Reminder", date: "2026-09-01", body: "Please clear September month's fee before 10th September to avoid late charges.", tag: "Fees" },
];
