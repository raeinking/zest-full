const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    properties: [{
        key: String,
        value: mongoose.Schema.Types.Mixed
    }],
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    band: {
        type: Boolean,
        default: false
    },
    roll: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("User", userSchema);
