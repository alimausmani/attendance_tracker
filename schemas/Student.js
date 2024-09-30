import mongoose from "mongoose"


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true,
    },
    class: {
        type: String,
        required: true,
    },
    attendance: {
        type: Number,
        default: 0, 
    }
});

const Student = mongoose.model('Student', studentSchema);

export default Student


