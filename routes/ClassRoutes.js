import express from 'express';
import mongoose from 'mongoose';
import Class from '../schemas/ClassSchemas.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  const { name, description, time, teacherId, students } = req.body;

  try {
    const teacherObjectId = mongoose.Types.ObjectId(teacherId);
    const studentArray = students.map(student => ({
      ...student,
      studentId: mongoose.Types.ObjectId(student.studentId),
    }));

    const newClass = new Class({
      name,
      description,
      time,
      teacher: teacherObjectId,
      students: studentArray,
    });
    await newClass.save();
    res.status(201).json({ message: 'Class created successfully', class: newClass });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create class', details: error.message });
  }
});


router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid class ID' });
  }

  try {
    const deletedClass = await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json({ message: 'Class deleted successfully', class: deletedClass });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete class', details: error.message });
  }
});
export default router;
