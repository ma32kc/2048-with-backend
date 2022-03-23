const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const schema = new Schema({
    username: {
        type: String
    },
    time: {
        type: String
    }
})

module.exports = mongoose.model('User', schema)