const mongoose = require('mongoose')

// Schema
const TeamSchema = new mongoose.Schema({
    team_name: {
        type: String,
        required: true
    },
    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    },
    ties: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    },
}, { 
    collection: 'lead_board' 
})

module.exports = mongoose.model('Team', TeamSchema)
