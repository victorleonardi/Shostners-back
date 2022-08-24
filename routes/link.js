const express = require('express')
const UrlModel = require('../models/urlModel')
const UrlAccess = require('../models/urlAccess')
const router = express.Router()
const { getOne, checkDate } = require("../utils/middlewaresModel")
const urlAccess = require('../models/urlAccess')
const { default: axios } = require('axios')

// Get All

router.get('/', async (req, res)=>{
    try {
        const urls = await UrlModel.find()
        res.json(urls)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

// Get One, Post And Redirect

router.get('/:urlId', getOne, checkDate, async (req, res) => {
    console.log(res.onDate)
    if(res.onDate == true)    {
        const link = res.resultUrl.url
        const encode = res.resultUrl.encode
        axios.post(process.env.API_GATEWAY_ANALYTICS, {encode: encode})

        await res.redirect(link)
        
    }
})

// Get One

router.get('/link/:urlId', getOne, checkDate, async (req, res) => {
    try {
        res.json(res.resultUrl)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router