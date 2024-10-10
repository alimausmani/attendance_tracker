// import express from 'express';
// import Class from '../schemas/ClassSchemas.js'; // Ensure this is the correct path

// const router = express.Router();

// // Route to create a new class
// router.post('/add', async (req, res) => {
//   const { name, teacherId, studentIds } = req.body;

//   try {
//     const newClass = new Class({
//       name,
//       teacher: teacherId,
//       students: studentIds, // array of student IDs
//     });

//     await newClass.save();
//     res.status(201).json({ message: 'Class created successfully', class: newClass });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create class', details: error });
//   }
// });

// // Other routes (get, update, delete)...
// export default router;



import express from 'express';
import Class from '../schemas/ClassSchemas.js'; // Ensure this is the correct path

const router = express.Router();

// Route to create a new class
router.post('/create', async (req, res) => {
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

// Route to enroll a student in a class
router.post('/enroll/:classId', async (req, res) => {
  const { classId } = req.params;
  const { studentId } = req.body;

  try {
    const classToUpdate = await Class.findById(classId);
    if (!classToUpdate) {
      return res.status(404).json({ message: 'Class not found' });
    }

    if (classToUpdate.students.includes(studentId)) {
      return res.status(400).json({ message: 'Student is already enrolled in this class' });
    }

    classToUpdate.students.push(studentId);
    await classToUpdate.save();
    
    res.status(200).json({ message: 'Student enrolled successfully', class: classToUpdate });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enroll student', details: error });
  }
});

export default router;
