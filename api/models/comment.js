const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    creationDate: {type: Date, required: true},
    content: {type: String, required: true},
    creator: {type: String, required: true},
    belonging: {type: String, required: true},
});

module.exports = mongoose.model('Course', commentSchema);