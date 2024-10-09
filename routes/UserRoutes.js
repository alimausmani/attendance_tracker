import express from 'express';
import bcrypt from 'bcryptjs';  
import session from 'express-session';
import User from '../schemas/UserSchemas.js'; 
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, 
    },
  })
);

router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user', details: error });
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    req.session.user = {
      userId: user._id,
      name: user.name,
      role: user.role,
    };

    res.status(200).json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login', details: error });
  }
});

export default router;
