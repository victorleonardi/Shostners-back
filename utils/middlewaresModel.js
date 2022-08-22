const urlModel = require('../models/urlModel')
// const accessModel = require('../models/urlAccess')
const shortId = require('shortid')
const url = require('url')

async function getOne(req, res, next) {
    let resultUrl
    const { urlId } = req.params
    try {
        resultUrl = await urlModel.findOne({encode: urlId})
        if (resultUrl == null){
            return res.status(404).json({message: 'Cannot find url'})
        }
    } catch (err) {
        res.json({message: err.message})
    }
    
    res.resultUrl = resultUrl
    next()
}

async function checkDate(req, res, next) {
    if (res.resultUrl.start_date >= Date.now()) {
        return await res.send(`A url ainda não foi ativada. Tente usar o link ${res.fullUrl + res.resultUrl.encode} a partir da data ${res.resultUrl.start_date.toLocaleString('pt-BR')}`)
    }else if(res.resultUrl.end_date <= Date.now()){
        return await res.send(`A url buscada foi expirada na data ${res.resultUrl.end_date.toLocaleString('pt-BR')}.`)
    }
    res.onDate = true
    next()
}

async function getUrl(req, res, next) {
    const protocol = req.protocol
    const host = req.get('host')
    const originalUrl = req.originalUrl
    var fullUrl = protocol + "://" + host + originalUrl
    res.fullUrl = fullUrl
    next()
}


module.exports ={ getOne, checkDate, getUrl}