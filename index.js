import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import classRoutes from './routes/ClassRoutes.js'; 
import userRoutes from './routes/UserRoutes.js'; 
import attendanceRoutes from './routes/AttendanceRoutes.js'; 
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();


app.use(cors()); 
app.use(express.json()); 


app.use('/class', classRoutes);
app.use('/user', userRoutes); 
app.use('/attendance', attendanceRoutes); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
})
  .then(() => console.log('Connected to MongoDB Database'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


const PORT = process.env.PORT || 7000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

