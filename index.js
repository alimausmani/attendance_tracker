// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import classRoutes from './routes/ClassRoutes.js'; // Correct the import to match your file name
// import userRoutes from './routes/UserRoutes.js'
// import attendanceRoutes from './routes/AttendanceRoutes.js'; // Attendance routes
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/class', classRoutes);
// app.use('/user', userRoutes); // Add user routes if you have them
// app.use('/attendance', attendanceRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('Connected to Database'))
//     .catch(err => console.log(err));

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import classRoutes from './routes/ClassRoutes.js'; // Correct the import to match your file name
import userRoutes from './routes/UserRoutes.js'; // User routes
import attendanceRoutes from './routes/AttendanceRoutes.js'; // Attendance routes
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/class', classRoutes);
app.use('/user', userRoutes); // User routes
app.use('/attendance', attendanceRoutes); // Attendance routes

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new connection management engine
})
  .then(() => console.log('Connected to MongoDB Database'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Start the server
const PORT = process.env.PORT || 7000; // Set the port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

