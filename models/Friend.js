const mongoose = require('mongoose');

module.exports = mongoose.model('friend', {
    id: String,
    username: String,
    discriminator: String,
    tag: String
});