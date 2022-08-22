const accessModel = require('../models/urlAccess')
const shortId = require('shortid')

async function getAllByEncode(req, res, next) {
    let resultEncode
    const { encodeAccess } = req.params
    try {
        resultEncode = await accessModel.find({encode: encodeAccess})
        if (resultEncode == null){
            return res.status(404).json({message: 'Cannot find any encode record'})
        }
    } catch (err) {
        res.json({message: err.message})
    }
    
    res.resultEncode = resultEncode
    next()
}

async function filterEncodeAndDate(req, res, next) {
    let resultFilter
    const { encodeAccess } = req.params
    const [today] = new Date().toISOString().split('T')
    if (encodeAccess) {    
        try {
            resultFilter = await accessModel.find( //conferir filtro melhor... Algo não está operando bem
                {$and:[
                    {encode: encodeAccess},
                    {created_at: {$gte: today}}
                ]
            })
            if (resultFilter == null){
                return res.status(404).json({message: 'Cannot find any encode record'})
            }
        } catch (err) {
            res.json({message: err.message})
        }
    }

    res.resultFilter = resultFilter[0]
    console.log(`${resultFilter} was stored`)
    next()
}

module.exports ={ getAllByEncode, filterEncodeAndDate }