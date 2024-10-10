import mongoose from 'mongoose';
const { Schema } = mongoose;
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
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    },
  ],
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
});

const Class = mongoose.model('Class', ClassSchema);
export default Class; 
