const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message: { type: String, required: true },
    user: { type: String, required: true },
   
});

module.exports = mongoose.model('Message', messageSchema);