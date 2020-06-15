const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    creator: { type: String, required: true },
    difficulty: { type: Number, required: true, default: -1 },
    description: {type: String, required: true},
    keywords: {type: Array, required: true},
    courseItems: {type: Array, required: true},
    isFree: {type: Boolean, required: true},
    price: {type: Number, required: false},
});

module.exports = mongoose.model('Course', courseSchema);