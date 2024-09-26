import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Attendance", attendanceSchema);
