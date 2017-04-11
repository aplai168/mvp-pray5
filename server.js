const express = require('express');
require('dotenv').config();

const favicon = require('serve-favicon');
const path = require('path');

const app = express();
const mongoose = require('mongoose');

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

require('./app/routes.js')(app);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.listen(port);
console.warn(`App listening on port http://localhost:${port}`);
