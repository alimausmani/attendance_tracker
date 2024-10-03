const mongoose = require('mongoose');
const { log } = require('util');
const { Schema } = mongoose;

// User Schema (for Students, Teachers, and Admins)
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    required: true,
  },
  // For students: array of classes they are enrolled in
  enrolledClasses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
    },
  ],
  // For teachers: array of classes they are managing
  teachingClasses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
    },
  ],
});

// Class Schema
const ClassSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // references User schema (students)
    },
  ],
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // references User schema (teacher)
  },
});

// Attendance Schema
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

// Exporting the models
const User = mongoose.model('User', UserSchema);
const Class = mongoose.model('Class', ClassSchema);
const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = {
  User,
  Class,
  Attendance,
};
