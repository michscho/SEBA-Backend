const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    text: {type: String, required: true},
    creator: {type: String, required: true},
    contentId: {type: String, required: true},
});

module.exports = mongoose.model('Comment', commentSchema);