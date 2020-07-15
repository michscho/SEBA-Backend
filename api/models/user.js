const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    prename: { type: String, required: true},
    surname: { type: String, required: true},
    phone: {type: String, required: true},
    gender: {type: String, required: true},
    premiumUser: {type: Boolean, required: true},
    privateprofile: {type: Boolean, required: true},
    mailnewsletter: {type: Boolean, required: true},
    mailcommunityupdate: {type: Boolean, required: true},
    smsnewsletter: {type: Boolean, required: true},
    smscommunityupdate: {type: Boolean, required: true},
    achievment: {type: String, required: false},
    courses: {type: Array, "default": [""], required: true},
    topics: {type: Array, required: false},
    completedItems: {type: Array, required: false},
});

module.exports = mongoose.model('User', userSchema);