const express = require('express');
require('dotenv').config();

// const favicon = require('serve-favicon');

// const path = require('path');

const app = express();
const mongoose = require('mongoose');

const cors = require('cors');

const port = process.env.PORT || 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');

const methodOverride = require('method-override');

mongoose.connect(process.env.MONGODB_URI);

require('./models/prayerModel.js');

app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors({ credentials: true, origin: 'localhost:5000' }));
app.all("/api/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});
app.all("/api/*", function(req, res, next) {
  if (req.method.toLowerCase() !== "options") {
    return next();
  }
  return res.send(204);
});
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     return next();
// });

require('./app/routes.js')(app);

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.listen(port);
console.warn(`App listening on port http://localhost:${port}`);
