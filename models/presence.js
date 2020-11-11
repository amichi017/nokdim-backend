const mongoose = require('mongoose');

const presenceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date:{ type: Date, required: true },
    January: { type: Array, required: true },
    February: { type: Array, required: true },
    March: { type: Array, required: true },
    April: { type: Array, required: true },
    May: { type: Array, required: true },
    June: { type: Array, required: true },
    July: { type: Array, required: true },
    August:{ type: Array, required: true },
    September: { type: Array, required: true },
    October:{ type: Array, required: true },
    November: { type: Array, required: true },
    December : { type: Array, required: true },
   
   
});

module.exports = mongoose.model('Presence', presenceSchema);