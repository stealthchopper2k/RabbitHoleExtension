const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [false, 'Please add a valid name'],
    },
    email: {
        type: String,
        required: [false, 'Please add a valid email'],
        unique: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            'Please add a valid email'
        ]
    },
    historyTimeTaken: {
        type: Date,
        required: false,
    },
    isNew: {
        type: Boolean,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: false,
    },
    googleId: {
        type: String,
        required: false,
    },
    avatarUrl: {
        type: String,
        required: false,
    },
    accessToken: {
        type: String,
        required: false
    },
    refreshToken: {
        type: String,
        required: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)