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

module.exports ={ getAllByEncode }