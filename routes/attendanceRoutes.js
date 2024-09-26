import express from "express";
import Attendance from "../schemas/Attendance.js";

const router = express.Router();

// Mark attendance
router.post("/mark", async (req, res) => {
  const { studentId, classId, status } = req.body;
  try {
    const attendance = new Attendance({ studentId, classId, status });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance for a class
router.get("/:classId", async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ classId: req.params.classId });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance for a particular student
router.get("/student/:studentId", async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ studentId: req.params.studentId });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
