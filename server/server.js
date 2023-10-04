
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
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50000 }))

const authentication = require('./routes/Authentication.js');
const user = require('./routes/User.js');

app.use('/api/v1/auth', authentication);
app.use('/user', user)

app.listen('4500', () => { console.log("Server is connected") });