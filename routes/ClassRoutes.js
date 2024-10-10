import express from 'express';
import Class from '../schemas/ClassSchemas.js'; 

const router = express.Router();

router.post('/add', async (req, res) => {
  const { name, description, time, teacherId, studentIds } = req.body;

  try {
    const newClass = new Class({
      name,
      description, 
      time,       
      teacher: teacherId,
      students: studentIds, 
    });

    await newClass.save();
    res.status(201).json({ message: 'Class created successfully', class: newClass });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create class', details: error.message });
  }
});

export default router;
