const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: { type: String, required: true },
    price: { type: Number, required: false, default: 0 },
    startDate: {type: Date, required: true},
    expirationDate: {type: Date, required: true},
    owner: {type: String, required: true},
});

module.exports = mongoose.model('Course', courseSchema);