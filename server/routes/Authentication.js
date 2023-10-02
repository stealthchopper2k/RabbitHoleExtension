const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: "http://localhost:3000/"
}))

router.get('/me', (req, res) => {
    res.send(req.user)
})

router.get('/logout', (req, res) => {
    console.log('logging out')
    req.logout();
    res.redirect('/')
})

module.exports = router