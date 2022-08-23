const express = require('express')
const UrlAccess = require('../models/urlAccess')
const router = express.Router()
const { getAllByEncode} = require('../utils/middlewaresAccess')

// Put view
router.put('/:encodeAccess', async (req, res) => {
    const { encodeAccess } = req.params
    const [ today ] = new Date().toISOString().split('T')
    try {
        await UrlAccess.findOneAndUpdate(
            {
                $and:[
                    {encode: encodeAccess},
                    {created_at: {$gte: today}}
                ]
            },
            {
                $inc: {
                    view: 1
                }
            }
        )
        res.status(201).json({message: "view counted"})
    } catch (err) {
        res.status(400).json({message: err.message})
    }


})

// Post view

router.post('/', async (req, res) => {
    const access = new UrlAccess ({
        encode: req.body.encode
    })
    try {
        const newAccess = await access.save()
        res.status(201).json({message: "view counter created"})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Get All filtering by encode

router.get('/all/:encodeAccess', getAllByEncode, async (req, res)=>{
    try {
        const analytics = await UrlAccess.find()
        res.json(analytics)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

// Get All

router.get('/all', async (req, res)=>{
    try {
        const analytics = await UrlAccess.find()
        res.json(analytics)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

module.exports = router
