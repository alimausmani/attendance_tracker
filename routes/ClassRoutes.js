
import express from 'express';
import mongoose from 'mongoose';
import Class from '../schemas/ClassSchemas.js';  

const router = express.Router();

router.post('/add', async (req, res) => {
  const { name, description, time, teacherId, students } = req.body;

  try {
    
    const teacherObjectId = new mongoose.Types.ObjectId(teacherId);

    const newClass = new Class({
      name,
      description,
      time,
      teacher: teacherObjectId,
      students,  
    });

    const savedClass = await newClass.save();

    res.status(201).json({
      message: 'Class created successfully',
      class: {
        name: savedClass.name,
        description: savedClass.description,
        time: savedClass.time,
        students: savedClass.students.map(student => student.toString()), 
        teacher: savedClass.teacher.toString(),  
        _id: savedClass._id.toString(),  
        __v: savedClass.__v
      }
    });
  } catch (error) {
    console.error(error);
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
