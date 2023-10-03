const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
const User = require('../models/User')
const History = require('../models/History')

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/api/v1/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
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