const UrlModel = require('../models/url_model')
const url = require('url')

async function getUrl(req, res, next) {
    let resultUrl
    const { urlId } = req.params
    try {
        resultUrl = await UrlModel.findOne({encode: urlId})
        if (resultUrl == null){
            return res.status(404).json({message: 'Cannot find url'})
        }
    } catch (err) {
        res.json({message: err.message})
    }
    
    res.resultUrl = resultUrl
    next()
}

// Função abaixo ainda não funciona. Pensar melhor em como implementar...
async function checkDate(req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl + res.resultUrl.encode
    console.log(fullUrl)
    if (res.resultUrl.start_date >= Date.now()) {
        return await res.send(`A url ainda não foi ativada. Tente usar o link ${fullUrl} a partir da data ${res.resultUrl.start_date.toLocaleString('pt-BR')}`)
    }else if(res.resultUrl.end_date <= Date.now()){
        return await res.send(`A url buscada foi expirada na data ${res.resultUrl.end_date.toLocaleString('pt-BR')}.`)
    }
    res.onDate = true
    next()
}

module.exports ={ getUrl, checkDate}