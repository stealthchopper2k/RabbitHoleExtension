const express = require('express')
const router = express.Router()
const History = require('../models/History')
const User = require('../models/User')

router.post('/history', async (req, res) => {
    const history = req.body
    const timeTaken = req.body.timeTaken
    try {
        const newHistory = new History(history)

        await User.findOneAndUpdate({ googleId: userId }, {
            historyTimeTaken: timeTaken
        }, {
            new: true,
        })


        await newHistory.save()
        res.json(timeTaken)
    } catch (e) {
        res.send("Failed to update History")
    }
})

router.post('/update/:id', async (req, res) => {
    const userId = req.params.id
    const body = req.body
    try {
        await User.findOneAndUpdate({ googleId: userId }, {
            isNew: body.isNew,
            preferences: body.preferences
        }, {
            new: true,
        })

        res.send("Updated User")
    } catch (e) {
        res.send("Failed to update User")
    }
})

module.exports = router