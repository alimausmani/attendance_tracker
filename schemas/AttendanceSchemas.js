import mongoose from 'mongoose';
const { Schema } = mongoose;

const AttendanceSchema = new Schema({
  students: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      status: {
        type: String,
        enum: ['present'], 
        default: 'present', 
      },
    },
  ],
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);
export default Attendance;
