
const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });
const express = require('express');
const connectDB = require('./config/db.js');
require('./services/Passport.js');
const cookieSession = require('cookie-session');
const keys = require('./config/keys.js')

connectDB();

const app = express();

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000
    , keys: [keys.cookieKey]
}));

const authentication = require('./routes/Authentication.js');

app.use('/api/v1/auth', authentication);

app.listen('4500', () => { console.log("Server is connected") });