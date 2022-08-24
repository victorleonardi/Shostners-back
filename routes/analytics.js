const express = require('express')
const UrlAccess = require('../models/urlAccess')
const router = express.Router()
const { getAllByEncode, getEncodeAndExactDate, getOneById, groupByDate} = require('../utils/middlewaresAccess')

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
    await res.redirect(res.resultEncode)
})

// Get Distinct Encod

router.get("/distinct/", async(req, res) =>{
    try{
        const distinctEncodes = await UrlAccess.find().distinct('encode')
        res.json(distinctEncodes)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

// Get Views By Date

router.get("/views/:encodeAccess/:dateTime", getEncodeAndExactDate, async(req, res) =>{
    try {
        const totalViews = await res.resultEncodeAndExactDate.length
        res.json(totalViews)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Get All Views

router.get("/views/:encodeAccess", async (req, res) =>{
    let totalViews
    const { encodeAccess } = req.params
    try {
        totalViews = (await UrlAccess.find({encode: encodeAccess})).length
        res.json(totalViews)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Get All

router.get('/all/', async (req, res)=>{
    try {
        const analytics = await UrlAccess.find()
        res.json(analytics)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

// Get 'Dataset' for a Single Encoded Grouped By Day And Counted 

router.get('/graphics/:encodeAccess', getAllByEncode, groupByDate, async (req, res)=>{
    let keysArray = Array.from( res.groupByEncodeAndDate.keys() ) 
    let valuesArray = Array.from( res.groupByEncodeAndDate.values() ) 

    await res.json(
        {
            x: keysArray,
            y: valuesArray
        }
    )
})

// Delete

router.delete('/:accessId', getOneById, async (req, res) => {
    try {
     await res.resultId.remove()
     res.json({message: 'url deletada'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


module.exports = router
