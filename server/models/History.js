const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({
    googleId: { type: String },
    timeTaken: { type: Date },
    history: { type: Array },
}, { timestamps: true })

module.exports = mongoose.model('HistoryData', HistorySchema)