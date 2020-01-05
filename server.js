/* load configs */
require('dotenv').config();
// const cors = require('cors')

/* app setup */
const express = require('express');
const app = express();
var cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const db = require('./db/');

app.use(cors());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.SESSION_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// API Routes
// app.use('/api/test', require('./api/test'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/user', require('./api/user'));
app.use('/api/dishes', require('./api/dishes'));
app.use('/api/restaurants', require('./api/restaurants'))
app.use('/api/allergens', require('./api/allergens'))
// app.use('/api/reviews', require('./api/reviews'))

app.use(({ message }, req, res, next) => {
  res.status(500).send({ message });
});

const PORT = process.env.PORT || 8000;

db.sync()
  .then(app.listen(PORT, () => console.log(`\nApplication running on port ${PORT}\n`)))
  .catch(e => console.error(`Failed to load app on port ${PORT} with error: ${e}`));