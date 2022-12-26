const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
    studentsCount: Number,
    class: String
})

const Class = mongoose.model('Class', classSchema);

module.exports = Class;