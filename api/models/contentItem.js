const mongoose = require('mongoose');

const courseItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    source: { type: String, required: true },
    description: {type: String, required: true},
});

module.exports = mongoose.model('ContentItem', courseItemSchema);