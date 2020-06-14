const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    difficulty: { type: Number, required: true, default: -1 },
    description: {type: String, required: true},
    keywords: {type: Array, required: true},
    courseItems: {type: Array, required: true},
});

module.exports = mongoose.model('Course', courseSchema);