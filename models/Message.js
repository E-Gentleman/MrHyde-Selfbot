const mongoose = require('mongoose');

module.exports = mongoose.model('spied_message', {
    previousContent: String,
    when: Date,
    event: String,
    channelId: String,
    userId: String,
    username: String
});