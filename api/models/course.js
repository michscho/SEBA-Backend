const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    creatorId: {type: String, required: true},
    difficulty: {type: Number, required: true, default: -1},
    description: {type: String, required: true},
    contentItems: {type: Array, required: true},
    rating: {type: Array, required: true},
    price: {type: Number, required: false},
});

module.exports = mongoose.model('Course', courseSchema);