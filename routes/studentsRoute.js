import express from 'express'

const router = express.Router();

// Add a new student

router.post('/add', async (req, res) => {
    const { name, email, rollNumber, class: studentClass } = req.body;

    try {
        const newStudent = new Student({
            name,
            email,
            rollNumber,
            class: studentClass
        });
        await newStudent.save();
        res.status(201).json({ message: 'Student added successfully!', student: newStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error adding student', error });
    }
});

// Remove a student by ID

router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findByIdAndDelete(id);
        if (student) {
            res.status(200).json({ message: 'Student removed successfully' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error removing student', error });
    }
});

// Get all students

router.get('/all', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students', error });
    }
});

// Get a particular student by ID

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving student', error });
    }
});

export default router
