const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: String,
    classId: {
        type: Schema.Types.ObjectId,
        ref:"Class"
    }
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;