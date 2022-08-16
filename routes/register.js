//Criamos um arquivo para gerenciar as rotas possíveis, direnciando as requisições.

const express = require('express')
const UrlModel = require('../models/url_model')
const router = express.Router()

// Post

router.post('/', async (req, res) => {
    const url = new UrlModel ({
        true_url: req.body.true_url,
        custom_url: req.body.custom_url
    })

    try {
        const newUrl = await url.save()
        res.status(201).json(newUrl)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Put

router.put('/:urlId', getUrl, (req, res) =>{
    res.body.true_url = req.body.true_url
    res.body.custom_url = req.body.custom_url
    res.url.views += 1
    res.url.save()
    res.status(200).json({message: 'viewed'})
})

// Delete

router.delete('/:urlId', getUrl, (req, res) => {
    try {
     res.url.remove()
     res.json({message: 'url deletada'})
    } catch (err) {
        res.status(500),json({message: err.message})
    }
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