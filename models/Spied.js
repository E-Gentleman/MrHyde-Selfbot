const mongoose = require('mongoose');

module.exports = mongoose.model('spied', {
    userId: String,
    name: String
});