const express = require('express')
const UrlModel = require('../models/urlModel')
const router = express.Router()
const { getOne, checkDate } = require("../utils/middlewaresModel")

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
        await res.redirect(link)
    }
})

module.exports = router