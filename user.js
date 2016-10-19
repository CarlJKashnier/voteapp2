var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    facebook: {
        id: String,
        token: String,
        name: String
    }
});

module.exports = mongoose.model('user', userSchema);