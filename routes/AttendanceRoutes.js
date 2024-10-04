import express from 'express';
import Attendance from '../schemas/AttendanceSchemas.js';

const router = express.Router();

// Route to add attendance
router.post('/add', async (req, res) => {
  const { studentId, classId, status } = req.body;

  try {
    const attendance = new Attendance({
      student: studentId,
      class: classId,
      status: status,
    });

    await attendance.save();
    res.status(201).json({ message: 'Attendance added successfully', attendance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add attendance', details: error });
  }
});

// Route to get attendance for a specific class
router.get('/class/:classId', async (req, res) => {
  const { classId } = req.params;

  try {
    const attendance = await Attendance.find({ class: classId })
      .populate('student', 'name') // Populate student name
      .populate('class', 'name'); // Populate class name if needed
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get attendance for the class', details: error });
  }
});

// Route to get attendance for a specific student
router.get('/student/:studentId', async (req, res) => {
  const { studentId } = req.params;

  try {
    const attendance = await Attendance.find({ student: studentId })
      .populate('class', 'name'); // Populate class name
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get attendance for the student', details: error });
  }
});

// Route to update attendance status
router.put('/update/:attendanceId', async (req, res) => {
  const { attendanceId } = req.params;
  const { status } = req.body;

  try {
    const attendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      { status },
      { new: true }
    );
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.status(200).json({ message: 'Attendance status updated', attendance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update attendance', details: error });
  }
});

// Route to delete attendance record
router.delete('/delete/:attendanceId', async (req, res) => {
  const { attendanceId } = req.params;

  try {
    const attendance = await Attendance.findByIdAndDelete(attendanceId);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.status(200).json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete attendance', details: error });
  }
});

export default router;
