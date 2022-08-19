const express = require('express')
const UrlModel = require('../models/url_model')
const router = express.Router()
const { getUrl, checkDate } = require("../utils/utils")

// Get All

router.get('/', async (req, res)=>{
    try {
        const urls = await UrlModel.find()
        res.json(urls)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

// Get One and Return true_link

router.get('/:urlId', getUrl, checkDate, async (req, res) => {
    console.log(res.onDate)
    if(res.onDate == true)    {
        const link = res.resultUrl.url
        await res.redirect(link)
    }
})

module.exports = router