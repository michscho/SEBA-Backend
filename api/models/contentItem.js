const mongoose = require('mongoose');

const courseItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    source: { type: String, required: true },
    author: { type: String, required: true },
    isFree: {type: Boolean, required: true},
    price: {type: Number, required: false},
});

module.exports = mongoose.model('ContentItem', courseItemSchema);