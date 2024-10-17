import express from 'express';
import Attendance from '../schemas/AttendanceSchemas.js';

const router = express.Router();

router.post('/add/:classId', async (req, res) => {
  const { studentId, date } = req.body; 
  const { classId } = req.params; 

  try {
    let attendance = await Attendance.findOne({
      class: classId,
      date: date || new Date().toISOString().split('T')[0], 
      "students.studentId": studentId,
    });

    if (attendance) {
      return res.status(400).json({ message: 'Attendance for this student on the given date already exists.' });
    }

    if (!attendance) {
      attendance = new Attendance({
        class: classId,
        date: date || new Date().toISOString().split('T')[0],
        students: [{ studentId }]
      });
    }

    await attendance.save();
    res.status(201).json({ message: 'Attendance added successfully', attendance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add attendance', details: error });
  }
});


router.get('/class/:classId', async (req, res) => {
  const { classId } = req.params;

  try {
    const attendance = await Attendance.find({ class: classId })
      .populate('student', 'name') 
      .populate('class', 'name'); 
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get attendance for the class', details: error });
  }
});

router.get('/student/:studentId', async (req, res) => {
  const { studentId } = req.params;

  try {
    const attendance = await Attendance.find({ student: studentId })
      .populate('class', 'name'); 
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get attendance for the student', details: error });
  }
});


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
