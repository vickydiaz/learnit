const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    spanish: {
        type: String,
        required: true
    },
    english: {
        type: String,
        required: true
    },
    list: {
        type: mongoose.Schema.ObjectId,
        ref: 'List',
        required: true
    },
    correctCount: {
        type: Number,
        default: 0
    },
    errorCount: {
        type: Number,
        default: 0
    },
    dueDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Word', WordSchema);