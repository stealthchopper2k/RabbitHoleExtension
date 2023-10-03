const express = require('express')
const router = express.Router()
const History = require('../models/History')
const User = require('../models/User')

router.post('/user/history', async (req, res) => {
    try {
        const history = req.body
        const newHistory = new History(history)
        await newHistory.save()
        res.send("Successfully saved history")
    } catch (e) {
        res.send("Failed to update History")
    }
})

router.post('/user/update/:id', async (req, res) => {
    const userId = req.params.id
    const { isNew, preferences } = req.body
    console.log("user params", userId)
    try {
        const existingUser = await User.findOneAndUpdate({ googleId: userId }, {
            isNew,
            preferences
        })
        existingUser.save()
    } catch (e) {
        res.send("Failed to update User")
    }
})