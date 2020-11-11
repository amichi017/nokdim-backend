const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    complaint: { type: String, required: true },
    user: { type: String, required: true },
    date:{ type: Date, required: true },
   
});

module.exports = mongoose.model('Complaint', complaintSchema);