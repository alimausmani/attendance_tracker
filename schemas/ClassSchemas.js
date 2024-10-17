import mongoose from 'mongoose';
const { Schema } = mongoose;

const StudentSchema = new Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

const ClassSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  students: [StudentSchema], 
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
});

const Class = mongoose.model('Class', ClassSchema);
export default Class;
