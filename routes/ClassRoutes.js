
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

// router.put('/update/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, description, time, teacherId, students } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: 'Invalid class ID' });
//   }

//   try {
//     if (!mongoose.Types.ObjectId.isValid(teacherId)) {
//       return res.status(400).json({ message: 'Invalid teacher ID' });
//     }
//     const teacherObjectId = new mongoose.Types.ObjectId(teacherId);

//     const studentArray = students.map(student => ({
//       ...student,
//       studentId: new mongoose.Types.ObjectId(student.studentId),
//     }));

//     const updatedClass = await Class.findByIdAndUpdate(
//       id,
//       {
//         name,
//         description,
//         time,
//         teacher: teacherObjectId,
//         students: studentArray,
//       },
//       { new: true, runValidators: true }  
//     );

//     if (!updatedClass) {
//       return res.status(404).json({ message: 'Class not found' });
//     }

//     res.status(200).json({ message: 'Class updated successfully', class: updatedClass });
//   } catch (error) {
//     console.error('Error updating class:', error);
//     res.status(500).json({ error: 'Failed to update class', details: error.message });
//   }
// });


 

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, time, teacherId, studentCount } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid class ID' });
  }

  try {
    const updateFields = {}; 

    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (time) updateFields.time = time;

    if (teacherId) {
      if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({ message: 'Invalid teacher ID' });
      }
      updateFields.teacher = new mongoose.Types.ObjectId(teacherId);
    }

    if (studentCount !== undefined) {
      if (typeof studentCount !== 'number' || studentCount < 0) {
        return res.status(400).json({ message: 'Invalid student count' });
      }
      updateFields.studentCount = studentCount; 
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { $set: updateFields }, 
      { new: true, runValidators: true } 
    );

    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json({ message: 'Class updated successfully', class: updatedClass });
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({ error: 'Failed to update class', details: error.message });
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
    res.status(500).json({ error: 'Failed to delete class', details: error.message })
  }
});

export default router;
