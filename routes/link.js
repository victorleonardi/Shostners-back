const express = require('express')
const UrlModel = require('../models/urlModel')
const UrlAccess = require('../models/urlAccess')
const router = express.Router()
const { getOne, checkDate } = require("../utils/middlewaresModel")
const urlAccess = require('../models/urlAccess')

// Get All

router.get('/', async (req, res)=>{
    try {
        const urls = await UrlModel.find()
        res.json(urls)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

// Get One

router.get('/:urlId', getOne, checkDate, async (req, res) => {
    console.log(res.onDate)
    if(res.onDate == true)    {
        const link = res.resultUrl.url
        const encode = res.resultUrl.encode
        const [ today ] = new Date().toISOString().split('T')

        await UrlAccess.findOneAndUpdate(
            {
                $and:[
                    {encode: encode},
                    {created_at: {$gte: today}}
                ]
            },
            {
                $inc: {
                    view: 1
                }
            }
        )

        await res.redirect(link)
    }
})

module.exports = router