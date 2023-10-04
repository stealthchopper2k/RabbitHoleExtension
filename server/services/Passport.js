const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
const User = require('../models/User')
const History = require('../models/History')

passport.serializeUser(function (user, done) {
    done(null, user);
});

// get the latest user for session cookie
passport.deserializeUser(function (data, done) {
    // get latest user
    const id = data.user.googleId;
    User.findOne({ googleId: id }).then((user) => {
        done(null, user)
    }).catch((e) => {
        console.log("Error deserializeUser: " + e)
        done(null, false)
    })
});

// https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/api/v1/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    const existingUser = await User.findOneAndUpdate({ googleId: profile.id }, {
        accessToken,
        refreshToken,
        name: profile.displayName,
        avatarUrl: profile.picture,
        isVerified: profile.emails[0].verified
    })

    // find latest history entry time, so that we can identify when to check history from again
    const existingHistory = await History.findOne({ googleId: profile.id }).sort('-created_at')

    if (existingUser && existingHistory) {
        return done(null, { user: existingUser, history: existingHistory })
    }

    const user = await new User({
        accessToken,
        refreshToken,
        name: profile.displayName,
        email: profile.emails[0].value,
        isNew: true,
        googleId: profile.id,
        avatarUrl: profile.picture,
        isVerified: profile.emails[0].verified
    }).save()

    const history = await new History({
        googleId: profile.id,
        timeTaken: Date.now()
    }).save()

    return done(null, { user: user, history: history })
}))