const { Schema, model } = require('mongoose');

const LogsSchema = new Schema({
    action: {
        type: String,
        required: true
    },
    time_of_action: {
        type: String,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    }
});

module.exports = model('logs', LogsSchema);
