const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    courses: { type: Array, required: true },
    });

module.exports = mongoose.model('Topic', topicSchema);