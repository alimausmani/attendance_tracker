import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    // Add other class-related fields as necessary
});

const Class = mongoose.model('Class', classSchema);
export default Class;
