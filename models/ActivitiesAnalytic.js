const mongoose = require('mongoose');

module.exports = mongoose.model('analytics_activity', {
    name: String,
    players: [String],
    points: Number
});