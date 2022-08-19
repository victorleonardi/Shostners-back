//Criamos um arquivo para gerenciar as rotas possíveis, direnciando as requisições.

const express = require('express')
const UrlModel = require('../models/url_model')
const router = express.Router()
const { getUrl, getFullUrl }  =require("../utils/utils")

// Post

router.post('/', async (req, res) => {
    const encode = req.body.name + "anprZ" //trocar essa string por um gerador de valor único

    const url = new UrlModel ({
        url: req.body.url,
        encode: encode,
        category: req.body.category || null,
        start_date: req.body.start_date || null,
        end_date: req.body.end_date || null
    })

    try {
        const newUrl = await url.save()
        res.status(201).json(newUrl.encode)
    } catch (err) {
        res.status(400).json({message: err.message})
    }

})

// Put

router.put('/:urlId', getUrl, async (req, res) =>{
    res.resultUrl.url = req.body.url
    res.resultUrl.encode = req.body.encode
    res.resultUrl.views += 1 //Ver essa questão
    await res.resultUrl.save()
    res.status(200).json({message: 'viewed'})
})

// Delete

router.delete('/:urlId', getUrl, async (req, res) => {
    try {
     await res.resultUrl.remove()
     res.json({message: 'url deletada'})
    } catch (err) {
        res.status(500),json({message: err.message})
    }
})

module.exports = router