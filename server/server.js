
const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });
const express = require('express');
const connectDB = require('./config/db.js');
const passport = require('passport')
require('./services/Passport.js');
const cookieSession = require('cookie-session');
const keys = require('./config/keys.js')
const cors = require('cors')

connectDB();

const app = express();

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000
    , keys: [keys.cookieKey]
}));

app.use(cors({ origin: true, credentials: true }));
app.use(passport.initialize());
app.use(passport.session());

const authentication = require('./routes/Authentication.js');

app.use('/api/v1/auth', authentication);

app.listen('4500', () => { console.log("Server is connected") });