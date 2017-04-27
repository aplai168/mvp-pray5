const PrayerTable = require('../models/prayerModel.js');
const path = require('path');

const getPrayers = (res) => {
  PrayerTable.find((err, prayerItems) => {
    if (err) res.send(err);
    return res.json(prayerItems);
  });
};

module.exports = (app) => {
  app.get('/api/prayers', (req, res) => {
    getPrayers(res);
  });
  app.post('/api/prayers', (req, res) => {
    PrayerTable.create({
      message: req.body.message,
      user: req.body.user,
    }, (err) => {
      if (err) res.send(err);
      getPrayers(res);
    });
  });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'), (err) => {
      if (err) {
        console.warn(err);
      }
    });
  });
};
