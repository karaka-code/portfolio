const {Router} = require('express')
const router = Router()
const FeedBack = require('../models/FeedBack')
const moment = require('moment');


// api/feedBack/
router.post(
    '/',
    async (req, res) => {
        try {

            const {text, userId} = req.body
            console.log(req.body)
            const nDate = new Date().toLocaleString('en-US', {
                timeZone: 'Europe/Kiev'
            });

            const newFeedBack = await FeedBack.findOne({text})

            if (newFeedBack) {
                return res.status(400).json({message: "already exist"})
            }

            const f = new FeedBack({
                text, time: nDate, user: userId
            })


            const savedFeedBack = await f.save()
            res.status(201).json(savedFeedBack)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'An error occurred'})
        }
    })


// api/feedBack/
router.get(
    '/',
    async (req, res) => {
        try {
            const f = await FeedBack.find()
            res.status(200).json(f)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'An error occurred'})
        }
    })

module.exports = router