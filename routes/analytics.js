const express = require('express')
const UrlAccess = require('../models/urlAccess')
const router = express.Router()
const { getAllByEncode, filterEncodeAndDate } = require('../utils/middlewaresAccess')

// Put view
router.put('/:encodeAccess', filterEncodeAndDate, async (req, res) => {
    if (res.resultFilter){
        const { resultFilter } = res.resultFilter
        console.log(resultFilter)
        console.log(res.resultFilter.view)
        await UrlAccess.updateOne({encode: resultFilter},
            {$set: {
                'views': res.resultFilter.view+1
                } 
            })
        console.log('post updating')
        res.status(201).json({message: "view counted"})
    }else{
        const access = new UrlAccess ({
            encode: req.body.encode
        })
        try {
            const newAccess = await access.save()
            res.status(201).json({message: "view counter created"})
        } catch (err) {
            res.status(400).json({message: err.message})
        }
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
