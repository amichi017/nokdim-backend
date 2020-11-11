const mongoose = require('mongoose');

const prayersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    morningPrayerOfSand: { type: String, required: true },//שחרית חול 
    afternoonPrayerOfSand : { type: String, required: true },//מנחה חול
    nightgPrayerOfSandA: { type: String, required: true },// ערבית חול מנין ראשון
    nightgPrayerOfSandB: { type: String, required: true },//ערבית חול מניין שני
    Parasha  : { type: String, required: true },//פרשת השבוע
    afternoonPrayerOfFridayNight : { type: String, required: true },//תפילת מנחה ערב שבת
    morningPrayerOfSabbath: { type: String, required: true },//תפילת שחרית של שבת
    Psalms: { type: String, required: true },//תהילים
    afternoonPrayerOfSabbath : { type: String, required: true },//תפילת מנחה של שבת
    rabbiYosefChaim: { type: String, required: true },//שיעור בן איש חי 
    thirdMeal: { type: String, required: true },//סעודה שלישית 
    nightgPrayerOfShabbatCameOut: { type: String, required: true },//ערבית של מוצאי שבת


    Extensions : { type: Array, required: true },
    date:{ type: Date, required: true },
   
   
});

module.exports = mongoose.model('Prayers', prayersSchema);