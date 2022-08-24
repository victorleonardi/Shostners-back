const urlModel = require('../models/urlModel')
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
    const fullDate = res.resultUrl.start_date.toISOString().split('T')
    const date = fullDate[0]
    const time = fullDate[1].slice(0, 5)

    console.log(fullDate)

    if (res.resultUrl.start_date >= Date.now()) {
        return await res.redirect(process.env.FRONT + `earlyondate/${date}&${time}`)
    }else if(res.resultUrl.end_date <= Date.now()){
        return await res.redirect(process.env.FRONT + `outofdate/${date}&${time}`)
    }

    // (process.env.API_GATEWAY_LINK + "earlyondate/" `${res.resultUrl.start_date.toLocaleString('pt-BR')}`)

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