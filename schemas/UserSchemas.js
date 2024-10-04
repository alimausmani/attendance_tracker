import mongoose from 'mongoose';
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

const User = mongoose.model('User', UserSchema);
export default User; // Use 'export default' for ES Module syntax
