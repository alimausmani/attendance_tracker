// import express from 'express';
// import User from '../schemas/UserSchemas.js'; // Make sure to use the correct extension

// const router = express.Router();


// // Route to create a new user (admin, teacher, student)
// router.post('/add', async (req, res) => {
//   const { name, email, password, role, enrolledClasses, teachingClasses } = req.body;

//   try {
//     const newUser = new User({
//       name,
//       email,
//       password,
//       role,
//       enrolledClasses: role === 'student' ? enrolledClasses : [],
//       teachingClasses: role === 'teacher' ? teachingClasses : [],
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create user', details: error });
//   }
// });

// // Other routes...

// module.exports = router; // Change to module.exports

import express from 'express';
import User from '../schemas/UserSchemas.js'; // Make sure to use the correct extension

const router = express.Router();

// Route to create a new user (admin, teacher, student)
router.post('/add', async (req, res) => {
  const { name, email, password, role, enrolledClasses, teachingClasses } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password,
      role,
      enrolledClasses: role === 'student' ? enrolledClasses : [],
      teachingClasses: role === 'teacher' ? teachingClasses : [],
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user', details: error });
  }
});

// Other routes...

export default router; // Use export default

