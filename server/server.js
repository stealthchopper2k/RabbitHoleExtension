
const dotenv = require('dotenv')
dotenv.config({ path: "../.env" })
const express = require('express')
const connectDB = require('./config/db.js')
const passport = require('passport');
require('./services/Passport.js');
const cookieSession = require('cookie-session')

connectDB()

const app = express()
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());

const authentication = require('./routes/Authentication.js')

app.use('/api/v1/auth', authentication);

// app.use('/api/v1/auth', authentication)

app.listen('4500', () => { console.log("Server is connected") })