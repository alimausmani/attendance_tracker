import express from 'express';
import Class from '../schemas/ClassSchemas.js'; // Ensure this is the correct path

const router = express.Router();

// Route to create a new class
router.post('/add', async (req, res) => {
  const { name, teacherId, studentIds } = req.body;

  try {
    const newClass = new Class({
      name,
      teacher: teacherId,
      students: studentIds, // array of student IDs
    });

    await newClass.save();
    res.status(201).json({ message: 'Class created successfully', class: newClass });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create class', details: error });
  }
});

// Other routes (get, update, delete)...
export default router;
