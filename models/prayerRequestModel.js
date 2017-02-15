var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var PrayerSchema = new mongoose.Schema({
    user: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
    }
});
PrayerSchema.plugin(timestamps);

module.exports = mongoose.model('Prayer', PrayerSchema);
//dont use thie below anymore
// const PrayerSchema = new mongoose.Schema({
//   user: {
//     type: String,
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
// });
//
// const Prayer = mongoose.model('Prayer', PrayerSchema);
// // Create a todo in memory
// var prayer = new Prayer({user: 'Alice', message: "hi!"});
// // Save it to database
// prayer.save(function(err){
//   if(err)
//     console.log(err);
//   else
//     console.log(prayer);
// });
//
// Prayer.find('prayer', (err, prayerItems) => {
//   if(err) { return err;};
//   console.log('These are the prayers', prayerItems)
// });
//
// Prayer.find('user:Alice', (err, prayers) => {
//   if(err) { return err;};
//   console.log('These are by Alice', prayers)
// })

//Get prayer requests from one year ago
// http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/
