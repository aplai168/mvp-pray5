// why do i need to require my model so I can access the database and find stuff from it when I do a get request
const PrayerTable = require('../models/prayerRequestModel.js');
const path = require('path');

var getPrayers = (res) => {
  PrayerTable.find((err, prayerItems) => {
    if (err) res.send(err);
    res.json(prayerItems);
  })
}

module.exports = (app) => {
  // we're gonna treat it all as api routes
  // when the prayers route is called,
  app.get('/api/prayers', (req, res) => {
    getPrayers(res);
  });
  app.post('/api/prayers', (req, res) => {
    PrayerTable.create({
      message: req.body.message,
      // createdAt: req.body.createdAt,
      user: req.body.user,
    }, (err, pray) => {
        if(err) res.send(err);
        getPrayers(res);
    });
  });
  app.get('*', (req, res) => {
    // when any get request is done of any shortpower
    // we want to constantly server the index.html page
    // res.send('hello');
    res.sendFile(path.join(__dirname + '/public/views/index.html'), (err) => {
      if(err) {
        console.log(err);
      }
    });
  //   res.sendFile('../public/views/index.html', (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //
  //   });
  });

}
