//Criamos um arquivo para gerenciar as rotas possíveis, direnciando as requisições.

const express = require('express')
const UrlModel = require('../models/url_model')
const router = express.Router()
const shortId = require('shortid')
const { getOne, checkUnique }  =require("../utils/utils")

// Post

router.post('/', async (req, res) => {
    const name = req.body.name || ""

    const encode = checkUnique(name)

    const url = new UrlModel ({
        url: req.body.url,
        encode: encode,
        category: req.body.category,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    })

    try {
        const newUrl = await url.save()
        res.status(201).json(process.env.API_GATEWAY_LINK + newUrl.encode)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Put

router.put('/:urlId', getOne, async (req, res) =>{
    res.resultUrl.url = req.body.url
    res.resultUrl.encode = req.body.encode
    res.resultUrl.views += 1 //Ver essa questão
    await res.resultUrl.save()
    res.status(200).json({message: 'viewed'})
})

// Delete

router.delete('/:urlId', getOne, async (req, res) => {
    try {
     await res.resultUrl.remove()
     res.json({message: 'url deletada'})
    } catch (err) {
        res.status(500),json({message: err.message})
    }
})

module.exports = router