import mongoose from 'mongoose';
const { Schema } = mongoose;


const AttendanceSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true,
  },
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);
export default Attendance; 
