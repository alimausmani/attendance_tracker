// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// // Class Schema
// const ClassSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   students: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User', // references User schema (students)
//     },
//   ],
//   teacher: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // references User schema (teacher)
//   },
// });

// // Ensure you are exporting the Class model as default
// const Class = mongoose.model('Class', ClassSchema);
// export default Class;  // Change this line to export default


import mongoose from 'mongoose';
const { Schema } = mongoose;

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

// Ensure you are exporting the Class model as default
const Class = mongoose.model('Class', ClassSchema);
export default Class;

