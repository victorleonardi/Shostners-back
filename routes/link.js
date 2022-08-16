const express = require('express')
const UrlModel = require('../models/url_model')
const router = express.Router()

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

router.get('/:urlId', getUrl, (req, res) => {
    const link = res.url.true_url
    res.redirect(link)
})

async function getUrl(req, res, next) {
    let url
    try {
        url = await UrlModel.findById(req.params.urlId)
        if (url == null){
            return res.status(404).json({message: 'Cannot find url'})
        }
    } catch (err) {
        res.json({message: err.message})
    }
    
    res.url = url
    next()
}

module.exports = router